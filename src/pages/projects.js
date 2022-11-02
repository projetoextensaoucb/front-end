import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserSession, setUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import { DashboardLayout } from "../components/dashboard-layout";
import { ProductListToolbar } from "../components/project/project-list-toolbar";
import { CardProject } from "../components/cardProject/card-project";
import { ProjectCard } from "../components/project/project-card";
import Head from "next/head";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, Grid, Pagination, CircularProgress, Dialog, AppBar, Toolbar, IconButton, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Products() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const user = getUserSession();
    const hasAccess = user.roles.find((role) => role === "admin");
    setUser(hasAccess);

    if (!getUserSession()) {
      router.push("/login");
    }

    axios
      .get(`${BASE_API}/project/all`, {
        headers: {
          "x-access-token": user.accessToken,
        },
      })
      .then((response) => {
        setProjects(response.data.projects);
        setLoading(false);
      })
      .catch((error) => {
        confirm(error)
        router.push('/')
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const childToParent = (childdata) => {
    projects.find((el) => {
      if (el.id === childdata) {
        setProject(el);
      }
    });
    // buscar na lista
    // passar os dados pro card
    handleClickOpen();
  };

  return (
    <>
      <Head>
        <title>Projetos | Extensão - UCB</title>
      </Head>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        scroll="body"
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CardProject project={project} />
      </Dialog>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 15,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress></CircularProgress>
          </Box>
        ) : (
          <Container maxWidth={false}>
            <ProductListToolbar userAccess={user} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {projects.map((project) => (
                  <Grid item key={project.id} lg={4} md={6} xs={12}>
                    <ProjectCard project={project} childToParent={childToParent} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            >
              <Pagination color="primary" count={3} size="small" />
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
