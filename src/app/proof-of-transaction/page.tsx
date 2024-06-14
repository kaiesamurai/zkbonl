"use client";

import React, { useState } from 'react';
import Header from '../../components/header';
import { Card, CardHeader, CardBody, CardFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { ListDataForCompany } from "../../components/constants/listDataForCompany";
import Link from 'next/link';

export default function ProofOfTransaction() {
    const [transactionName, setTransactionName] = useState('');
    const [anterorityDate, setAnterorityDate] = useState('2024-03-02'); // default value
    const [dataType, setDataType] = useState('');
    const [conditionType, setConditionType] = useState('');
    const [conditionalValue, setConditionalValue] = useState('');

    const onSelectionChangeTypes = (id: string | number) => {
        setDataType(id.toString());
    };
    const onSelectionChangeCondition = (id: string | number) => {
        setConditionType(id.toString());
    };

    const handleNextClick = () => {
        const formCompanyDataProofTransaction = {
            transactionName,
            anterorityDate,
            dataType,
            conditionType,
            conditionalValue,
        };

        // Retrieve existing data from localStorage
        const existingData = localStorage.getItem('companyDataProofTransactions');
        const companyDataProofTransactions = existingData ? JSON.parse(existingData) : [];

        // Add the new form data to the array
        companyDataProofTransactions.push(formCompanyDataProofTransaction);

        // Save the updated array back to localStorage
        localStorage.setItem('companyDataProofTransactions', JSON.stringify(companyDataProofTransactions));
        console.log('New formCompanyDataProofTransaction added', companyDataProofTransactions);
    };


    return (
        <main className='bg-zinc-900'>
            <div className='backdrop-blur-3xl flex flex-col min-h-screen mx-auto' style={{ maxWidth: '1500px' }}>
                <Header />
                <div className='relative mt-10'>
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
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col gap-4 w-1/3">
                            <Card className="w-full p-3">
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col mx-auto justify-center mt-2">
                                        <p className="mx-auto">Open-Banking Proof Issuer</p>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    {/* Name of the proof */}
                                    <Input type="text" variant="bordered" label="Name of the transaction proof" className="my-3"
                                        onChange={(e) => setTransactionName(e.target.value)} />

                                    {/* Choose anteriority */}
                                    <Input type="date" variant="bordered" label="Anterority" className="my-3" defaultValue="2024-03-02"
                                        onChange={(e) => setAnterorityDate(e.target.value)} />

                                    {/* Choose a data type */}
                                    <Autocomplete defaultItems={ListDataForCompany} labelPlacement="inside" label="Choose a data type" className="max-w-xs my-2 w-full"
                                        onSelectionChange={onSelectionChangeTypes}>
                                        {ListDataForCompany.map((item) => (
                                            <AutocompleteItem key={item.id} textValue={item.value}>
                                                <div className="flex flex-col">
                                                    <span className="text-small">{item.title}</span>
                                                    <span className="text-tiny text-default-400">{item.description}</span>
                                                </div>
                                            </AutocompleteItem>
                                        ))}
                                    </Autocomplete>

                                    {/* Choose a condition type */}
                                    <Autocomplete label="Choose a condition type" className="max-w-xs my-3"
                                        onSelectionChange={onSelectionChangeCondition}>
                                        <AutocompleteItem key="higher" value="higher">Greater than</AutocompleteItem>
                                        <AutocompleteItem key="below" value="below">Lower</AutocompleteItem>
                                        <AutocompleteItem key="equal" value="equal">Equal</AutocompleteItem>
                                    </Autocomplete>

                                    {/* Condition value */}
                                    <Input type="number" variant="bordered" label="Conditional value" className="my-3"
                                        onChange={(e) => setConditionalValue(e.target.value)} />
                                </CardBody>
                                <CardFooter className="mb-2 flex justify-center items-center">
                                    <div className="flex gap-4">
                                        <Button className="bg-tiffany_blue" onClick={handleNextClick}>Save</Button>
                                        <Link href="/" className="text-sm text-black flex items-center">
                                            Go back home
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}