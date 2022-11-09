import axios from 'axios'
import * as Yup from 'yup';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { LogoPrincipal } from 'src/components/logoPrincipal';
import { getUserSession } from 'src/configs/userSession';
import { useState, useEffect } from 'react'
import { BASE_API } from 'src/configs/appconfigs';
import { Box, Button, Checkbox, Container, FormHelperText, Link, TextField, Typography, Select, FormControl, CircularProgress, Card, CardContent, MenuItem, InputLabel } from '@mui/material';
import Voltar from "src/components/voltar";

const Register = () => {
  const [course, setCourse] = useState("");
  const [courseList, setCourseList] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const user = getUserSession();
  var courseId = 1;

  const handleChange = (event) => {
    setCourse(event.target.value);
    console.log(course);
    console.log(courseList);
    courseList.forEach( element => {
      if( element.name === course ) {
        courseId = element.id
        console.log(courseId)
      }
    })
  };

useEffect(() => {
    setLoading(true);
    if (user.accessToken) {    
      axios.get(`${BASE_API}/course/all`
      ).then((response) => {
          var listCourses = [];
          response.data.courses.forEach(element => {
            listCourses.push(element)
          });
          setLoading(false);
        })
        .catch((error) => {
          alert(error.message)
          router.push('/')
        });
    }
  }, [])

  const router = useRouter();
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
        .email('É necessário inserir um email válido')
        .max(255)
        .required('É necessário um email'),

      institutionalEmail: Yup
        .string()
        .email('É necessário um email institucional válido')
        .max(255),

      name: Yup
        .string()
        .max(255)
        .required('É necessário fornecer um nome'),

      password: Yup
        .string()
        .max(255)
        .required('É necessário fornecer uma senha'),

      matriculation: Yup
        .string()
        .min(10),

      policy: Yup
        .boolean()
        .oneOf([true], 'Para criar uma conta você precisa aceitar os termos e condições.'),

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
        course: courseId,
        roles: ["aluno"],
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
            window.location.reload(); // refresh page
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

              <Voltar destino='/users'/>

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
                    Forneça as informações abaixo para criar sua conta
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
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}

                  variant="outlined"
                />

                {/* <TextField
                  error={Boolean(formik.touched.matriculation && formik.errors.matriculation)}
                  fullWidth
                  helperText={formik.touched.matriculation && formik.errors.matriculation}
                  label="Matrícula"
                  margin="normal"
                  name="matriculation"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.matriculation}
                  variant="outlined"
                /> */}

                <FormControl sx={{ my: 1, minWidth: 1 }}>
                  <InputLabel>Curso</InputLabel>
                  <Select
                    fullWidth
                    value={course}
                    onChange={handleChange}
                    label="Curso"
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

                <TextField
                  error={Boolean(formik.touched.institutionalEmail && formik.errors.institutionalEmail)}
                  fullWidth
                  helperText={formik.touched.institutionalEmail && formik.errors.institutionalEmail}
                  label="Email Universitário"
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
                  label="Senha"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                {/* TELEFONES */}
                {/* <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: -1
                  }}
                >
                  <TextField
                    error={Boolean(formik.touched.telephone && formik.errors.telephone)}
                    fullWidth
                    helperText={formik.touched.telephone && formik.errors.telephone}
                    label="Telefone Pessoal"
                    margin="normal"
                    name="telephone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.telephone}
                    variant="outlined"
                  />

                  <TextField
                    error={Boolean(formik.touched.residentialTelephone && formik.errors.residentialTelephone)}
                    fullWidth
                    helperText={formik.touched.residentialTelephone && formik.errors.residentialTelephone}
                    label="Telefone residencial"
                    margin="normal"
                    name="residentialTelephone"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.residentialTelephone}
                    variant="outlined"
                  />
                </Box> */}

                {/* RG E CPF */}

                {/* <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    m: -1
                  }}
                >
                  <TextField
                    error={Boolean(formik.touched.rg && formik.errors.rg)}
                    fullWidth
                    helperText={formik.touched.rg && formik.errors.rg}
                    label="RG"
                    margin="normal"
                    name="rg"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.rg}
                    variant="outlined"
                  />

                  <TextField
                    error={Boolean(formik.touched.cpf && formik.errors.cpf)}
                    fullWidth
                    helperText={formik.touched.cpf && formik.errors.cpf}
                    label="CPF"
                    margin="normal"
                    name="cpf"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                    variant="outlined"
                  />
                </Box> */}

                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  {/* <Checkbox
                    checked={formik.values.foreigner}
                    name="foreigner"
                    onChange={formik.handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Sou Estrangeiro
                  </Typography> */}
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
                    Cadastrar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  Tem uma conta?
                  {' '}
                  <NextLink
                    href="/login"
                    passHref
                  >
                    <Link
                      variant="subtitle2"
                      underline="hover"
                    >
                      Login
                    </Link>
                  </NextLink>
                </Typography>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default Register;
