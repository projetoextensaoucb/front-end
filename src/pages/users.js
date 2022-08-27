import Head from "next/head";
import { Box, Container, Snackbar, CircularProgress } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { BASE_API } from "src/configs/appconfigs";
import { useState, useEffect, open } from "react";
import { getUserSession } from 'src/configs/userSession';
import { useRouter } from 'next/router';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const session = getUserSession()
      setLoading(true);
      axios
        .get(
          `${BASE_API}/user/all`,
          {
            headers: {
              "x-access-token": "" + session.accessToken,
            },
          }
        )
        .then((response) => {
          setUsers(response.data.users);
          setLoading(false);
        })
        .catch((error) => {
          // Colocar Alert da Mui
          // <Alert variant="filled" severity="error">
          //     Sem autorização!
          // </Alert>
          alert(error.response.data.message)
          router.push('/settings')
        });
    };
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Usuarios</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          { loading
            ?
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '2rem',
            }}>
            <CircularProgress></CircularProgress>
          </Box>
          :
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={users} />
          </Box>
          }
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
