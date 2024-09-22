import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';
import Response from "@/components/layouts/Response";

const BookingCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}search-flight/booking?success=true`,
            },
        });

        if (result.error) {
            setIsLoading(false);
            setError(result.error);
        }
    };

    return (
        <>
            {error && (
                <Response
                    title="Payment Error"
                    message={error.message}
                    success={false}
                />
            )}

            <form onSubmit={handleSubmit}>
                <PaymentElement />

                <button
                    type="submit"
                    className="group mt-6 relative flex w-full justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#64AE33] hover:bg-[#56982B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56982B] transition duration-150 ease-in-out"
                    disabled={!stripe || isLoading}
                >
                    {isLoading ? (
                    <>
                        <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                        </svg>
                        Booking...
                    </>
                    ) : (
                    "Complete Booking"
                    )}
            </button>
        </form>
        </>
    )
};

export default BookingCheckout;