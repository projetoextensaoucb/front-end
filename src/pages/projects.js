import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/project/project-list-toolbar';
import { ProjectCard } from '../components/project/project-card';
import { DashboardLayout } from '../components/dashboard-layout';
import  { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_API } from 'src/configs/appconfigs';

export default function Products() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const getProjects = async () => {
      console.log("chamou")
      axios.get(`${BASE_API}/project/all`, {})
        .then(response => {
          console.log("carregou")
          setProjects(response.data.projects)
        })
        .catch(error => {
          console.log("error")
        })
    }
    getProjects()
  }, [])
  return (
    <>
      <Head>
        <title>
          Projetos | Extensão - UCB
      </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 15
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {projects.map((project) => (
                <Grid
                  item
                  key={project.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            <Pagination
              color="primary"
              count={3}
              size="small"
            />
          </Box>
        </Container>
      </Box>
    </>
  )
}

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
