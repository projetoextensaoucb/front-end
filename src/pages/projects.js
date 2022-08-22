import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { ProductListToolbar } from '../components/project/project-list-toolbar';
import { ProjectCard } from '../components/project/project-card';
import { DashboardLayout } from '../components/dashboard-layout';
import  { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_API } from 'src/configs/appconfigs';
import { CardProject } from '../components/cardProject/card-project';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { getUserSession, setUserSession } from 'src/configs/userSession';

import { useRouter } from 'next/router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Products() {
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState([])
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({})
  const router = useRouter()

  useEffect(() => {
    const userSession = getUserSession()
    let userAccess = userSession.roles.find((role) => role === 'admin')
    setUser(userAccess)
    const verifySession = async () => {
      if(!getUserSession()) { 
        router.push('/login')
      }
    }
    verifySession()
  }, [])

  useEffect(() => {
    const getProjects = async () => {
      console.log("chamou")
      axios.get(`${BASE_API}/project/all`, {})
      .then(response => {
        console.log(response.data.projects);
        setProjects(response.data.projects)
      })
      .catch(error => {
        console.log("error")
      })
    }
    getProjects()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const childToParent = (childdata) => {
    console.log(childdata);
    console.log(projects);
    projects.find((el) => {
      if (el.id === childdata) {
        setProject(el);
      }
    })
    // buscar na lista
    // passar os dados pro card
    handleClickOpen();
  }

  return (
    <>
      <Head>
        <title>
          Projetos | Extensão - UCB
      </title>
      </Head>
      <Dialog
      fullWidth = {true}
      maxWidth="xl"
        open={open}
        scroll="body"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CardProject project={project}/>
      </Dialog>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 15
        }}
      >
        <Container maxWidth={false}>
          <ProductListToolbar userAccess={user} />
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
                  <ProjectCard project={project} childToParent={childToParent} />
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
