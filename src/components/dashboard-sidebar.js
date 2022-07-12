import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Avatar, AppBar, Box, Button, Divider, Drawer, Icon, TextField, Typography, Toolbar, IconButton, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import styled from '@emotion/styled';

const items = [
  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Conta'
  },
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Home'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Definições'
  },
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Usuários'
  },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Cadastrar Usuários'
  // },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Projetos'
  }
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/registerProject',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Cadastrar Projetos'
  // },
  // {
  //   href: '/projedit',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Editar Projetos'
  // }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* Primeiro divider do dashboard lateral esquerda*/}
      
        
        {/* Chamando logo da UCB */}
        <Logo>
        
        </Logo>

        <Divider sx={{marginTop: 0, marginBottom: 3, borderColor: 'neutral.100'}}
        
        />

        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: 'neutral.900' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            /* Algumas definições da barra lateral esquerda (cor e tamanho)*/
            backgroundColor: 'neutral.900',
            border: 'none',
            color: '#FFFFFF',
            width: 245
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
