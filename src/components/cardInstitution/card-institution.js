import { Avatar, Box, Card, CardContent, Typography, Button, Link } from "@mui/material";
import NextLink from "next/link";
import { getUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import axios from "axios";
import { useState, useEffect } from "react";

export const CardInstitution = ({ institution }) => {
  const formmatedStartDate = new Date(institution.startDate);
  const formmatedEndDate = new Date(institution.endDate);
  var finalStartDate =
    formmatedStartDate.getDate() +
    "/" +
    (formmatedStartDate.getMonth() + 1) +
    "/" +
    formmatedStartDate.getFullYear();
  var finalEndDate =
    formmatedEndDate.getDate() +
    "/" +
    (formmatedEndDate.getMonth() + 1) +
    "/" +
    formmatedEndDate.getFullYear();

  const [isSubscriber, setIsSubscriber] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifySession = () => {
      const userSession = getUserSession();
      const validate = userSession.roles.find((el) => el === "admin");
      if (validate) {
        setIsAdmin(true);
      }
      // Editar para institutions depois
      if (userSession.inscribedProjects) {
        for (let i = 0; i < userSession.inscribedProjects.length; i++) {
          if (userSession.inscribedProjects[i].id === institution.id) {
            setIsSubscriber(true);
          }
        }
      }
    };
    verifySession();
  }, []);

  const subscriptionProject = () => {
    const session = getUserSession();
    axios
      .post(
        `${BASE_API}/project/subscription`,
        {
          projectId: institution.id,
        },
        {
          headers: {
            "x-access-token": session.accessToken,
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
        setIsSubscriber(true);
      })
      .catch((error) => {
        if (error.response) {
          alert(`${error.response.data.message}`);
          console.log(error.response.data);
          window.location.reload();
        }
      });
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <CardContent>
          {/* // Box para ajustes do Avatar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          >
            <Avatar
              alt="institution"
              src={institution.banner}
              variant="square"
              sx={{
                height: 100,
                mb: 2,
                width: 100,
              }}
            />
          </Box>

          {/* // Typography para ajustes do Titulo */}
          <Typography align="center" color="textPrimary" gutterBottom variant="h5">
            {institution.title}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {/* {institution.description} */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography description="Coordenador" variant="h5">
                {institution.name}
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography variant="subtitle1">
                Resumo:
                <Box sx={{ pb: 1 }} />
                <Typography description="Coordenador" variant="body2">
                  {institution.summary}
                </Typography>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography variant="subtitle1">
                Informações Relevantes:
                <Box sx={{ pb: 1 }} />
                <Typography description="Coordenador" variant="body2">
                  {institution.description}
                  <Link href="https://ucb.catolica.edu.br/portal/wp-content/uploads/2022/03/EDITAL-UCB-016.2022-PROGRAMA-SER1-2022-REPUBLICACAO.pdf">
                    {" edital aqui."}
                  </Link>
                </Typography>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography variant="subtitle1">
                Data de inicio:
                <Box sx={{ pb: 1 }} />
                <Typography description="Coordenador" variant="body2">
                  {finalStartDate}
                </Typography>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography variant="subtitle1">
                Data de Encerramento:
                <Box sx={{ pb: 1 }} />
                <Typography description="Coordenador" variant="body2">
                  {finalEndDate}
                </Typography>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography variant="subtitle1">
                Contatos:
                <Box sx={{ pb: 1 }} />
                <Typography description="Coordenador" variant="body2">
                  Coordenador: José Ivaldo Araújo de Lucena
                </Typography>
                <Typography variant="body2">
                  Contatos: projetosermais@ucb.br / (61) 3356-9032
                </Typography>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography variant="subtitle1">
                Localização:
                <Box sx={{ pb: 1 }} />
                <Typography description="Coordenador" variant="body2">
                  {institution.address} - {institution.city}
                </Typography>
              </Typography>
            </Box>
          </Typography>
        </CardContent>

        <Box />
        {/* <DownloadIcon color="action" /> */}
        <Typography
          color="textSecondary"
          display="inline"
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
            gap: 1,
          }}
          variant="body2"
        >
          {isAdmin && (
            <>
              <Button color="primary" hidden={isSubscriber} variant="contained">
                Ocultar
              </Button>

              <Button color="primary" hidden={isSubscriber} variant="contained">
                Excluir
              </Button>
              <NextLink href={"/editProject"}>
                <Button color="primary" hidden={isSubscriber} variant="contained">
                  Editar
                </Button>
              </NextLink>
            </>
          )}
          <Button
            color="primary"
            hidden={isSubscriber}
            onClick={subscriptionProject}
            variant="contained"
          >
            Inscrever-se
          </Button>
        </Typography>
      </Card>
    </>
  );
};
