import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <ListItem
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
      }}
      {...others}
    >
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            // Cor sidebar no item ativo
            backgroundColor: active && 'rgba(33,111,125,1)',
            borderRadius: 1,
            color: active ? 'secondary.main' : 'neutral.300',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? 'secondary.main' : 'neutral.400'
            },
            // Cor do hover sidebar in action
            '&:hover': {
              backgroundColor: 'rgba(33,111,125,1)'
            }
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
