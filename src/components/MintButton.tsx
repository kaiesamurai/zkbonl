import { useState, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Avatar } from "@nextui-org/react";
import { ethers } from 'ethers';
import { abiLukso, contractAddressLukso } from './constants/luksoABI';
import { abiXDC, contractAddressXDC } from './constants/xdcABI';
import lukso from '@lukso/web3-onboard-config';
import Image from 'next/image';

interface MintButtonProps {
	selectedBlockchain: string;
	balance: number;
	amount: number;
	image: string;
	title: string;
	subtitle: string;
}
const MintButton: React.FC<MintButtonProps> = ({ selectedBlockchain, balance, amount, image, title, subtitle }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState('');

	const closeModal = () => setIsModalOpen(false);

	async function handleButtonClick(selectedBlockchain: any) { // To call onClose and mintSBT when generate proof
		console.log('balance', balance);
		console.log('amount', amount);
		const balanceInt = Math.trunc(balance);
		const amountInt = Math.trunc(amount);

		// Now pass these integer values to the mintSBT function
		await mintSBT(amountInt, balanceInt, selectedBlockchain)
	}
	async function mintSBT(mintSBTCondition: number, mintSBTValue: number, targetContractType: string) {
		try {
			if (typeof window.ethereum !== "undefined") {
				const provider = new ethers.BrowserProvider(window.ethereum);

				const signer = await provider.getSigner();

				let targetContract;
				if (targetContractType === 'Lukso') {
					targetContract = new ethers.Contract(contractAddressLukso, abiLukso, signer);
				} else if (targetContractType === 'XDC') {
					targetContract = new ethers.Contract(contractAddressXDC, abiXDC, signer);
				}
				if (targetContract) {
					const targetCalldata = await targetContract.claimSBT(mintSBTCondition, mintSBTValue);
					console.log('data', targetCalldata);
					setModalContent(targetCalldata.hash);
					setIsModalOpen(true);
				} else {
					console.error('Unsupported target contract type:', targetContractType);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
	const linkIdentity = () => {
		window.location.href = 'https://issuer-ui.polygonid.me/credentials/scan-link/92ec979b-905f-4e5b-ab1e-b11ce8b75bef';
	  };

	return (
		<div>
			<Button color="default" variant="bordered" onClick={() => handleButtonClick(selectedBlockchain)} size="lg" className="flex items-left justify-between p-4">
				<div className="flex items-center">
					<Image
						src={image}
						alt="Logo"
						width={48}
						height={48}
						className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
					/>
					<div className="ml-3">
						<h2 className="mb-1">{title}</h2>
						<p className="text-sm">{subtitle}</p>
					</div>
				</div>
			</Button>

			{isModalOpen && (
				<Modal backdrop={'blur'} isOpen={isModalOpen} onClose={closeModal} className="overflow-auto max-w-4xl w-full mx-auto">
					<ModalContent className="bg-white shadow-lg rounded-lg overflow-hidden">
						<ModalHeader className="flex justify-start items-center p-5 border-b">
							<Image
								src="/images/icon/success.svg"
								alt="Logo"
								width={36}
								height={36}
								className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 mr-2"
							/>
							<p className="text-xl font-bold break-words">Almost their!</p>
						</ModalHeader>
						<div className="p-5">
							<p>{modalContent}</p>
							<p className="break-words">This hash is your unique proof. Please keep it safe as it represents your ability to prove your actions.</p>
							<p>The last step is to link this hash with your identity for additional security.</p>
						</div>
						<ModalFooter className="flex justify-between items-center p-5 border-t">
							<Button className='bg-tiffany_blue' variant="solid" onPress={linkIdentity} radius='lg'>
								Polygon Id
							</Button>
							<Button color="danger" variant="light" onPress={closeModal}>
								Close
							</Button>
						</ModalFooter>
				</ModalContent>
				</Modal>
	)
}
		</div >
	);
};

export default MintButton;