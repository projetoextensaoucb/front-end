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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export const ProductListToolbar = (props) => (
  <Box {...props}>
    <NextLink
      href="/products"
      passHref
    >
      <Button
        component="a"
        startIcon={<ArrowBackIcon fontSize="small" />}
      >
        Retornar para tela de projetos
      </Button>
    </NextLink>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: 1
      }}
    >       
    </Box>
  </Box>
);
