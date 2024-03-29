import { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, useMediaQuery, Button } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import LogoutIcon from '@mui/icons-material/Logout';
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { User as UserIcon } from "../icons/user";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Mural",
  },
  {
    href: "/institutions",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Instituições",
  },
  {
    href: "/activities",
    icon: <FormatListBulletedIcon fontSize="small" />,
    title: "Atividades",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Conta",
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Administrador",
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose, onSidebarOpen } = props;
  const router = useRouter();

  // Função para logout do sistema
  function logout() {
    const validate = confirm("Tem certeza de que deseja encerrar a sessão?");
    if (validate) {
      window.sessionStorage.clear();
      router.push("/login");
    }
  }

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
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
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Primeiro divider do dashboard lateral esquerda*/}

        {/* Chamando logo da UCB */}
        <Logo></Logo>

        <Divider sx={{ marginTop: 0, marginBottom: 3, borderColor: "neutral.100" }} />

        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        
        {/* Botão de logout do sistema */}
        <Button color="secondary" variant="outlined" size="medium" sx={{ m: 1 }} onClick={logout}>
          <LogoutIcon fontSize="small" sx={{mr: 0.5}}></LogoutIcon>
          Sair
        </Button>
        
        <Divider sx={{ borderColor: "neutral.900" }}/>
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
            backgroundColor: "neutral.900",
            border: "none",
            color: "#FFFFFF",
            width: 245,
          },
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
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
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
  open: PropTypes.bool,
};
