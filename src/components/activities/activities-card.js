import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button } from "@mui/material";

export const ActivitiesCard = ({ activitie, childToParent, ...rest }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar alt="Product" src={activitie.banner} variant="square" />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {activitie.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {activitie.summary}
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
            <Typography color="textSecondary" display="inline" sx={{ px: 1 }} variant="body2">
              <Button
                color="primary"
                variant="contained"
                onClick={() => childToParent(activitie.id)}
              >
                Cadastrar Atividade
              </Button>
            </Typography>
            <Typography color="textSecondary" display="inline" sx={{ px: 1, height: "100%" }} variant="body2">
              <Button
                color="primary"
                variant="contained"
                onClick={() => childToParent(activitie.id)}
                sx={{ height: "100%" }}
              >
                Informações
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ActivitiesCard.propTypes = {
  activitie: PropTypes.object.isRequired,
};
