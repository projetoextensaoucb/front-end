import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { BASE_API } from "src/configs/appconfigs";
import { useState, useEffect } from "react";
import { getUserSession, setUserSession } from 'src/configs/userSession';
import { useRouter } from 'next/router';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const session = getUserSession()
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
        })
        .catch((error) => {
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
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={users} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
