import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import Response from "@/components/layouts/Response";
import { format, set } from 'date-fns';
import PaymentCheckout from "@/components/taxReturn/PaymentCheckout";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const TaxReturnPayment = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const taxReturn = useSelector((state) => state.taxReturn.taxReturn);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const successParam = queryParams.get('redirect_status');

        if (successParam === 'succeeded') {
            const paymentId = queryParams.get('payment_intent');
            sendPostRequest(paymentId);
        }
    }, [])

    const sendPostRequest = async (paymentId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/taxreturn/send-tax-return-request`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: taxReturn.firstName,
                    last_name: taxReturn.lastName,
                    dob: taxReturn.dob,
                    address: taxReturn.address,
                    tax_number: taxReturn.taxNumber,
                    job_title: taxReturn.jobTitle,
                    message: taxReturn.message,
                    file_id: taxReturn.fileid,
                    payment_id: paymentId,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail);
            }
            
            setSuccess('succeeded');
        } catch (error) {
            setSuccess('failed');
            console.error('Error making POST request:', error);
        }
    };

    const options = {
        clientSecret: taxReturn.clientSecret
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {success == 'succeeded' && (
                    <Response
                        title="Tax Return Submitted Successful"
                        message="Your tax return has been successfully submitted."
                        success={true}
                    />
                )}
                {success == 'failed' && (
                    <Response
                        title="Payment Failed"
                        message="Your payment has been unsuccessful."
                        success={false}
                    />
                )}
                {(!success || success == '') && (
                    <>
                        <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                            <div className="text-center">
                                <h2 className="mt-6 text-3xl font-extrabold text-[#64AE33]">Tax Return Payment</h2>
                            </div>
                        
                            <div className="mt-8 space-y-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-semibold">{taxReturn.firstName} {taxReturn.lastName}</p>
                                        <p className="text-sm text-gray-600">Date of Birth: {format(new Date(taxReturn.dob), 'MMM dd, yyyy')}</p>
                                        <p className="text-sm text-gray-600">Address: {taxReturn.address}</p>
                                        <p className="text-sm text-gray-600">Tax Number: {taxReturn.taxNumber}</p>
                                        <p className="text-sm text-gray-600">Job Title: {taxReturn.jobTitle}</p>
                                        <p className="text-sm text-gray-600">Message: {taxReturn.message}</p>
                                        <p className="text-sm text-gray-600">File: {taxReturn.filename}</p>
                                    </div>
                                    </div>
                                    <div className="text-right">
                                    <p className="text-2xl font-bold text-[#64AE33]">$199</p>
                                    <p className="text-sm text-gray-600">Total Amount</p>
                                    </div>
                                </div>
                                </div>
                        
                                <Elements stripe={stripePromise} options={options}>
                                    <PaymentCheckout />
                                </Elements>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default TaxReturnPayment;