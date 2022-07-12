import Head from 'next/head';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import Login from './login';
import { useRouter } from 'next/router';
import  { useState, useEffect } from 'react'
// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";
// import MyImageGallery from "./img-gallery";
import { ReactSession} from 'react-client-session'
import { getUserSession, setUserSession } from 'src/configs/userSession';

export default function Dashboard() {

  const [session, setSession] = useState()
  const router = useRouter()
  useEffect(() => {
    const verifySession = async () => {
      if(!getUserSession()) { 
        router.push('/login')
      }
    }
    verifySession()
  }, [])

  return(
  <>
    <Head>
      <title>
        Extensão - Universidade Católica de Brasília
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      {/* <MyImageGallery /> */}

      <Container maxWidth={false}>
        <Grid container spacing={3}>     
        </Grid>
      </Container>
    </Box>
  </>
  )
 }

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)
