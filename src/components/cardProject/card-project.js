import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button, Link } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import NextLink from 'next/link';

export const CardProject = ({ project }) => (
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
          <Avatar alt="project" src={project.banner} variant="square" />
        </Box>

        {/* // Typography para ajustes do Titulo */}
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {project.title}
        </Typography>
        <Typography align="left" color="textPrimary" variant="body1">
          {/* {project.description} */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              pb: 3,
            }}
          >
            <Typography description="Coordenador" variant="body2">
              {project.summary}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              pb: 3,
            }}
          >
            <Typography variant="subtitle1">
              Públicos Envolvidos:
              <Box sx={{ pb: 1 }} />
              <Typography description="Coordenador" variant="body2">
                Instituições sem fins lucrativos (creches, asilos, casas de apoio), associações
                comunitárias, escolas públicas, equipamentos públicos de saúde e projetos de
                extensão da própria UCB.
              </Typography>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              pb: 3,
            }}
          >
            <Typography variant="subtitle1">
              Informações Relevantes:
              <Box sx={{ pb: 1 }} />
              <Typography description="Coordenador" variant="body2">
                O(a) estudante inscrito(a) no Projeto estará segurado contra acidentes. O(a)
                estudante interessado(a) em continuar atuando na instituição parceira/projeto, mesmo
                após o cumprimento das 36 horas previstas, poderá fazê-lo na modalidade voluntário e
                em acordo com a instituição na qual foi desenvolvida a atividade. Saiba mais
                acessando o {" "}
                <Link href="https://ucb.catolica.edu.br/portal/wp-content/uploads/2022/03/EDITAL-UCB-016.2022-PROGRAMA-SER1-2022-REPUBLICACAO.pdf">
                  {"edital aqui."}
                </Link>
              </Typography>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
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
              <Typography variant="body2">Localização: {project.address} -{project.city}</Typography>
            </Typography>
          </Box>
        </Typography>
      </CardContent>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <ClockIcon color="action" />
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Carga horária: 36 horas.
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            {/* <DownloadIcon color="action" /> */}
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              {project.totalDownloads}{" "}
              <NextLink href="/projetoSer+" passHref>
                <Button color="primary" variant="contained">
                  Inscrever-se
                </Button>
              </NextLink>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  </>
);
