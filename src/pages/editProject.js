import Head from 'next/head';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { AccountProfile } from '../components/project/project-profile';
import { AccountProfileDetails } from '../components/project/project-info-details';
import { DashboardLayout } from '../components/dashboard-layout';
import NextLink from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Account = () => (
  <>
    <Head>
      <title>
        Account | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 15
      }}
    >
      <Container>
          <NextLink
            href="/products"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Tela de Projetos
            </Button>
          </NextLink>
        </Container>
      <Container maxWidth="lg">
        <Typography
          sx={{ mb: 3 }}
          variant="h4"
        >
          Edição de Projeto
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
