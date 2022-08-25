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
        <Container maxWidth={false}>
          <Typography sx={{ m: 3 }} variant="h4">
            Configurações
          </Typography>
          <CardContent>
            <Grid container spacing={6} wrap="wrap">
              <Grid
                item
                md={4}
                sm={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                xs={12}
              >

                {user && (
                  <NextLink href="/users" passHref>
                    <Button variant="outlined" startIcon={<UsersIcon />}>
                      Usuários
                    </Button>
                  </NextLink>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Container>
      </Box>
    </>
  );
};

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
