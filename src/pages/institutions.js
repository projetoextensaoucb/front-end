import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserSession, setUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import { DashboardLayout } from "../components/dashboard-layout";
import { ProductListToolbar } from "../components/institution/instinution-list-toolbar";
import { CardInstitution } from "../components/cardInstitution/card-institution";
import { InstitutionCard } from "../components/institution/institution-card";
import Head from "next/head";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Container,
  Grid,
  Pagination,
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
export default function Products() {
  const [institutions, setInstitutions] = useState([]);
  const [searchInstitutions, setSearchInstitutions] = useState([]);
  const [institution, setInstitution] = useState([]);
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
        // Editar para institutions/all
        headers: {
          "x-access-token": user.accessToken,
        },
      })
      .then((response) => {
        setInstitutions(response.data.projects); // Editar depois para institutions
        setLoading(false);
      })
      .catch((error) => {
        confirm(error);
        router.push("/");
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const childToParent = (childdata) => {
    institutions.find((el) => {
      if (el.id === childdata) {
        setInstitution(el);
      }
    });
    // buscar na lista
    // passar os dados pro card
    handleClickOpen();
  };

  function searchInstitutionName(payload) {
    let newList = institutions.filter((el) =>
      el.name.toLowerCase().includes(payload.target.value.toLowerCase())
    );
    setSearchInstitutions(newList);
  }

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
        <CardInstitution institution={institution} />
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
            <ProductListToolbar userAccess={user} searchInstitutionName={searchInstitutionName} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {searchInstitutions.map((institution) => (
                  <Grid item key={institution.id} lg={4} md={6} xs={12}>
                    <InstitutionCard institution={institution} childToParent={childToParent} />
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

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
