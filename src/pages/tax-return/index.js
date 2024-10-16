import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { addTaxReturn } from '@/store/taxReturnSlice';
import { useRouter } from 'next/router';

const TaxReturn = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!accessToken) {
    router.push('/login');
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    taxNumber: '',
    jobTitle: '',
    message: '',
    fileid: '',
    filename: '',
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    const fileFormData = new FormData();
    fileFormData.append('file', file);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/files/file-upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: fileFormData
      });
  
      const data = await response.json();
      setFormData({
        ...formData,
        fileid: data.fileid,
        filename: file.name
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_STRIP_SECRET_KEY}`
        },
        body: new URLSearchParams({
          amount: 199 * 100,
          currency: "usd"
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      const response2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/taxreturn/send-tax-return-request`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          dob: formData.dob,
          address: formData.address,
          tax_number: formData.taxNumber,
          job_title: formData.jobTitle,
          message: formData.message,
          file_id: formData.fileid,
        }),
      });

      if (!response2.ok) {
        throw new Error('Error sending tax return request');
      }

      const data2 = await response2.json();

      dispatch(addTaxReturn({
        ...formData,
        taxReturnId: data2.tax_return_id,
        clientSecret: data.client_secret
      }));
      router.push('/tax-return/payment');
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-1/2 relative">
          <img
            src="/taxbackground.jpg"
            alt="Tax Return Image"
            className="w-[800px] h-[900px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <h2 className="text-white text-6xl md:text-8xl font-bold text-center p-4 leading-tight md:leading-none">
              GET YOUR TAX RETURN AT JUST $199
            </h2>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 bg-gray-100 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Tax Return Form</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Current Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="taxNumber" className="block text-sm font-medium text-gray-700">
                  Tax Number or ABN Number
                </label>
                <input
                  type="text"
                  id="taxNumber"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message (Bank Details)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#64AE33] text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxReturn;