import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import  {useEffect} from 'react'
import { getUserSession, setUserSession } from 'src/configs/userSession';
import { useRouter } from 'next/router';
const Account = () => {
  const router = useRouter()
  useEffect(() => {
    const user = getUserSession();
    if (user) {
      // req...
    } else {
      router.push('/login')
    }
  }, [])
  return(
  <>
    <Head>
      <title>
        Conta | Extensão - UCB
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
          sx={{ mb: 3 }}
          variant="h4"
        >
          Conta
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
}

Account.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Account;
