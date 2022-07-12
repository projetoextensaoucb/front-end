import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsNotifications } from '../components/settings/settings-notifications';
import { getUserSession, setUserSession } from 'src/configs/userSession';
import  { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

const Settings = () => {
  const router = useRouter()
  useEffect(() => {
    const verifySession = async () => {
      if(!getUserSession()) { 
        router.push('/login')
      }
    }
    verifySession()
  }, [])
  return (
  <>
    <Head>
      <title>
        Configurações | Extensão - UCB
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5
      }}
    >
      <Container maxWidth={false}>
        <Typography
          sx={{ m: 3 }}
          variant="h4"
        >
          Configurações
        </Typography>
        <SettingsNotifications />
      </Container>
    </Box>
  </>
  )
}

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;
