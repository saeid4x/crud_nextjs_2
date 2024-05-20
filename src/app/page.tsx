"use client"

import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()
  useEffect(()=>{
    router.push('users')
  },[])
  return (
     <main>
         
     </main>
  );
}
