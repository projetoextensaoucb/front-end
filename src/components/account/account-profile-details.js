import { useState } from "react";
import { getUserSession } from 'src/configs/userSession';
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

  const session = getUserSession()

  const [values, setValues] = useState({
    name: session.name,
    email: session.email,
    institutionalEmail: session.institutionalEmail,
    password: "********",
    residentialTelephone: session.residentialTelephone,
    telephone: session.telephone,
    matriculation: session.matriculation,
    cpf: session.cpf,
    rg: session.rg,
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
      name: "oi",
      email: "",
      institutionalEmail: "",
      password: "",
      residentialTelephone: "",
      telephone: "",
      matriculation: "",
      cpf: "",
      rg: "",
      disabled: true,
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
            { session &&
              <>
                <Button color="primary" variant="contained" onClick={editPasswords}>
                  Editar senha
                </Button>
                <Button color="primary" variant="contained">
                    Salvar detalhes
                </Button>
              </>
            }

          </Stack>
        </Box>
      </Card>
    </form>
  );
};
