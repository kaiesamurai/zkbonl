"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem, Progress, Accordion, AccordionItem, Table, TableColumn, TableHeader, TableRow, TableBody, TableCell, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, CircularProgress, Chip } from "@nextui-org/react";
import { useSearchParams } from 'next/navigation';
import MintButton from '@/components/MintButton';

export default function Dashboard() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleOpen = () => {
		onOpen();
	}
	const [amount, setAmount] = useState(0); // From all-proofs (Proof of Reserve) IF EXISTS this mean it's a proof of reserve!
	const [balance, setBalance] = useState(0);
	const [successPercentage, setSuccessPercentage] = useState(0);
	const [creditScore, setCreditScore] = useState(0);
	const [proofTransactionCompanyData, setProofTransactionCompanyData] = useState(null);

	// CALL POWENS FOR KEY ECHANGES
	const searchParams = useSearchParams()
	const [accessToken, setAccessToken] = useState("");
	const [web3balance, setWeb3Balance] = useState(0);

	useEffect(() => {
		// Check if an access token is already stored in local storage
		const storedToken = localStorage.getItem('accessToken');
		const json = localStorage.getItem('result');
		if (storedToken) {
			setAccessToken(storedToken);
			console.log(json);
		} else {
			// If no token is stored, proceed to fetch a new one
			const code = searchParams.get('code');
			const data = {
				code: code,
				client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
				client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			};
			console.log('Code:', code);
			console.log('Client ID:', data.client_id);
			console.log('Secret:', data.client_secret);

			fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/token/access`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((response: any) => response.json())
				.then((data: any) => {
					console.log(data);
					console.log('Access Token:', data.access_token);
					localStorage.setItem('accessToken', data.access_token);
					// Update the state with the new access token
					setAccessToken(data.access_token);
				})
				.catch((error: any) => {
					console.error('Error:', error);
				});
		}
	}, []);

	// Call Powens for the Balance in the account
	function getBalance() {
		const data = {
			"access_token": accessToken
		}

		if (accessToken) {
			fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/users/me/accounts`, {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + accessToken,
					'Content-Type': 'application/json'
				},
			})
				.then(response => response.json())
				.then(data => {
					const balance = data.balance;
					console.log("Balance is: " + balance);
					setBalance(balance);
					const finalBalance = balance + web3balance;
					console.log("Final balance is: " + finalBalance);
					const currentAmount = parseFloat(localStorage.getItem('amount') || '0');
					console.log("Current amount is: " + currentAmount);
					setAmount(currentAmount);
					let successPercent = (finalBalance / currentAmount) * 100;
					console.log("Success percentage is: " + successPercent);
					successPercent = Math.min(Math.max(successPercent, 0), 100);
					console.log("Success percentage is: " + successPercent);
					setSuccessPercentage(isNaN(successPercent) ? 0 : successPercent);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		} else {
			console.log("Impossible to call balance function: access token is undefined.")
		}
	}
	function getCreditScore() {
		const data = {
			"access_token": accessToken
		}

		if (accessToken) {
			fetch(`http://localhost:8000/web2/creditscore`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ accessToken }),
			})
			.then(response => {
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				return response.json();
			})
			.then(data => {
					const creditScore = (data *100 / 10) * 100;
					setCreditScore(creditScore);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		} else {
			console.log("Impossible to call balance function: access token is undefined.")
		}
	}

	function getTransaction() {
		const data = {
			"access_token": accessToken
		}

		if (accessToken) {
			fetch(`http://localhost:8000/web2/transaction`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ accessToken }),
			})
				.then(response => {
					if (!response.ok) {
						throw new Error(`Error: ${response.statusText}`);
					}
					return response.json();
				})
				.then(data => {
					const creditScore = (data *100 / 10) * 100;
					setCreditScore(creditScore);
				})
				.catch(error => {
					console.error('Error:', error);
				});
		} else {
			console.log("Impossible to call balance function: access token is undefined.")
		}
	}
	useEffect(() => {
		if (accessToken) {
			getBalance();
			getCreditScore();
		}
	}, [accessToken]);

	useEffect(() => { // Dynamicly update amount
		const storedAmount = parseFloat(localStorage.getItem('amount') || '0');
		setAmount(storedAmount);
	}, []);

	useEffect(() => { // Dynamicly update amount
		const web3balance = parseFloat(localStorage.getItem('Web3Balance') || '0');
		setWeb3Balance(web3balance);
		console.log("Web3 balance is: " + web3balance);
	}, []);

	useEffect(() => { // Get the company data selected by the user
		const cachedData = localStorage.getItem('selectedCompany_ProofTransactions');
		if (cachedData) {
			const data = JSON.parse(cachedData);
			console.log('Données de l\'entreprise récupérées :', data);
			setProofTransactionCompanyData(data);
		}
	}, []);

	return (
		<main className='bg-zinc-900'>
			<div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
				<Header />
				<div className='relative'>
					<div
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						style={{
							background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
							filter: 'blur(180px)',
							width: '550px',
							height: '550px',
						}}
					/>
					<div
						className="absolute left-1/2 transform translate-x-40 -translate-y-10"
						style={{
							background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
							filter: 'blur(80px)',
							width: '330px',
							height: '330px',
						}}
					/>
					<div
						className="absolute transform -translate-x-10 -translate-y-80 "
						style={{
							background: 'linear-gradient(to bottom, rgba(83,32,73,1) 30%, rgba(82,55,149,1) 93%)',
							filter: 'blur(80px)',
							width: '330px',
							height: '330px',
						}}
					/>
					{accessToken || web3balance ? (
						<>
							{(amount > 0 || web3balance) && (
								<>
									{/*Proof of reserve*/}
									<section className="flex items-center justify-center my-6">
										<div className="flex flex-col gap-4 w-1/2">
											<Card className="w-full p-3 flex-col">
												<CardHeader className="flex flex-col items-center gap-3">
													<div className="flex flex-row mt-2">
														<p className="mx-auto text-3xl font-bold pr-2">{successPercentage.toFixed(2)}%</p>
														<p className="text-3xl font-bold">Filled</p>
													</div>
													<div className="w-full">
														<Progress color={successPercentage === 100 ? "success" : "warning"} aria-label="Loading..." value={successPercentage} />
													</div>
												</CardHeader>
												<CardBody>
													{/* Name of the proof */}
													<p className="mx-auto text-xl mb-4">
														{successPercentage === 100 ? "You fit the requirement!" : "You don't fit the requirement."}
													</p>
													<div>
														<p className="text-xl font-semibold mb-4">Details:</p>
														<Accordion selectionMode="multiple">
															<AccordionItem key="1" aria-label="web2" title="web2">
																<Table aria-label="Example static collection table" className="m-2 w-9/10">
																	<TableHeader>
																		<TableColumn>BANK ACCOUNTS</TableColumn>
																		<TableColumn>AMOUNT</TableColumn>
																	</TableHeader>
																	<TableBody>
																		<TableRow key="1">
																			<TableCell>Checking Account</TableCell>
																			<TableCell>$5,000</TableCell>
																		</TableRow>
																		<TableRow key="2">
																			<TableCell>Savings Account</TableCell>
																			<TableCell>$3,200</TableCell>
																		</TableRow>
																		<TableRow key="3">
																			<TableCell>Home Savings Account</TableCell>
																			<TableCell>$4,150</TableCell>
																		</TableRow>
																		<TableRow key="4">
																			<TableCell>Brokerage Account</TableCell>
																			<TableCell>$2,500</TableCell>
																		</TableRow>
																	</TableBody>
																</Table>
															</AccordionItem>
															<AccordionItem key="2" aria-label="web3" title="web3">
																<Table aria-label="Example static collection table" className="m-2 w-9/10">
																	<TableHeader>
																		<TableColumn>TOKEN</TableColumn>
																		<TableColumn>NETWORK</TableColumn>
																		<TableColumn>AMOUNT</TableColumn>
																	</TableHeader>
																	<TableBody>
																		<TableRow key="1">
																			<TableCell style={{ display: "flex", alignItems: "center" }}>
																				<Avatar src="https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661" className="w-5 h-5 text-tiny mr-2" />
																				<p>USDC</p>
																			</TableCell>
																			<TableCell>XDC Network</TableCell>
																			<TableCell>1382.28</TableCell>
																		</TableRow>
																		<TableRow key="2">
																			<TableCell style={{ display: "flex", alignItems: "center" }}>
																				<Avatar src="https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661" className="w-5 h-5 text-tiny mr-2" />
																				<p>USDT</p>
																			</TableCell>
																			<TableCell>Ethereum</TableCell>
																			<TableCell>5230</TableCell>
																		</TableRow>
																		<TableRow key="3">
																			<TableCell style={{ display: "flex", alignItems: "center" }}>
																				<Avatar src="/images/Token_Logo/ethereum-eth-logo.svg" className="w-5 h-5 text-tiny mr-2" />
																				<p>ETH</p>
																			</TableCell>
																			<TableCell>Lukso</TableCell>
																			<TableCell>1.7</TableCell>
																		</TableRow>
																	</TableBody>
																</Table>
															</AccordionItem>
														</Accordion>
													</div>
												</CardBody>

												<CardFooter className="mb-2">
													<Button className="mx-auto" size='lg' onPress={() => handleOpen()} isDisabled={successPercentage < 100}>Generate a proof</Button>
													<Modal
														size="md"
														isOpen={isOpen}
														onClose={onClose}
													>
														<ModalContent>
															{(onClose) => (
																<>
																	<ModalHeader className="flex flex-col gap-1">Choose a network</ModalHeader>
																	<ModalBody className='flex flex-col items-center justify-center w-full'>
																		<MintButton selectedBlockchain={'Lukso'} balance={balance} amount={amount} image="/images/Lukso-logo.jpeg" title="Lukso Network" subtitle="Super user-friendly" />
																		<MintButton selectedBlockchain={'XDC'} balance={balance} amount={amount} image="/images/XDC-Logo.svg" title="XDC Network" subtitle="Super powerful" />
																	</ModalBody>
																	<ModalFooter>
																	</ModalFooter>
																</>
															)}
														</ModalContent>
													</Modal>
												</CardFooter>
											</Card>
										</div>
									</section>
								</>
							)}

							{/*Proof of Payment*/}
							<div>
								{proofTransactionCompanyData && (
									<section className="flex items-center justify-center my-6">
										<div className="flex flex-col gap-4 w-1/2">
											<Card className="w-full p-3 flex-col">
												<CardHeader className="flex flex-col items-center gap-3">
													<div className="flex flex-col mx-auto mt-2">
														<p className="mx-auto text-3xl font-bold">83%</p>
													</div>
													<div className="w-full">
														<Progress color="danger" aria-label="Loading..." value={70} />
													</div>
												</CardHeader>
												<CardBody>
													<p className="mx-auto">You don&apos;t fit the requirement.</p>
													<p className="text-xl font-semibold mb-4">Details:</p>
													<Accordion selectionMode="multiple">
														<AccordionItem key="1" aria-label="Transactions" title="Transactions">
															<Table aria-label="Example static collection table" className="m-2 w-9/10">
																<TableHeader>
																	<TableColumn>NAME</TableColumn>
																	<TableColumn>AMOUNT</TableColumn>
																</TableHeader>
																<TableBody>
																	<TableRow key="1">
																		<TableCell>Lacoste</TableCell>
																		<TableCell>$130</TableCell>
																	</TableRow>
																	<TableRow key="2">
																		<TableCell>Lacoste</TableCell>
																		<TableCell>$70</TableCell>
																	</TableRow>
																</TableBody>
															</Table>
														</AccordionItem>
													</Accordion>
												</CardBody>
												<CardFooter className="mb-2">
													<Button className="mx-auto" disabled size='lg'>Generate a proof</Button>
												</CardFooter>
											</Card>
										</div>
									</section>
								)}
							</div>

							{/*Credit score*/}
							<section className="flex items-center justify-center my-6">
								<div className="flex flex-col gap-4 w-1/2">
									<Card className="w-full p-3 flex-col">
										<CardHeader className="flex flex-col items-center gap-3">
											<Card className="w-[240px] h-[240px] border-none ">
											<CardHeader className="justify-center items-center pb-0">
													<Chip
														classNames={{
															base: "border-1 border-white/30",
															content: "text-black/90 text-small font-semibold",
														}}
														variant="bordered"
													>
														WEB5 CREDIT SCORE
													</Chip>
												</CardHeader>
												<CardBody className="justify-center items-center pt-0">
													<CircularProgress
														classNames={{
															svg: "w-36 h-36 drop-shadow-md",
															indicator: "stroke-white",
															track: "stroke-black/10",
															value: "text-3xl font-semibold text-black",
														}}
														value={creditScore}
														strokeWidth={4}
														showValueLabel={true}
													/>
												</CardBody>
											</Card>
										</CardHeader>
										<CardBody>
											<p className="mx-auto">You don&apos;t fit the requirement.</p>
										</CardBody>
										<CardFooter className="mb-2">
											<Button className="mx-auto" disabled>Generate a proof</Button>
										</CardFooter>
									</Card>
								</div>
							</section>
						</>
					) : (
						<>
							<div className="flex justify-center items-center h-screen">
								<Button color="danger" size='lg' isLoading className="flex justify-center items-center">
									Loading
								</Button>
							</div>
						</>
					)}
				</div>

			</div>
		</main>
	);
}