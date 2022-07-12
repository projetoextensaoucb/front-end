import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import  { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_API } from 'src/configs/appconfigs';

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      console.log("chamou")
      axios.get(`${BASE_API}/users/all`, {})
        .then(response => {
          console.log("carregou")
          setProjects(response.data.customers)
        })
        .catch(error => {
          console.log("error")
        })
    }
    getUsers()
  }, [])

  return (

    <>
      <Head>
        <title>
          Customers | Material Kit
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
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  )
}

Users.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
