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

export default function RedefinePassword() {
    useEffect(() => {
        console.log(getUserSession())
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

  return (
    <>
      <Head>
        <title>
            Recuperar senha
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
          <form onSubmit={formik.handleSubmit}>
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
                Infrorme seu e-mail, e-mail universitário ou matrícula.
              </Typography>
            </Box>
            
            {/* Box nome do curso */}
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
        </Container>
      </Box>
    </>
  );
};