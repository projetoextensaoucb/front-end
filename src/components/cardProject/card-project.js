import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button, Link } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import NextLink from 'next/link';
import { getUserSession, setUserSession } from 'src/configs/userSession';
import { BASE_API } from 'src/configs/appconfigs';
import axios from 'axios'
import { useState, useEffect } from 'react'

export const CardProject = ({ project }) => {
  const formmatedStartDate = new Date(project.startDate)
  const formmatedEndDate = new Date(project.endDate)
  var finalStartDate = formmatedStartDate.getDate() + '/' + (formmatedStartDate.getMonth() + 1) + '/' + formmatedStartDate.getFullYear()
  var finalEndDate = formmatedEndDate.getDate() + '/' + (formmatedEndDate.getMonth() + 1) + '/' + formmatedEndDate.getFullYear()

  const [isSubscriber, setIsSubscriber] = useState(false)


  useEffect(() => {
    const verifySession = async () => {
      const userSession = getUserSession()
      for (let i = 0; i < userSession.inscribedProjects.length; i++) {
        if (userSession.inscribedProjects[i].id === project.id) {
            setIsSubscriber(true)
        }
      }
    }
    verifySession()
  }, [])

  const subscriptionProject = () => {
    console.log(project.id)
    const session = getUserSession()
    console.log(session.id)
    axios.post(`${BASE_API}/project/subscription`, {
      projectId: project.id,
    }, {
      headers: {
        'x-access-token': session.accessToken
      },
    })
      .then(response => {
        alert(response.data.message)
        setIsSubscriber(true)
      })
      .catch(error => {
        if (error.response) {
          alert(`${error.response.data.message}`)
          console.log(error.response.data)
          window.location.reload();
        }
      })

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
            <Avatar alt="project" src={project.banner} variant="square" sx={{
              height: 100,
              mb: 2,
              width: 100
            }} />
          </Box>

          {/* // Typography para ajustes do Titulo */}
          <Typography align="center" color="textPrimary" gutterBottom variant="h5">
            {project.title}
          </Typography>
          <Typography align="center" color="textPrimary" variant="body1">
            {/* {project.description} */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 3,
              }}
            >
              <Typography description="Coordenador" variant="h5">
                {project.name}
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
                  {project.summary}
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
                  {project.description}
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
                  {project.address} - {project.city}
                </Typography>
              </Typography>
            </Box>

          </Typography>
        </CardContent>

        <Box />
        {/* <DownloadIcon color="action" /> */}
        <Typography color="textSecondary" display="inline" sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }} variant="body2">
          <Button color="primary" hidden = {isSubscriber} onClick={subscriptionProject} variant="contained">
            Inscrever-se
                </Button>
        </Typography>
      </Card>
    </>
  )
}
