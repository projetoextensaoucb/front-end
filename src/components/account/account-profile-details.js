import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack,
} from "@mui/material";

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    name: "Nome do Aluno",
    email: "usuario@gmail.com",
    institutionalEmail: "aluno@a.ucb.br",
    password: "********",
    residentialTelephone: "(61) 00000-0000",
    telephone: "(61) 00000-0000",
    matriculation: "UC22012204",
    cpf: "000.000.000-00",
    rg: "00.000.000-0",
    disabled: true,
  });

  const editDetails = () => {
    if (values.disabled) {
      setValues({ disabled: false });
    } else {
      setValues({ disabled: true });
    }
  };

  const [password, setPassword] = useState({
    password: "********",
    disabled: true,
  });

  const editPasswords = () => {
    if (password.disabled) {
      setPassword({ disabled: false });
    } else {
      setPassword({ disabled: true });
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.defaultValue,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader title="Perfil do Usúario" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nome completo"
                name="name"
                onChange={handleChange}
                required
                defaultValue={values.name}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
                required
                type="email"
                defaultValue={values.email}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={handleChange}
                required
                type="password"
                defaultValue={values.password}
                variant="outlined"
                disabled={password.disabled && values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Matricula"
                name="matriculation"
                onChange={handleChange}
                required
                defaultValue={values.matriculation}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email institucional"
                name="institutionalEmail"
                onChange={handleChange}
                required
                defaultValue={values.institutionalEmail}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telefone pessoal"
                name="telephone"
                onChange={handleChange}
                defaultValue={values.telephone}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Telefone residencial"
                name="residentialTelephone"
                onChange={handleChange}
                defaultValue={values.residentialTelephone}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="RG"
                name="rg"
                onChange={handleChange}
                defaultValue={values.rg}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                onChange={handleChange}
                defaultValue={values.cpf}
                variant="outlined"
                disabled={values.disabled}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button color="primary" variant="contained" onClick={editDetails}>
              Editar detalhes
            </Button>
            <Button color="primary" variant="contained">
              Salvar detalhes
            </Button>
            <Button color="primary" variant="contained" onClick={editPasswords}>
              Editar senha
            </Button>

          </Stack>
        </Box>
      </Card>
    </form>
  );
};
