import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import NextLink from "next/link";

export const ProductListToolbar = ({ userAccess, searchInstitutionName }) => (
  <Box>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography variant="h4">Instituições</Typography>
      {userAccess && (
        <Box>
          <NextLink href="/registerInstitution" passHref>
            <Button color="primary" variant="contained" sx={{ m: 1 }}>
              Adicionar uma nova Instituição
            </Button>
          </NextLink>
        </Box>
      )}
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
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Pesquisar instituição"
              variant="outlined"
              onChange={searchInstitutionName}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
