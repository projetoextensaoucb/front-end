import NextLink from 'next/link';
import { Search as SearchIcon } from '../../icons/search';
import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material';
import Voltar from "src/components/voltar";

export const CustomerListToolbar = (props) => (
  <Box {...props}>

    <Box sx={{mb: 2}}>
      <Typography variant="h4">Usuários</Typography>
    </Box>
        
    <Box 
      sx={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <NextLink
        href="/registerUser"
        passHref
      >
      <Button
        color="primary"
        variant="contained"
      >
        Cadastrar um novo Usuário
        </Button>
      </NextLink>
    </Box>

    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
    
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Pesquisar por usuários"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
