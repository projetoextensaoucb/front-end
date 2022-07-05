import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { BASE_API } from 'src/configs/appconfigs';

const Login = () => {
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
          'Deve ser fornecido um email ou matrícula válidos'),
      password: Yup
        .string()
        .max(255)
        .required(
          'É necessário fornecer uma senha')
    }),
    onSubmit: () => {

      axios.post(`${BASE_API}/auth/signin`, {
        matriculation: formik.values.login,
        email: formik.values.login,
        institucionalEmail: formik.values.login,
        password: formik.values.password,
      })
        .then(response => {
          router.push('/account')
        })
        .catch(error => {
          if (error.response) {
            alert(`${error.response.data.message}`)
            console.log(error.response.data)
            // window.location.reload(false);
            Location.reload(false)     // refresh page
          }
        })
    }
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
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
                Utilize o seu email, email universitário ou matrícula
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
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
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
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Não tem uma conta?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Cadastrar
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
