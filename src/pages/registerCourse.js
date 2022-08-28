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

export default function RegisterCourse() {
  const router = useRouter()
  const [startDate] = useState(Date());
  const [endDate] = useState(Date());
  const [selectedFile] = useState(null);
  var session
  useEffect(() => {
    const verifySession = async () => {
      session = getUserSession()
      console.log(session.roles)
      let data = session.roles.find((el) => el === 'admin');
      console.log(data);
      if (!session) {
        router.push('/login')
      }
    }
    verifySession()
  }, [])


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

    // Criação de projeto pela API

    // onSubmit: () => {
    //   const userSession = getUserSession()
    //   var formmatedStartDate = new Date(startDate)
    //   var formmatedEndDate = new Date(endDate)
    //   var finalStartDate = formmatedStartDate.getFullYear() + '-' + (formmatedStartDate.getMonth() + 1)  + '-' +  formmatedStartDate.getDate()
    //   var finalEndDate =  formmatedEndDate.getFullYear() + '-' + (formmatedEndDate.getMonth() + 1)  + '-' +  formmatedEndDate.getDate()
    //   console.log(`DATAS SELECIONADAS ${finalStartDate}`)
    //   console.log(`TOKEN: ${userSession.accessToken}`)
    //   const projectFormData = new FormData()
    //   projectFormData.append("name", formik.values.name)
    //   projectFormData.append("address", formik.values.address)
    //   projectFormData.append("vacancies", formik.values.vacancies)
    //   projectFormData.append("startDate", finalStartDate)
    //   projectFormData.append("endDate", finalEndDate)
    //   projectFormData.append("summary", formik.values.summary)
    //   projectFormData.append("description", formik.values.description)
    //   projectFormData.append("city", formik.values.city)
    //   projectFormData.append("image", selectedFile);
    //   axios.post(`${BASE_API}/project/create`, 
    //      projectFormData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         'x-access-token': userSession.accessToken
    //       },
    //   })
    //     .then(() => {
    //       alert("Projeto Criado!")
    //       router.push('/projects')
    //     })
    //     .catch(error => {
    //       if (error.response) {
    //         alert(`${error.response.data.message}`)
    //         console.log(error.response.data)
    //          window.location.reload();
    //       }
    //     })
    // }
  });

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
          <form onSubmit={formik.handleSubmit}>
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