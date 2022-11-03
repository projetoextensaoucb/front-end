import Head from "next/head";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { AccountProfile } from "../components/editProject/project-profile";
import { InstitutionDetails } from "../components/editProject/project-info-details";
import { DashboardLayout } from "../components/dashboard-layout";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Account = () => {
  return (
    <>
      <Head>
        <title>Editar Instituição</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 15,
        }}
      >
        <Container>
          <NextLink href="/institutions" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Tela de Instituições
            </Button>
          </NextLink>
        </Container>
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Edição de Instituição
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              {/* passar informações via props */}
              <AccountProfile />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              {/* passar informações via props */}
              <InstitutionDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
