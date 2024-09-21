import React, { useState } from "react";
import { FaPlane } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

const FlightBookingUI = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const bookings = useSelector((state) => state.booking.bookings);

  console.log(bookings);

  if (Object.keys(bookings).length === 0) {
    return <p>No flight selected</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits";
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", personalInfo);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={personalInfo.name}
                  onChange={handleInputChange}
                  aria-label="Full Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={personalInfo.email}
                  onChange={handleInputChange}
                  aria-label="Email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Phone number"
                  value={personalInfo.phone}
                  onChange={handleInputChange}
                  aria-label="Phone number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#64AE33] hover:bg-[#56982B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#56982B] transition duration-150 ease-in-out"
                disabled={isLoading}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Send paymentMethod.id to your server for processing
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    </form>
  );
};

export default FlightBookingUI;