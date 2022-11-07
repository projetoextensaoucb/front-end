import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { getUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import * as Yup from 'yup';
import Head from "next/head";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import { Box, Button, Container, TextField, Card, LinearProgress, CardHeader, Divider, CardContent, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RegisterCourse() {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
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
          .required(
            'É necessário um nome para o curso.')
      }),
      
      onSubmit: async () => {
        const userSession = getUserSession()
  
        let nameCourse = formik.values.name;
        let accessToken = userSession.accessToken;
  
        console.log(`NOME PASSADO PARA O CURSO: ${nameCourse}`)
        console.log(`TOKEN: ${accessToken}`)
        
        setLoading(true);
        axios.post(`${BASE_API}/course/create`,{
            name: nameCourse
          },{
          headers: {
            'x-access-token': accessToken
          }
          }).then(response => {
            alert("Curso Criado!")
            window.location.reload();
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
        <title>Cadastro de curso | Extensão - UCB</title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="sm">

          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >

            <CardContent>

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
                    label="Nome do Curso"
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
                    Criar curso
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

RegisterCourse.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
