import Head from "next/head";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Users as UsersIcon } from "../icons/users";
import { DashboardLayout } from "../components/dashboard-layout";
import { getUserSession } from "src/configs/userSession";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import * as React from "react";

const Settings = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({});

  useEffect(() => {
    const verifySession = async () => {
      if (!getUserSession()) {
        router.push("/login");
      } else {
        const userSession = getUserSession().roles.find((role) => role === "admin");
        setUser(userSession);
      }
    };
    verifySession();
  }, []);

  function logout() {
    const validate = confirm("Tem certeza de que deseja encerrar a sessão?");
    if (validate) {
      window.sessionStorage.clear();
      router.push("/login");
    }
  }
  return (
    <>
      <Head>
        <title>Configurações | Extensão - UCB</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
        }}
      >
        <Typography sx={{ m: 3 }} variant="h4">
          Configurações
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user && (
            <NextLink href="/users" passHref>
              <Button variant="outlined" size="medium" startIcon={<UsersIcon />} sx={{ mr: 1 }}>
                Usuários
              </Button>
            </NextLink>
          )}

          <NextLink href="/registerCourse" passHref>
            <Button variant="outlined" size="medium" startIcon={<AddIcon />} sx={{ ml: 1 }}>
              Criar curso
            </Button>
          </NextLink>
          <Button variant="outlined" size="medium" sx={{ ml: 1 }} onClick={logout}>
            Sair
          </Button>
        </Box>
      </Box>
    </>
  );
};

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
