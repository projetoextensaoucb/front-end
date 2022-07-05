import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { da } from 'date-fns/locale';
import { BASE_API } from 'src/configs/appconfigs';

const Register = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      institutionalEmail: '',
      name: '',
      password: '',
      policy: false,
      foreigner: false
    },
    validationSchema: Yup.object({
      email: Yup
        .max(255)
        .required(
          'Email is required'),
      institutionalEmail: Yup
        .string()
        .email(
          'valid'
        )
        .max(255)
        .required(
          'Email is required'),
      name: Yup

        .string()
        .email(
          'valid'
        )
        .max(255)
        .required(
          'Email is required'),
      name: Yup
        .string()
        .max(255)
        .required(
        )
    }),
    onSubmit: () => {
      axios.post(`${BASE_API}/auth/signup`, {

        name: formik.values.name,
        email: formik.values.email,
        institutionalEmail: formik.values.institutionalEmail,
        foreigner: formik.values.foreigner,
        roles: ["user"],
        password: formik.values.password,
      })
        .then(data => {
          router('/login')
        })
        .catch(error => {
          console.log(error)
        })
    }
  });

  return (
    <>
      <Head>
        <title>
          Cadastro
        </title>
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
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Home
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Crie uma nova conta
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use seu e-mail para criar uma nova conta
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nome"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.institutionalEmail && formik.errors.institutionalEmail)}
              fullWidth
              helperText={formik.touched.institutionalEmail && formik.errors.institutionalEmail}
              label="Email Institucional"
              margin="normal"
              name="institutionalEmail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.institutionalEmail}

              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.institutionalEmail && formik.errors.institutionalEmail)}
              fullWidth
              helperText={formik.touched.institutionalEmail && formik.errors.institutionalEmail}
              label="Email Institucional"
              margin="normal"
              name="institutionalEmail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.institutionalEmail}
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

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
                 <Checkbox
                checked={formik.values.foreigner}
                name="foreigner"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Sou Estrangeiro
              </Typography>
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Eu li os
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Termos e Condições
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/login"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};
export default Register;