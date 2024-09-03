
import CarouselComponent from "@/components/home/Carousel";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const accessToken = useSelector((state) => state.auth.accessToken);

  return(

   <>
   <CarouselComponent/>
   </>
  );
}
