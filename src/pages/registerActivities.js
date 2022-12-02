import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import axios from "axios";
import { getUserSession } from "src/configs/userSession";
import { BASE_API } from "src/configs/appconfigs";
import * as Yup from 'yup';
import Head from "next/head";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import { Box, Button, Container, TextField, Card, LinearProgress, CardContent, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Voltar from "src/components/voltar";

export default function RegisterCourse() {

    const [course, setCourse] = useState("");
    const [courseList, setCourseList] = useState([{}]);

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
    
    // Provisório
    const handleChange = (event) => {
        // setCourse(event.target.value);
        // console.log(course);
        // console.log(courseList);
        // courseList.forEach( element => {
        //   if( element.name === course ) {
        //     courseId = element.id
        //     console.log(courseId)
        //   }
        // })
      };

    // Provisório
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
      
    //   Consumo de endpoint provisório
      onSubmit: async () => {
        const userSession = getUserSession()
  
        let nameCourse = formik.values.name;
        let accessToken = userSession.accessToken;
  
        // Lembrar de retirar - provisório
        console.log(`NOME PASSADO PARA A ATIVIDADE: ${nameCourse}`)
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
            if (error.response.data) {
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
        <title>Cadastro de atividade | Extensão - UCB</title>
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

              <Voltar destino='/settings'/>

              <form onSubmit={formik.handleSubmit}>

                <Box sx={{ my: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h4"
                  >
                    Crie uma nova atividade
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Forneça as informações abaixo para o cadastro da atividade em uma instituição.
                  </Typography>
                </Box>

                {/* Box nome da atividade */}
                <Box>
                  <TextField
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Nome da atividade"
                    margin="normal"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    variant="outlined"
                  />
                </Box>

                {/* Box instituição da atividade */}
                <FormControl sx={{ my: 1, minWidth: 1 }}>
                  <InputLabel>Instituição</InputLabel>
                  <Select
                    fullWidth
                    value={course}
                    onChange={handleChange}
                    label="Instituição"
                    name="Curso"
                    labelId="demo-simple-select-readonly-label"
                    id="demo-simple-select-readonly"
                  >
                    { loading ?
                      <Box>
                        <CircularProgress />
                      </Box>
                      :
                      courseList.map((course) => (
                        <MenuItem
                          value={course.name}
                          key={course.id}>
                          {course.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>

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
                    Cadastrar atividade
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
