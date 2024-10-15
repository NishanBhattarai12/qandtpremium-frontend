import React, {useState} from 'react';
import Link from 'next/link';

const ContactUs = ({ data, visiondata }) => {
    data = data[0];
    console.log(data);
    visiondata = visiondata[0];
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
      
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/contactdetails/submit-contact-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
      
        if (response.ok) {
            setSuccessMessage('Form submitted successfully');
            setFormData({
                name: '',
                email: '',
                message: ''
            })
        } else {
            setErrorMessage('Form submission failed');
        }
      };

    return (
        <>
        <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(/map.jpg)` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] p-8">
            <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
            <nav className="text-white mb-4">
                <Link className="hover:underline" href="/">
                Home
                </Link> &gt; <span>Contact Us</span>
            </nav>
            </div>
        </div>

        <div className="max-w-7xl mx-auto">
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                <h2 className="text-2xl text-gray-700 font-bold mb-4">Contact Us</h2>
                {data.address && ( 
                    <p className="mb-2 text-gray-600"><strong>Address:</strong> {data.address}</p>
                )}
                {data.po_box && (
                    <p className="mb-2 text-gray-600"><strong>PO Box:</strong> {data.po_box}</p>
                )}
                {data.telephone_number && (
                    <p className="mb-2 text-gray-600">
                        <strong>Telephone:</strong>
                        <a href={`tel:+61${data.telephone_number.replace(/^0/, '').replace(/\s+/g, '')}`}> {data.telephone_number}</a>
                    </p>
                )}
                {data.email && (
                    <p className="mb-2 text-gray-600"><strong>Email:</strong><a href={`mailto:${data.email}`}> {data.email}</a></p>
                )}
                </div>

                <div>
                    <h2 className="text-2xl text-gray-700 font-bold mb-4">Get in Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="name">
                            Name
                            </label>
                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            required
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
                            Email
                            </label>
                            <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            required
                            placeholder="Your email"
                            value={formData.email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="message">
                            Message
                            </label>
                            <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="message"
                            placeholder="Your message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                            className="bg-[#3466AD] hover:bg-[#1D4C8C] text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            >
                            Send
                            </button>
                        </div>
                    </form>

                    {errorMessage && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
            </div>

            <div className="p-8 max-w-[900px] mb-6 mx-auto">
                <h2 className="text-2xl text-[#3466ad] text-center text-gray-600 font-bold mb-6">{visiondata.introduction}</h2>
                <div className="grid mt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {visiondata.visions.map((item, index) => (
                    <Link className="flex flex-col items-center text-center" key={index} href={`/our-vision/${item.slug}`}>
                        <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
                        <h3 className="text-xl font-bold text-gray-600">{item.title}</h3>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/contactdetails/info`);
  const data = await response.json();

  const vision = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ourvision/contents`);
  const visiondata = await vision.json();
  return {
    props: {
      data,
      visiondata
    },
  };
};

export default ContactUs;