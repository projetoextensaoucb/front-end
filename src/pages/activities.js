import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserSession, setUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import { DashboardLayout } from "../components/dashboard-layout";
import { ActivitiesListToolbar } from "../components/activities/activities-list-toolbar";
import { ActivitiesCard } from "../components/activities/activities-card";
import { CardActivitie } from "../components/cardActivitie/card-activitie";
import Head from "next/head";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Activities() {
  const [institutions, setActivities] = useState([]);
  const [searchActivities, setSearchActivities] = useState([]);
  const [activitie, setActivitie] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const user = getUserSession();
    if (user) {
      const hasAccess = user.roles.find((role) => role === "admin");
      setUser(hasAccess);

      if (!getUserSession()) {
        router.push("/login");
      }
      axios
        .get(`${BASE_API}/activity/all`, {
          headers: {
            "x-access-token": user.accessToken,
          },
        })
        .then((response) => {
          console.log(response.data.activitys);
          if (response.status == 200) {
            setActivities(response.data.activitys);
            setSearchActivities(response.data.activitys);
          }
          setLoading(false);
        })
        .catch((error) => {
          confirm(error);
          router.push("/");
        });
    } else {
      router.push("/login");
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const childToParent = (childdata) => {
    console.log(childdata);
    institutions.find((el) => {
      if (el.id === childdata) {
        setActivitie(el);
      }
    });
    // buscar na lista
    // passar os dados pro card
    handleClickOpen();
  };

  function searchActivitieName(payload) {
    let newList = institutions.filter((el) =>
      el.name.toLowerCase().includes(payload.target.value.toLowerCase())
    );
    setSearchActivities(newList);
  }

  return (
    <>
      <Head>
        <title>Atividades | Extensão - UCB</title>
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

        {/* <CardActivitie activitie={activitie} /> */}
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
            <ActivitiesListToolbar searchActivitieName={searchActivitieName} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {searchActivities.map((activitie) => (
                  <Grid item key={activitie.id} lg={4} md={6} xs={12}>
                    <ActivitiesCard activitie={activitie} childToParent={childToParent} />
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
              {/* <Pagination color="primary" count={3} size="small" /> */}
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
}

Activities.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
