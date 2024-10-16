import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import BookingCheckout from "@/components/flights/BookingCheckout";
import Response from "@/components/layouts/Response";
import { format } from 'date-fns';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const FlightBookingUI = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const bookings = useSelector((state) => state.booking.bookings);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/flights/update-booking-flight/${bookings.booking_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    stripe_payment_id: paymentId,
                    status: 'paid'
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail);
            }
            
            setSuccess('succeeded');
            setTimeout(() => {
                router.push('/dashboard?content=flights');
            }, 600);
        } catch (error) {
            setSuccess('failed');
            console.error('Error making POST request:', error);
        }
    };

    const options = {
        clientSecret: bookings.clientSecret
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                {success == 'succeeded' && (
                    <Response
                        title="Booking Successful"
                        message="Your flight booking has been successfully completed."
                        success={true}
                    />
                )}
                {success == 'failed' && (
                    <Response
                        title="Booking Failed"
                        message="Your flight booking has been unsuccessful."
                        success={false}
                    />
                )}
                {(!success || success == '') && (
                    <>
                        <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                            <div className="text-center">
                                <h2 className="mt-6 text-3xl font-extrabold text-[#64AE33]">Flight Booking</h2>
                            </div>
                        
                            <div className="mt-8 space-y-6">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Flight Information</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                    <img src={bookings.logo} alt={`${bookings.airline} logo`} className="w-12 h-12 mr-4" />
                                    <div>
                                        <p className="font-semibold">{bookings.airline}</p>
                                        <p className="text-sm text-gray-600">Departure: {format(new Date(bookings.departure), 'MMM dd, yyyy hh:mm a')}</p>
                                        <p className="text-sm text-gray-600">Arrival: {format(new Date(bookings.arrival), 'MMM dd, yyyy hh:mm a')}</p>
                                        <p className="text-sm text-gray-600">From: {bookings.from}</p>
                                        <p className="text-sm text-gray-600">To: {bookings.to}</p>
                                        <p className="text-sm text-gray-600">Airplane: {bookings.airplane}</p>
                                        <p className="text-sm text-gray-600">Flight Number: {bookings.flight_number}</p>
                                    </div>
                                    </div>
                                    <div className="text-right">
                                    <p className="text-2xl font-bold text-[#64AE33]">${bookings.price}</p>
                                    <p className="text-sm text-gray-600">Total Amount</p>
                                    </div>
                                </div>
                                </div>
                        
                                <Elements stripe={stripePromise} options={options}>
                                    <BookingCheckout />
                                </Elements>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default FlightBookingUI;