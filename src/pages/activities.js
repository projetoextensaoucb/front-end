import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { getUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import * as Yup from 'yup';
import Head from "next/head";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import { Box, Button, Container, TextField, Card, LinearProgress, CardHeader, Divider, CardContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Activities() {
    
  return (
    <>
      <Head>
        <title>Atividades | Extensão - UCB</title>
      </Head>

    </>
  );
};

Activities.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
