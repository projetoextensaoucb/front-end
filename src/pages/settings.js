import Head from "next/head";
import { Box, Container, Typography, CardContent, Grid, Button } from "@mui/material";
import { Users as UsersIcon } from "../icons/users";
import { DashboardLayout } from "../components/dashboard-layout";
import { getUserSession, setUserSession } from "src/configs/userSession";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import * as React from 'react';

const Settings = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({})

  useEffect(() => {
    const verifySession = async () => {
      if (!getUserSession()) {
        router.push("/login");
      } else {
        const userSession = getUserSession().roles.find((role) => role === 'admin')
        setUser(userSession)
      }
    };
    verifySession();
  }, []);
  return (
    <>
      <Head>
        <title>Configurações | Extensão - UCB</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Typography sx={{ m: 3 }} variant="h4">
          Configurações
        </Typography>
        
        {user && (
          <NextLink href="/users" passHref>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              }}>
              <Button variant="outlined" size="medium" startIcon={<UsersIcon/>}>
                Usuários
              </Button>
            </Box>
          </NextLink>
        )}
      </Box>
    </>
  );
};

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
