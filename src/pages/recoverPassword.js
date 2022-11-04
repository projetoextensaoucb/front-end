import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Yup from 'yup';
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import { getUserSession } from 'src/configs/userSession';
import { BASE_API } from 'src/configs/appconfigs';
import { LogoPrincipal } from 'src/components/logoPrincipal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Container, TextField, Typography, LinearProgress, Card, CardContent } from '@mui/material';

export default function RedefinePassword() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
        if(getUserSession()) {
          router.push('/')
        }
      })
  
    const formik = useFormik({
      initialValues: {
        name: ''
      },
      validationSchema: Yup.object({
        name: Yup
          .string()
          .max(255)
          .required('Deve ser fornecido um e-mail ou matrícula válidos.'),
      }),
    });

    const handleSubmit = async (event) => {
      event.preventDefault();
      let login = formik.values.name;
      setLoading(true);
      await axios.post(`${BASE_API}/auth/recoverPassword`, {
        login: login
      }).then((response) => {
        setLoading(false)
        window.alert('Verifique o seu email')
      }).catch((error) => {
        setLoading(false)
        window.alert('Error!')
      })
    }
  return (
    <>
      <Head>
        <title>
            Recuperar senha
        </title>
      </Head>

      <Box sx={{alignSelf: 'center', my: 5}}>
            <LogoPrincipal></LogoPrincipal>
      </Box>

      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/login"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Voltar
            </Button>
          </NextLink>

          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Recuperar senha
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Informe seu e-mail, e-mail universitário ou matrícula.
                  </Typography>
                </Box>
                
                <Box>
                  <TextField
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="E-mail ou matrícula"
                    margin="normal"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    variant="outlined"
                  />
                </Box>
                {
                  loading &&
                  <>
                    <LinearProgress />
                  </>
                }
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Recuperar
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};