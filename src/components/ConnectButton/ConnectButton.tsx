import { useState, useEffect, useRef } from 'react';
import { useEthereum } from '@/contexts/EthereumContext';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Image from 'next/image';

interface ResponseData {
  isMaliciousAddress: boolean;
}
interface ConnectButtonProps {
  onAccountChange: (newAccount: string | null) => void;
}
const ConnectButton: React.FC<ConnectButtonProps> = ({ onAccountChange }) => {
  const { connect, disconnect, account } = useEthereum();
  const [response, setResponse] = useState<ResponseData>({ isMaliciousAddress: false });
  const [loading, setLoading] = useState(false);
  const isFraudulentRef = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const closeModal = () => setIsModalOpen(false);

  const handleClick = async () => {
    try {
      const response = await fetch("https://api.harpie.io/v2/validateAddress", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apiKey: process.env.API_KEY_HARPIE,
          address: account
          //address: "0x55456cbd1f11298b80a53c896f4b1dc9bc16c731"
        })
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
    onAccountChange(null);
    setResponse({ isMaliciousAddress: false });
    setLoading(false);
    isFraudulentRef.current = false;
    setIsModalOpen(false); // Ensure the modal is closed upon disconnect.
  };

  useEffect(() => {
    if (account) {
      handleClick();
      onAccountChange(account);
    }
  }, [account]);

  useEffect(() => {
    if (loading) {
      isFraudulentRef.current = response.isMaliciousAddress;
      if (isFraudulentRef.current) {
        setModalContent('Error: The address is fraudulent.');
        handleDisconnect();
      } else {
        setModalContent('The address is safe!');
      }
      setIsModalOpen(true); // Open the modal with the content set above.
    }
  }, [loading]);

  return (
    <div>
      <button
        className="m-2 bg-lavender-600 hover:bg-tiffany_blue text-gray-800 font-bold py-4 px-14 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out disabled:opacity-50 disabled:bg-blue-300"
        onClick={account ? handleDisconnect : handleConnect}
        disabled={isFraudulentRef.current}
      >
        {account ? 'Disconnect' : 'Connect'}
      </button>
      {isModalOpen && (
        <Modal backdrop={'blur'} isOpen={isModalOpen} onClose={closeModal}>
          <ModalContent>
            <ModalHeader className="flex">
              <Image
                src="/images/Harpie-Aeonik-Logo.svg"
                alt="Logo"
                width={100}
                height={100}
              />
              <p>Address Validation Result</p>
            </ModalHeader>
            <ModalBody>
              <p>{modalContent}</p>
            </ModalBody>
            <ModalFooter className="flex justify-between items-center">
              <p>Powered by <span className='font-bold'>Harpie</span> </p>
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

export default ConnectButton;