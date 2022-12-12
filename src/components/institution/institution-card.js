import PropTypes from "prop-types";
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button } from "@mui/material";
import NextLink from "next/link";

export const InstitutionCard = ({ institution, childToParent, ...rest }) => {
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
          <Avatar alt="Product" src={institution.banner} variant="square" />
        </Box>
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {institution.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {institution.summary}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              <NextLink href="#" passHref>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => childToParent(institution.id)}
                >
                  Informações
                </Button>
              </NextLink>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

InstitutionCard.propTypes = {
  institution: PropTypes.object.isRequired,
};
