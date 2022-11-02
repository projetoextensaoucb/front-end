import * as React from 'react';
import { useState } from "react";
import { forwardRef } from "react";
import { AccountUserDetails } from "../account/account-user-details";
import { AccountProfile } from "../account/account-profile";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Box, Card, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Dialog, AppBar, Slide, Toolbar,  } from "@mui/material"; // DataGrid, GridColDef, GridValueGetterParams,TablePagination

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export function CustomerListResults({ customers }) {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [user, setUser] = useState({});
  const [limit, setLimit] = useState(customers.length);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = useState(false);

  let inicioLista = 0;

  const useStyles = makeStyles({
    list: {
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#2222",
      },
    },
  });

  const style = useStyles();

  function handleClickOpen(customer) {
    if (customer) {
      setUser(customer);
      setOpen(true);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSelectAll(event) {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  }

  function handleSelectOne(event, id) {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  }

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
  };

  function alteraInicioLista(inicioLista){
    inicioLista += 5;
    console.log("Valor de inicioLista: "+inicioLista);
  };

  // function handleChangePage (event, newPage) {
  //   setPage(newPage);
  //   console.log("Valor de newPage: "+newPage);
  //   alteraInicioLista(inicioLista);
  // };

  // name, email, matriculation, telephone, createdAt
  return (
    <Card>
      {/* inicio do dialog */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            px: 1,
            py: 5,
          }}
        >
          <Container maxWidth={false}>
            <Typography sx={{ mb: 3 }} variant="h4">
              Conta do usuario
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountUserDetails userData={user} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Dialog>
      {/* fim do dialog */}
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Matricula</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Data de registro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  className={style.list}
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  onClick={() => handleClickOpen(customer)}
                >
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.matriculation}</TableCell>
                  <TableCell>{customer.telephone}</TableCell>
                  <TableCell>{customer.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination
        component="div"
        count={customers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleLimitChange}
      /> */}
    </Card>
  );
}

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};