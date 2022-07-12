import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

import axios from "axios";
import { BASE_API } from "src/configs/appconfigs";
import { useState, useEffect } from "react";

const Customers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      console.log("chamou");
      axios
        .get(
          `${BASE_API}/user/all`,
          {},
          {
            headers: {
              "content-type": "text/json",
              "x-access-token": "",
            },
          }
        )
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.log("error" + error);
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
