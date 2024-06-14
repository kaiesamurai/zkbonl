"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Switch, Input, Select, SelectItem, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import ConnectButton from '../../components/ConnectButton/ConnectButton';
import { EthereumProvider } from '@/contexts/EthereumContext';
import { NetworkProvider } from '@/contexts/NetworkContext';
import { ProfileProvider } from '@/contexts/ProfileContext';
import Image from 'next/image';
import { ListProofs } from "../../components/constants/listProofs";
import StartButton from '@/components/StartButton';

interface CachedProof {
  label: string;
  value: string;
  date: string;
  conditionType: string;
  dataType: string;
}
interface CompanyDataProofTransaction {
  transactionName: string;
  conditionalValue: string;
  anterorityDate: string;
  conditionType: string;
  dataType: string;
}

export default function AllProofs() {
  const [selectedValuesCard1, setSelectedValuesCard1] = useState<string[]>([]);
  const [selectedValuesCard2, setSelectedValuesCard2] = useState<string[]>([]);
  const [account, setAccount] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [companySelected, setCompanySelected] = useState<CachedProof | null>(null);
  const [cachedProofs, setCachedProofs] = useState<CachedProof[]>([]); // State to store cached data
  const [selectedProof, setSelectedProof] = useState<string | null>('reserve');

  const handleProofChange = (selection: any) => {
    // Assuming 'selection' might be a complex structure or a string
    // You might need to adjust this logic based on the actual structure of 'Selection'
    let selectedKey: React.Key | null = null;

    if (typeof selection === 'string') {
      // Directly use the selection if it's a string
      selectedKey = selection;
    } else if (selection instanceof Set && selection.size > 0) {
      // If it's a Set, extract the first key
      selectedKey = selection.values().next().value;
    }
    // Update state, ensure to cast to string if your state expects a string type
    setSelectedProof(selectedKey as string | null);
    console.log('Selected Proof:', selectedKey)
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value); // Update the amount state with the new input value
  };

  const handleAccountChange = (newAccount: string | null) => {
    setAccount(newAccount);
    console.log('Account:', newAccount);
  };

  const handleCompanyChange = (selectedKey: React.Key) => {
    console.log('cachedProofs', cachedProofs)
    const selectedCompanyObject = cachedProofs.find(proof => proof.label === selectedKey);

    if (selectedCompanyObject) {
      // Assuming you want to store the full object in your state
      setCompanySelected(selectedCompanyObject);
      console.log('Company Selected:', selectedCompanyObject);
    } else {
      console.log('Selected company not found in cached proofs');
    }
  };

  // Handle value change for Card 1
  const handleValueChangeCard1 = (value: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedValuesCard1((prevValues) => [...prevValues, value]);
    } else {
      setSelectedValuesCard1((prevValues) => prevValues.filter((item) => item !== value));
    }
  };

  // Handle value change for Card 2
  const handleValueChangeCard2 = (value: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedValuesCard2([value]);
    } else {
      setSelectedValuesCard2([]);
    }
  };

  useEffect(() => {
    // Load cached data on component mount
    const loadedData = localStorage.getItem('companyDataProofTransactions');
    if (loadedData) {
      const parsedData: CompanyDataProofTransaction[] = JSON.parse(loadedData);
      const cachedNames = parsedData.map((item) => ({
        label: item.transactionName,
        value: item.conditionalValue,
        date: item.anterorityDate,
        conditionType: item.conditionType,
        dataType: item.dataType,
      }));
      setCachedProofs(cachedNames);
    }
  }, []);

  const handleGenerateProof = async (selectedValues: string[]) => {
    if (companySelected) {
      localStorage.setItem('selectedCompany_ProofTransactions', JSON.stringify(companySelected));
      console.log('companySelected', companySelected);
    }
    if (selectedValues.includes('web2') && !selectedValues.includes('web3')) {
      console.log('Redirecting to auth URL for web2...');
      // call powens to get List of Transaction
    } else if (!selectedValues.includes('web2') && selectedValues.includes('web3')) {
      console.log('Handling web3 option...');
      window.location.href = '/dashboard';
      // Need to call etherscan API
    }
  };

  return (
    <div className='bg-zinc-900'>
      <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
        <Header />
        <main className="flex-grow">
          {/* Section 1 : List Proof */}
          <section className='flex flex-col relative my-40'>
            <div className="flex flex-row items-start ml-20 space-x-4">
              <div className="flex-1 px-4 mb-12">
                <h2 className="text-7xl font-bold text-white mb-10">Elevate Trust with Verifiable Proofs</h2>
                <p className="text-xl text-gray-300">
                  Unveil the truth with a suite of verifiable proofs. Our platform provides a range of proof generation services designed to meet diverse financial and personal verification needs.
                </p>
              </div>
              <div className="flex-1 flex justify-center items-center z-10">
                <EthereumProvider>
                  <NetworkProvider>
                    <ProfileProvider>
                      <ConnectButton onAccountChange={handleAccountChange} />
                    </ProfileProvider>
                  </NetworkProvider>
                </EthereumProvider>
              </div>
            </div>
            <div
              className="absolute left-1/2 transform -translate-x-1/2  translate-y-80"
              style={{
                background: 'linear-gradient(to bottom, rgba(201, 117, 156, 0.7) 40%, rgba(212, 137, 127, 0.5) 50%)',
                filter: 'blur(180px)',
                width: '550px',
                height: '550px',
              }}
            />
            <div
              className="absolute left-1/2 transform translate-x-60 -translate-y-30"
              style={{
                background: 'linear-gradient(to bottom, rgba(135,203,208,1) 20%, rgba(0,0,0,1) 90%)',
                filter: 'blur(80px)',
                width: '330px',
                height: '330px',
              }}
            />
            <div className="flex justify-center items-center w-full mb-10">
              <Select
                label="Select your Proof"
                color={'warning'}
                placeholder="Reserve"
                disabledKeys={["transaction-authenticity","icome-verification","asset-backing","creditworthiness"]}
                className="max-w-xs font-bold pb-5"
                onSelectionChange={handleProofChange}
                size='lg'
              >
                {ListProofs.map((proof) => (
                  <SelectItem key={proof.value} value={proof.value}>
                    {proof.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex justify-center items-center px-16 pb-12">
              {/* NEED TO FACTORIZE THE CODE !}
              {/* Grid Proof of Reserve */}
              {selectedProof === 'reserve' && (
                <Card isBlurred className="mx-auto py-4 bg-thulian_pink-700 bg-opacity-75 max-w-xl w-full">
                  <CardHeader className="pb-5 pt-2 px-4 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl font-bold pb-4">Reserve</p>
                    <small className="text-gray-900 text-sm">Connect your bank account to the app to prove you have a certain amount on it.</small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-4 px-10">
                    <div key={'bordered'} className="flex flex-col w-full mb-6 gap-4">
                      <Input type="number" variant={'bordered'} label="Amount" placeholder="$100.000" value={amount} onChange={handleAmountChange} />
                      <Input type="text" variant={'bordered'} label="Condition" placeholder="greater" className="mb-4" />
                    </div>
                    <Switch className='mb-3' color='warning'
                      isSelected={selectedValuesCard1.includes('web2')} onValueChange={(isSelected) => handleValueChangeCard1('web2', isSelected)}>
                      Web2 Data
                    </Switch>
                    <Switch color='danger' isSelected={selectedValuesCard1.includes('web3')} onValueChange={(isSelected) => handleValueChangeCard1('web3', isSelected)}>
                      Web3 Data
                    </Switch>
                  </CardBody>
                  <CardFooter className="flex flex-col justify-center items-center space-y-2">
                    <StartButton selectedValues={selectedValuesCard1} account={account} amount={amount} />
                    {!account && <p className="text-small text-default-800">You must connect your wallet</p>}
                  </CardFooter>
                </Card>
              )}
              {/* Grid Transactions */}
              {selectedProof === 'transaction' && (
                <Card isBlurred className="mx-auto py-4 bg-tiffany_blue bg-opacity-75 max-w-lg w-full">
                  <CardHeader className="pb-5 pt-2 px-4 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl font-bold pb-4">Transaction</p>
                    <small className="text-gray-900 text-sm">Connect your bank account to the app to demonstrate proof of consistent payments and financial fidelity.</small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 px-10">
                    <div key={'bordered'} className="flex flex-col w-full mb-6 gap-4">
                      <Autocomplete
                        placeholder='ETH Denver'
                        className="mb-4"
                        variant={'bordered'}
                        onSelectionChange={handleCompanyChange}
                        startContent={
                          <Image
                            src="/images/icon/search.svg"
                            alt="Logo"
                            width={24}
                            height={24}
                            className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
                          />}
                      >
                        {cachedProofs.map((Proofs) => (
                          <AutocompleteItem key={Proofs.label} value={Proofs.label} className='text-black'>
                            {Proofs.label}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                    <Switch className='mb-3'
                      isSelected={selectedValuesCard2.includes('web2')} onValueChange={(isSelected) => handleValueChangeCard2('web2', isSelected)}>
                      Web2 Data
                    </Switch>
                    <Switch color='secondary' isSelected={selectedValuesCard2.includes('web3')} onValueChange={(isSelected) => handleValueChangeCard2('web3', isSelected)}>
                      Web3 Data
                    </Switch>
                  </CardBody>
                  <CardFooter className="flex flex-col justify-center items-center space-y-2">
                    <Button onClick={() => handleGenerateProof(selectedValuesCard2)} className='bg-tiffany_blue' size="lg" isDisabled={!account} >
                      Start
                    </Button>
                    {!account && <p className="text-small text-default-800">Connect your wallet</p>}
                  </CardFooter>
                </Card>
              )}
              {/* Grid Proof of real-world-asset */}
              {selectedProof === 'real-world-asset' && (
                <Card isBlurred className="mx-auto py-4 bg-thulian_pink-700 bg-opacity-75 max-w-xl w-full">
                  <CardHeader className="pb-5 pt-2 px-4 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl font-bold pb-5">Backed Real-World Assets</p>
                    <small className="text-gray-900 text-sm">Connect your bank account to the app to verify your ownership of real-world assets, facilitating the creation of tokenized representations grounded in authenticated financial evidence.</small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 px-10 text-center">
                    {/* CardBody content (if any) */}
                  </CardBody>
                  <CardFooter className="flex justify-center items-center">
                    <Button className='bg-dark_purple text-white' size="lg">
                      Coming soon
                    </Button>
                  </CardFooter>
                </Card>
              )}
              {/* Grid Funds */}
              {selectedProof === 'tokenized-credit-histories' && (
                <Card isBlurred className="mx-auto py-4 bg-tiffany_blue bg-opacity-75 max-w-xl w-full">
                  <CardHeader className="pb-5 pt-2 px-4 flex flex-col items-center justify-center text-center">
                    <p className="text-3xl font-bold pb-5">Tokenized Credit Histories</p>
                    <small className="text-gray-900 text-sm">Link your bank account to the app to generate a secure, private ledger of your credit history, enabling the tokenization of your financial trustworthiness for blockchain applications that necessitate verified credit integrity.</small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 px-10">
                  </CardBody>
                  <CardFooter className="flex justify-center items-center">
                    <Button className='bg-dark_purple text-white' size="lg">
                      Comming soon
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </section>
        </main >
        <Footer />
      </div >
    </div >
  );
}