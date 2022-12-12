import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, LinearProgress, Card, CardHeader, CardContent, Divider } from '@mui/material';
import axios from 'axios'
import { getUserSession, setUserSession } from 'src/configs/userSession';
import { BASE_API } from 'src/configs/appconfigs';
import  {useState, useEffect} from 'react'
import { LogoPrincipal } from 'src/components/logoPrincipal';
import { ClassNames } from '@emotion/react';

const Login = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(getUserSession())
    if(getUserSession()) {
      router.push('/')
    }
  })

  const router = useRouter();
  
  const formik = useFormik({
    initialValues: {
      login: '',
      password: ''
    },
    validationSchema: Yup.object({
      login: Yup
        .string()
        .max(255)
        .required(
          'Deve ser fornecido um e-mail ou matrícula válidos.'),
      password: Yup
        .string()
        .max(255)
        .required(
          'É necessário fornecer uma senha.')
    }),
    onSubmit: () => {
      setLoading(true);
      axios.post(`${BASE_API}/auth/signin`, {
        login: formik.values.login,
        password: formik.values.password,
      })
        .then(response => {
          if (typeof window !== 'undefined') {
            setUserSession(response.data)
            setLoading(false);
            router.push('/account')
          }
        })
        .catch(error => {
          console.log(error);
          if (error.response.data) {
            alert(`${error.response.data.message}`)
            console.log(error.response.data)
            router.push('/login')
          }
        })
    }
  });

  return (
    <>
      <Head>
        <title>Login | Extensão UCB</title>
      </Head>

      <Box 
        component="main"
        sx={{
          backgroundColor: '#1F1F55',
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >         
        <Container maxWidth="sm">

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 5
          }}
        >
          <LogoPrincipal/>        
        </Box>

        <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
        >
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  Login
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Para logar, utilize o seu e-mail, e-mail universitário ou matrícula. Se ainda não possuir log-in, você pode se cadastrar clicando {' '}
                  <NextLink
                    href="/register"
                    passHref
                  >
                    <Link
                      variant="subtitle2"
                      underline="hover"
                    >
                      aqui
                    </Link>
                  </NextLink>.
                </Typography>
              </Box>

              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                </Grid>
              </Grid>

              <TextField
                error={Boolean(formik.touched.login && formik.errors.login)}
                fullWidth
                helperText={formik.touched.login && formik.errors.login}
                label="Email ou Matrícula"
                margin="normal"
                name="login"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.login}
                variant="outlined"
              />

              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Senha"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />

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
                Entrar
                </Button>
              </Box>
              <Box
                textAlign={'right'}
              >
                <NextLink
                  href="/recoverPassword"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Recuperar Senha
                  </Link>
                </NextLink>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  </>
  );
};

export default Login;
