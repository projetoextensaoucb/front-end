import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Button, Avatar, Badge, Box, IconButton, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { getUserSession } from 'src/configs/userSession';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const session = getUserSession()

  const { onSidebarOpen, ...other } = props;

  return (
    <>

      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 245
          },
          width: {
            lg: 'calc(100% - 280)'
          }
        }}
        {...other}>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onSidebarOpen}
            >
              <MenuIcon/>
            </IconButton>
            
            <Box sx={{ flexGrow: 1 }} />

            <p>{(session.name) == null ? '' : (session.name).toUpperCase()} (RA: {(session.matriculation) == null ? '' : (session.matriculation).toUpperCase()})</p>
            
          </Toolbar>
        </AppBar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
