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
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value); // Update the amount state with the new input value
  };

  const handleAccountChange = (newAccount: string | null) => {
    setAccount(newAccount);
    console.log('Account:', newAccount);
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
  const handleGenerateCreditScore = async (selectedValues: string[]) => {
    localStorage.setItem('amount', amount); // Save the amount to local storage

    if (selectedValues.includes('web2') && !selectedValues.includes('web3')) {
      console.log('Redirecting to auth URL for web2...');
      window.location.href = authUrl;
    } else if (!selectedValues.includes('web2') && selectedValues.includes('web3')) {
      console.log('Handling web3 option...');
      //todo  const balanceWeb3 = await getAddressBalance(account);
      //todo localStorage.setItem('Web3Balance', balanceWeb3);
      window.location.href = '/dashboard';  
    } else if (selectedValues.includes('web2') && selectedValues.includes('web3')) {
      //todo const balanceWeb3 = await getAddressBalance(account);
      //todo localStorage.setItem('Web3Balance', balanceWeb3);
      console.log('Handling both web2 and web3 options...');
      window.location.href = authUrl;
    }
  };
  const authUrl = 'https://ethdenver-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=99829964&redirect_uri=http://localhost:3000/dashboard'
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
            <div className="flex justify-center items-center px-16 pb-12">
              {/* NEED TO FACTORIZE THE CODE !}
              {/* Grid Proof of Reserve */}
                <Card isBlurred className="py-4 bg-opacity-75 bg-thulian_pink-700">
                  <CardHeader className="pb-5 pt-2 px-4 flex-col items-center">
                    <p className="text-3xl font-bold pb-2">Credit Score</p>
                    <small className="text-gray-900 text-sm">Connect your bank account to the app to prove you have a certain amount on it.</small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-4 px-10">
                    <Switch className='mb-3' color='warning'
                      isSelected={selectedValuesCard1.includes('web2')} onValueChange={(isSelected) => handleValueChangeCard1('web2', isSelected)}>
                      Web2 Data
                    </Switch>
                    <Switch color='danger' isSelected={selectedValuesCard1.includes('web3')} onValueChange={(isSelected) => handleValueChangeCard1('web3', isSelected)}>
                      Web3 Data
                    </Switch>
                  </CardBody>
                  <CardFooter className="flex flex-col justify-center items-center space-y-2">
                  <Button onClick={() => handleGenerateCreditScore(selectedValuesCard1)} className='bg-tiffany_blue' size="lg" isDisabled={!account} >
                      Start
                    </Button>
                    {!account && <p className="text-small text-default-800">You must connect your wallet</p>}
                  </CardFooter>
                </Card>
            </div>
          </section>
        </main >
        <Footer />
      </div >
    </div >
  );
}