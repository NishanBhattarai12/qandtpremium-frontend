import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const OurVisionDynamic = () => {
    const router = useRouter();
    const { vision } = router.query;
    const [visionData, setVisionData] = useState(null);

    useEffect(() => {
        if (vision) {
          const fetchVisionData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/ourvision/contents/${vision}`);
            const data = await response.json();
            setVisionData(data);
          };
    
          fetchVisionData();
        }
    }, [vision]);
    
    if (!visionData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${visionData.background_image})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{visionData.title}</h1>
                <nav className="text-white mb-4">
                    <Link className="hover:underline" href="/">
                    Home
                    </Link> &gt;
                    <span> {visionData.title}</span>
                </nav>
                </div>
            </div>

            <div className="p-8 max-w-[900px] mb-6 mx-auto">
                <h2 className="text-2xl text-[#3466ad] text-center text-gray-600 font-bold mb-6">{visionData.title}</h2>

                <p className="text-center contents text-gray-600" dangerouslySetInnerHTML={{ __html: visionData.long_description }}></p>
            </div>
        </>
    )
}

export default OurVisionDynamic;