import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BASE_API } from 'src/configs/appconfigs';
import { useState, useEffect } from 'react'
import { getUserSession } from 'src/configs/userSession';
import { AdminPanelSettings } from '@mui/icons-material';

export default function RegisterCourse() {
  var session

  useEffect(() => {

    // Verificando se o usuário é Admin, senão redirecionando ele para o /login
    const verifySession = async () => {
      session = getUserSession()
      console.log(session.roles)
      let data = session.roles.find((el) => el === 'admin' || 'professor');
      if (!session) {
        router.push('/login')
      }
    }
    verifySession()
  }, [])

  // Pegando o nome para o curso
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('É necessário um nome para o curso.'),
    }),
  });

  // Criação de projeto pela API
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userSession = getUserSession()
    console.log(`TOKEN: ${userSession.accessToken}`)

    await axios.post(`${BASE_API}/course/create`, {
      'x-access-token': userSession.accessToken,
      'name': 'name'
    }).then((response) => {
      window.alert('Curso criado com sucesso.')
    }).catch((error) => {
      window.alert('Error!')
    })
  }

  return (
    <>
      <Head>
        <title>
          Cadastro de curso
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
            href="/settings"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Voltar
            </Button>
          </NextLink>
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Crie um novo curso
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Forneça as informações abaixo para o cadastro do curso.
              </Typography>
            </Box>

            {/* Box nome do curso */}
            <Box>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Nome do curso"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
              />
            </Box>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Cadastrar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};