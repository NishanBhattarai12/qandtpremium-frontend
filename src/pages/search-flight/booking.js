import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from 'react-redux';
import {Elements} from '@stripe/react-stripe-js';
import BookingCheckout from "@/components/flights/BookingCheckout";
import Response from "@/components/layouts/Response";

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const FlightBookingUI = () => {
    const bookings = useSelector((state) => state.booking.bookings);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const successParam = queryParams.get('redirect_status');
        console.log(successParam);
        setSuccess(successParam);
    }, []);

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
                                    <p className="text-sm text-gray-600">Departure: {bookings.departure}</p>
                                    <p className="text-sm text-gray-600">Arrival: {bookings.arrival}</p>
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