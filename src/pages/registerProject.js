import Head from 'next/head';
import NextLink from 'next/link';
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
import  { useState, useEffect } from 'react'
import { getUserSession, setUserSession } from 'src/configs/userSession';

const RegisterProject = () => {
  const router = useRouter()

  useEffect(() => {
    const verifySession = async () => {
      if(!getUserSession()) { 
        router.push('/login')
      }
    }
    verifySession()
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      institutionalEmail: '',
      name: '',
      password: '',
      residentialTelephone: '',
      telephone: '',
      matriculation: '',
      cpf: '',
      rg: '',
      policy: false,
      foreigner: false
    },
    validationSchema: Yup.object({

      email: Yup
        .string()
        .email(
          'É necessário inserir um email válido')
        .max(255)
        .required(
          'É necessário um email'),

      institutionalEmail: Yup
        .string()
        .email(
          'É necessário um email institucional válido'
        )
        .max(255),

      name: Yup
        .string()
        .max(255)
        .required(
          'É necessário fornecer um nome'),

      password: Yup
        .string()
        .max(255)
        .required(
          'É necessário fornecer uma senha'),

      matriculation: Yup
        .string()
        .min(10),

      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'Para criar uma conta você precisa aceitar os termos e condições.'
        ),

      residentialTelephone: Yup
        .string()
        .max(11),

      telephone: Yup
        .string()
        .max(11),

      cpf: Yup
        .string()
        .min(11)
        .max(11),

      rg: Yup
        .string()
        .min(8)
        .max(11)
    }),
    onSubmit: () => {
      axios.post(`${BASE_API}/auth/signup`, {

        name: formik.values.name,
        email: formik.values.email,
        institutionalEmail: formik.values.institutionalEmail,
        foreigner: formik.values.foreigner,
        telephone: formik.values.telephone,
        residentialTelephone: formik.values.residentialTelephone,
        rg: formik.values.rg,
        cpf: formik.values.cpf,
        matriculation: formik.values.matriculation,
        roles: ["user"],
        password: formik.values.password,
      })
        .then(response => {
          alert("Cadastrato Realizado!")
          router.push('/login')
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
            href="/products"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Tela de Projetos
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Crie um novo projeto de extensão
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Forneça as informações abaixo para criação do projeto
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Nome do Projeto"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Quantia de vagas disponível"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}

              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.institutionalEmail && formik.errors.institutionalEmail)}
              fullWidth
              helperText={formik.touched.institutionalEmail && formik.errors.institutionalEmail}
              label="Email para contato"
              margin="normal"
              name="institutionalEmail"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.institutionalEmail}
              variant="outlined"
            />
           
            {/* TELEFONES */}
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                m: 0
              }}
            >
              <TextField
                error={Boolean(formik.touched.telephone && formik.errors.telephone)}
                fullWidth
                helperText={formik.touched.telephone && formik.errors.telephone}
                label="Telefone para contato"
                margin="normal"
                name="telephone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.telephone}
                variant="outlined"
              />            
            </Box>

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              

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
                Cadastrar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};
export default RegisterProject;