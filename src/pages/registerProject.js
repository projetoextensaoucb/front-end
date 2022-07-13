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
  Avatar,
  TextField,
  Typography
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { da } from 'date-fns/locale';
import { BASE_API } from 'src/configs/appconfigs';
import { useState, useEffect } from 'react'
import { getUserSession, setUserSession } from 'src/configs/userSession';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';


export default function RegisterProject() {
  const router = useRouter()
  const [startDate, setStartDate] = useState(Date());
  const [endDate, setEndDate] = useState(Date());
  const [selectedFile, setSelectedFile] = useState(null);
  var session
  useEffect(() => {
    const verifySession = async () => {
      session = getUserSession()
      console.log(session)
      if (!session) {
        router.push('/login')
      }
    }
    verifySession()
  }, [])

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      vacancies: 0,
      startDate: '',
      endDate: '',
      summary: '',
      description: '',
      city: ''
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required(
          'É necessário um nome para o projeto.'),

      address: Yup
        .string()
        .max(255),

      vacancies: Yup
        .number()
        .required(
          'É necessário fornecer um número de vagas'),
      summary: Yup
        .string()
        .max(250, 'O resumo deve conter no máximo 250 caracteres'),

      description: Yup
        .string()
        .max(800, 'A descrição deve conter no máximo 800 caracteres.'),

      city: Yup
        .string()
        .max(255)

    }),

    
    onSubmit: () => {
      const userSession = getUserSession()
      var formmatedStartDate = new Date(startDate)
      var formmatedEndDate = new Date(endDate)
      var finalStartDate = formmatedStartDate.getFullYear() + '-' + (formmatedStartDate.getMonth() + 1)  + '-' +  formmatedStartDate.getDate()
      var finalEndDate =  formmatedEndDate.getFullYear() + '-' + (formmatedEndDate.getMonth() + 1)  + '-' +  formmatedEndDate.getDate()
      console.log(`DATAS SELECIONADAS ${finalStartDate}`)
      console.log(`TOKEN: ${userSession.accessToken}`)
      const projectFormData = new FormData()
      projectFormData.append("name", formik.values.name)
      projectFormData.append("address", formik.values.address)
      projectFormData.append("vacancies", formik.values.vacancies)
      projectFormData.append("startDate", finalStartDate)
      projectFormData.append("endDate", finalEndDate)
      projectFormData.append("summary", formik.values.summary)
      projectFormData.append("description", formik.values.description)
      projectFormData.append("city", formik.values.city)
      projectFormData.append("image", selectedFile);
      axios.post(`${BASE_API}/project/create`, 
         projectFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            'x-access-token': userSession.accessToken
          },
      })
        .then(response => {
          alert("Projeto Criado!")
          router.push('/projects')
        })
        .catch(error => {
          if (error.response) {
            alert(`${error.response.data.message}`)
            console.log(error.response.data)
             window.location.reload();
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
            href="/projects"
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

              <Avatar
                alignItems="center"
                src= {selectedFile ? URL.createObjectURL(selectedFile) : "https://via.placeholder.com/400.png"}
                sx={{
                  height: 120,
                  mb: 2,
                  width: 120
                }}
              />
              <Button variant="contained" onChange={handleFileSelect} component="label">
                Adicionar Logo
               <input hidden accept="image/*" multiple type="file" />
              </Button>
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
              error={Boolean(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Endereço"
              margin="normal"
              name="address"
              multiline
              maxRows={4}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              variant="outlined"
            />

            <TextField
              error={Boolean(formik.touched.summary && formik.errors.summary)}
              fullWidth
              helperText={formik.touched.summary && formik.errors.summary}
              label="Um breve resumo"
              margin="normal"
              name="summary"
              multiline
              maxRows={10}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.summary}
              variant="outlined"
            />


            <TextField
              error={Boolean(formik.touched.description && formik.errors.description)}
              fullWidth
              helperText={formik.touched.description && formik.errors.description}
              label="Proposta do projeto, responsáveis, atividades, história da entidade, contato"
              margin="normal"
              name="description"
              multiline
              maxRows={10}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              variant="outlined"
            />

            <Box sx={{ py: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data de início"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  format="YYYY-MM-DD"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data de Encerramento"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  format="YYYY-MM-DD"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

            <TextField
              helperText={formik.touched.vacancies && formik.errors.vacancies}
              error={Boolean(formik.touched.vacancies && formik.errors.vacancies)}
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              onChange={formik.handleChange}
              name="vacancies"
              value={formik.values.vacancies}
              label="Quantidade de vagas"
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
                Cadastrar
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};