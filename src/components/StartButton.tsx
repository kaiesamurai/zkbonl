import { useState, useRef } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';
import TransgateConnect from '@zkpass/transgate-js-sdk';
import { getAddressBalance } from './web3address';

interface StartButtonProps {
  selectedValues: string[];
  account: string | null;
  amount: string;
}
const StartButton: React.FC<StartButtonProps> = ({ selectedValues, account, amount}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const closeModal = () => setIsModalOpen(false);

  const handleGenerateProof = async (selectedValues: string[]) => {
    localStorage.setItem('amount', amount); // Save the amount to local storage

    if (selectedValues.includes('web2') && !selectedValues.includes('web3')) {
      console.log('Redirecting to auth URL for web2...');
      verify();
    } else if (!selectedValues.includes('web2') && selectedValues.includes('web3')) {
      console.log('Handling web3 option...');
      const balanceWeb3 = await getAddressBalance(account);
      localStorage.setItem('Web3Balance', balanceWeb3);
      window.location.href = '/dashboard';  
    } else if (selectedValues.includes('web2') && selectedValues.includes('web3')) {
      const balanceWeb3 = await getAddressBalance(account);
      localStorage.setItem('Web3Balance', balanceWeb3);
      verify();
      console.log('Handling both web2 and web3 options...');
    }
  };
  const verify = async () => {
    try {
    // The appid of the project created in dev center
    const appid = "ffbdf065-74f2-497a-bb9a-dbac0e8adbec"

    // Create the connector instance
    const connector = new TransgateConnect(appid)

    // Check if the TransGate extension is installed
    // If it returns false, please prompt to install it from chrome web store
    const isAvailable = await connector.isTransgateAvailable()

    if (isAvailable) {
      // The schema id of the project
      const schemaId = "dc162afeb1b4467b837ff0166254194c"

      // Launch the process of verification
      // This method can be invoked in a loop when dealing with multiple schemas
      const res = await connector.launch(schemaId)
      const serializedRes = JSON.stringify(res);
      localStorage.setItem('result', serializedRes);
      console.log('res', serializedRes)
      window.location.href = '/dashboard';
      // verifiy the res onchain/offchain based on the requirement     
      
    } else {
      setModalContent('Please install TransGate');
      setIsModalOpen(true);
      console.log('Please install TransGate');
    }
  } catch (error) {
    console.log('transgate error', error)
  }
}

  return (
    <div>
      <Button onClick={() => handleGenerateProof(selectedValues)} className='bg-tiffany_blue' size="lg"
                    isDisabled={!account} // This disables the button when `account` is null or an empty string
      >
      Start
      </Button>
      {isModalOpen && (
        <Modal backdrop={'blur'} isOpen={isModalOpen} onClose={closeModal}>
          <ModalContent>
            <ModalHeader className="flex">
            <p>{modalContent}</p>
            </ModalHeader>
            <ModalFooter className="flex justify-between items-center">
            <a href="https://chromewebstore.google.com/detail/zkpass-transgate/afkoofjocpbclhnldmmaphappihehpma" target="_blank" rel="noopener noreferrer">
          Click here
            </a>
              <Button color="danger" variant="light" onPress={closeModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default StartButton;