import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { AccountUserDetails } from "../account/account-user-details";
import { AccountProfile } from "../account/account-profile";

import {
  Grid,
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [user, setUser] = useState({});
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (customer) => {
    setOpen(true);
    customers.find((el) => {
      if (el.id === customer.id) {
        setUser(el);
      }
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
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
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  // name, email, matriculation, telephone, createdAt
  return (
    <Card {...rest}>
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
                <AccountUserDetails userData={user}/>
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
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 5]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
