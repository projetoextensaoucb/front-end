import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import NextLink from 'next/link';


export const ProductListToolbar = ({userAccess}) => (
  <Box>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}>
      <Typography
      
        variant="h4"
      >
        Projetos
      </Typography>
      { userAccess &&
      <Box>
        <NextLink
            href="/registerProject"
            passHref
          >
            <Button
              color="primary"
              variant="contained"
              
              sx={{ m: 1 }}
            >
              Adicionar um novo Projeto
            </Button>
        </NextLink>

        <NextLink
          href="/editProject"
          passHref
          >
          <Button
            color="primary"
            variant="contained"

            sx={{ m: 1 }}
            >
            Editar um Projeto
          </Button>
        </NextLink>
      </Box>
      }
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
              placeholder="Pesquisar por projeto"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
