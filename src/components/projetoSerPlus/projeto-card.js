import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, Button, Link } from '@mui/material';
import { Clock as ClockIcon } from '../../icons/clock';
import { Download as DownloadIcon } from '../../icons/download';
import NextLink from 'next/link';

export const ProductCard = ({ product, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%'
    }}
    {...rest}
  >
    <CardContent>
      {/* // Box para ajustes do Avatar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        />
      </Box>

      {/* // Typography para ajustes do Titulo */}
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {product.title}
      </Typography>
      <Typography
        align="left"
        color="textPrimary"
        variant="body1"
      >
        {product.description}
        
        <Typography>
          Públicos Envolvidos:
          Instituições sem fins lucrativos (creches, asilos, casas de apoio), associações comunitárias, escolas públicas, equipamentos públicos de saúde e projetos de extensão da própria UCB.
        </Typography>
       
        <Box sx={{ flexGrow: 1 }} />
        <Divider />

        <Typography>
          Informações Relevantes:
          O(a) estudante inscrito(a) no Projeto estará segurado contra acidentes.
          O(a) estudante interessado(a) em continuar atuando na instituição parceira/projeto, mesmo após o cumprimento das 36 horas previstas, poderá fazê-lo na modalidade voluntário e em acordo com a instituição na qual foi desenvolvida a atividade.
          Saiba mais acessando o edital abaixo.
        </Typography>

        <Typography
          variant="body1"
        >
          Contatos:
        </Typography>

        <Typography>
        Coordenador: José Ivaldo Araújo de Lucena

Contatos: projetosermais@ucb.br / (61) 3356-9032

Localização: Campus I, Bloco M, Sala 207
        </Typography>
        <Typography>
          teste
          <Link to="https://ucb.catolica.edu.br/portal/wp-content/uploads/2022/03/EDITAL-UCB-016.2022-PROGRAMA-SER1-2022-REPUBLICACAO.pdf">
            Clique aqui para acessar o documento 
          </Link>
        </Typography>
      </Typography>
    </CardContent>
    
    <Box sx={{ flexGrow: 1 }} />

  
    <Divider />


    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <ClockIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Carga horária: 36 horas.
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {/* <DownloadIcon color="action" /> */}
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            {product.totalDownloads}
            {' '}
            <NextLink
            href="/projetoSer+"
            passHref
          >
            <Button
              color="primary"
              variant="contained"
            >
              Inscrever-se
            </Button>
        </NextLink>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};
