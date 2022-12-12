import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { getUserSession } from "src/configs/userSession";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Activities() {

  const router = useRouter();
  useEffect(()=> {
    const user = getUserSession();
    if (user) {
      // req...
    } else {
      router.push('/login')
    }
  }, [])
    
  return (
    <>
      <Head>
        <title>Atividades | Extensão - UCB</title>
      </Head>

    </>
  );
};

Activities.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
