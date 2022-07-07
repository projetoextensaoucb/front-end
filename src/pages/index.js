import Head from 'next/head';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

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
        py: 8
      }}
    >
      
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
