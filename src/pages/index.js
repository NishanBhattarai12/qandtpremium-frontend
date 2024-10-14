import CarouselComponent from "@/components/home/Carousel";
import Customer from "@/components/home/Customer";
import OurService from "@/components/home/OurService";
import Welcome from "@/components/home/Welcome";

export default function Home() {
  return(
   <>
    <CarouselComponent/>
    <Welcome />
    <Customer />
    <OurService />
   </>
  );
}
