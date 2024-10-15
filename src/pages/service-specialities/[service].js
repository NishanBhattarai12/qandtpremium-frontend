import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ServiceAndSpecialitiesDynamic = () => {
    const router = useRouter();
    const { service } = router.query;
    const [serviceData, setServiceData] = useState(null);

    useEffect(() => {
        if (service) {
          const fetchServiceData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ourservices/contents/${service}`);
            const data = await response.json();
            setServiceData(data);
          };
    
          fetchServiceData();
        }
    }, [service]);
    
    if (!serviceData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${serviceData.image})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{serviceData.name}</h1>
                <nav className="text-white mb-4">
                    <Link className="hover:underline" href="/">
                    Home
                    </Link> &gt; <Link className="hover:underline" href="/service-specialities">
                    Services and Specialities
                    </Link> &gt; 
                    <span> {serviceData.name}</span>
                </nav>
                </div>
            </div>

            <div className="p-8 max-w-[900px] mb-6 mx-auto">
                <h2 className="text-2xl text-[#3466ad] text-center text-gray-600 font-bold mb-6">{serviceData.name}</h2>

                <p className="text-center text-gray-600" dangerouslySetInnerHTML={{ __html: serviceData.long_description }}></p>
            </div>
        </>
    )
}

export default ServiceAndSpecialitiesDynamic;