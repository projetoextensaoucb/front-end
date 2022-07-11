import Head from 'next/head';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import Login from './login';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import MyImageGallery from "./img-gallery";

const Dashboard = () => (
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
        py: 0.1
      }}
    >
      <MyImageGallery />
      <Container maxWidth={false}>
        <Grid container spacing={3}>     
        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
