import { Avatar, Box, Card, CardContent, Typography, Button, Link } from "@mui/material";
import NextLink from "next/link";
import { getUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import axios from "axios";
import { useState, useEffect } from "react";

export const CardActivitie = ({ activitie }) => {

  useEffect(() => {
    const userSession = getUserSession();
    const validate = userSession.roles.find((el) => el === "admin");
    if (validate) {
      setIsAdmin(true);
    }
  }, []);

  const subscriptionActivitie = () => {
    const session = getUserSession();
    axios
      .post(
        `${BASE_API}/activity/subscription`,
        {
          idActivity: activitie.id,
          idToUpdate: 0,
        },
        {
          headers: {
            "x-access-token": session.accessToken,
          },
        }
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        if (error.response.data) {
          alert(`${error.response.data.message}`);
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
          {/* // Typography para ajustes do Titulo */}
          <Typography align="center" color="textPrimary" gutterBottom variant="h5">
            {activitie.name}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {/* {activitie.description} */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography description="Coordenador" variant="h5">
                {activitie.name}
              </Typography>
            </Box>

          </Typography>
        </CardContent>

        <Box />
        {/* <DownloadIcon color="action" /> */}
        {/* <Typography
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
              <Button color="primary" hidden={isSubscriber} variant="contained" sx={{ ml: 1 }}>
                Ocultar
              </Button>

              <Button color="primary" hidden={isSubscriber} variant="contained">
                Excluir
              </Button>

              <NextLink href={"/editInstitution"}>
                <Button color="primary" hidden={isSubscriber} variant="contained">
                  Editar
                </Button>
              </NextLink>
            </>
          )}
          <Button
            color="primary"
            hidden={isSubscriber}
            onClick={subscriptionActivitie}
            variant="contained"
            sx={{ mr: 1 }}
          >
            Inscrever-se
          </Button>
        </Typography> */}
      </Card>
    </>
  );
};
