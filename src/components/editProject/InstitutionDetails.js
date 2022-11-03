import { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Avatar } from "@mui/material";

export const InstitutionDetails = (props) => {
  const [values, setValues] = useState({
    firstName: "Instituição - UCB",
    resume: "Um breve resumo sobre a instituição",
    endereco: "Endereço da insituição",
    phone: "",
    email: "extensão@ucb.br",
    siteInstituicao: "Site da instituição",
    course: "Curso"
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="Para realizar a edição nas informações da Instituição basta inserir os novos dados e salvar os detalhes."
          title="Informações da Instituição"
        />

        <Divider />

        <CardContent>

          {/* Box logo do projeto */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                height: 120,
                mb: 2,
                width: 120,
              }}
            />
          </Box>

          {/* Box adicionar logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: "1em"
            }}
          >
            <Button variant="contained" component="label">
              Editar Logo
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Nome da instituição"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Um breve resumo"
                name="lastName"
                onChange={handleChange}
                required
                value={values.resume}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Endereço"
                name="lastName"
                onChange={handleChange}
                required
                value={values.endereco}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telefone para contato"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="E-mail para contato"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Site da instituição"
                name="email"
                onChange={handleChange}
                required
                value={values.siteInstituicao}
                variant="outlined"
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Curso"
                name="email"
                onChange={handleChange}
                required
                value={values.course}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Salvar detalhes
          </Button>
        </Box>
      </Card>
    </form>
  );
};
