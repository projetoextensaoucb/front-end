import { useState, useEffect } from "react";
import { getUserSession } from "src/configs/userSession";
import axios from "axios";
import * as Yup from "yup";
import { DashboardLayout } from "../components/dashboard-layout";
import { BASE_API } from "src/configs/appconfigs";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Avatar, TextField, Typography, Grid } from "@mui/material";

import { InstitutionDetails } from "../components/editProject/InstitutionDetails";
export default function registerInstitution() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(Date());
  const [endDate, setEndDate] = useState(Date());
  const [selectedFile, setSelectedFile] = useState(null);
  var session;
  useEffect(() => {
    const verifySession = async () => {
      session = getUserSession();
      console.log(session.roles);
      let data = session.roles.find((el) => el === "admin");
      console.log(data);
      if (!session) {
        router.push("/login");
      }
    };
    verifySession();
  }, []);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      vacancies: 0,
      startDate: "",
      endDate: "",
      summary: "",
      description: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("É necessário um nome para o projeto."),

      address: Yup.string().max(255),

      vacancies: Yup.number().required("É necessário fornecer um número de vagas"),
      summary: Yup.string().max(250, "O resumo deve conter no máximo 250 caracteres"),

      description: Yup.string().max(800, "A descrição deve conter no máximo 800 caracteres."),

      city: Yup.string().max(255),
    }),

    onSubmit: () => {
      const userSession = getUserSession();
      var formmatedStartDate = new Date(startDate);
      var formmatedEndDate = new Date(endDate);
      var finalStartDate =
        formmatedStartDate.getFullYear() +
        "-" +
        (formmatedStartDate.getMonth() + 1) +
        "-" +
        formmatedStartDate.getDate();
      var finalEndDate =
        formmatedEndDate.getFullYear() +
        "-" +
        (formmatedEndDate.getMonth() + 1) +
        "-" +
        formmatedEndDate.getDate();
      console.log(`DATAS SELECIONADAS ${finalStartDate}`);
      console.log(`TOKEN: ${userSession.accessToken}`);
      const projectFormData = new FormData();
      projectFormData.append("name", formik.values.name);
      projectFormData.append("address", formik.values.address);
      projectFormData.append("vacancies", formik.values.vacancies);
      projectFormData.append("startDate", finalStartDate);
      projectFormData.append("endDate", finalEndDate);
      projectFormData.append("summary", formik.values.summary);
      projectFormData.append("description", formik.values.description);
      projectFormData.append("city", formik.values.city);
      projectFormData.append("image", selectedFile);
      axios
        .post(`${BASE_API}/project/create`, projectFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": userSession.accessToken,
          },
        })
        .then((response) => {
          alert("Projeto Criado!");
          router.push("/institutions");
        })
        .catch((error) => {
          if (error.response) {
            alert(`${error.response.data.message}`);
            console.log(error.response.data);
            window.location.reload();
          }
        });
    },
  });

  return (
    <>
      <Head>
        <title>Edite uma instituição | Extenção - UCB</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/institutions" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Voltar
            </Button>
          </NextLink>
                    
          <InstitutionDetails />

        </Container>
      </Box>
    </>
  );
}

registerInstitution.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
