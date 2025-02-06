import Image from "next/image";
// import { Button } from "@headlessui/react";
import NewsDisplay from "../../components/ui/NewsDisplay";

export default function Home() {
  return (
   <div>
    <NewsDisplay section="world" buttonText="Fetch World News"/>
    <NewsDisplay section="tech" buttonText="Fetch Tech News"/>
    <NewsDisplay section="environment" buttonText="Fetch Environment News"/>
    </div>
   
  );
}
