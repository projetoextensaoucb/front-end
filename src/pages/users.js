import axios from "axios";
import { BASE_API } from "src/configs/appconfigs";
import Head from "next/head";
import { useRouter } from "next/router";
import NextLink from 'next/link';
import { useState, useEffect } from "react";
import { getUserSession } from "src/configs/userSession";
import { DashboardLayout } from "../components/dashboard-layout";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { Box, Container, CircularProgress, Typography, Button } from "@mui/material";
import Voltar from "src/components/voltar";

const Customers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const session = getUserSession();
    let data = session.roles.find((el) => el === "admin");
    if (data) {
      axios
        .get(`${BASE_API}/user/all`, {
          headers: {
            "x-access-token": "" + session.accessToken,
          },
        })
        .then((response) => {
          setUsers(response.data.users);
          setLoading(false);
        })
        .catch((error) => {
          alert(error.response.data.message);
          router.push("/");
        });
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Usuarios | Extensão - UCB</title>
      </Head>

      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
        
          <Voltar destino='/settings'/>
        
          <CustomerListToolbar />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <CircularProgress></CircularProgress>
            </Box>
          ) : (
            <Box sx={{ mt: 2 }}>
              <CustomerListResults customers={users} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
