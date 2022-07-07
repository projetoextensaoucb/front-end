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
        {/* {product.description} */}
            
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            pb: 3
          }}
        >        
          <Typography
            description="Coordenador" 
            variant="body2"
          >
            O Projeto SER+ é uma iniciativa da Pró -Reitoria de Extensão da Universidade Católica de Brasília e caracteriza-se como atividade complementar integrante das Horas Complementares constantes nos currículos dos cursos de graduação desta Instituição de Ensino Superior. É um projeto acadêmico que pretende oferecer ao(à) estudante a oportunidade de, ao participar do dia a dia de uma determinada comunidade, entender sua dinâmica, seus problemas, suas peculiaridades e, ajudá-la a pensar soluções. É a Universidade estreitando relações com a comunidade!
            Ao inscrever-se no Projeto SER+ o(a) estudante estará ciente que deve disponibilizar 36 horas para a sua participação, preferencialmente no turno contrário ao do seu curso. Destas 36 horas, vinte e oito (28) horas serão de atividades desenvolvidas junto à comunidade e oito (08) horas nas etapas de preparação e avaliação.
            As atividades desenvolvidas no Projeto SER+ não necessariamente estarão vinculadas às atividades específicas da formação profissional do(a) estudante. Elas não equivalem a estágios, nem a monitorias.            
          </Typography>
      </Box>

        <Box sx={{ flexGrow: 1 }} />
       
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            pb: 3
          }}
        >        
          <Typography variant="subtitle1">
            Públicos Envolvidos:
            <Box sx={{ pb: 1 }} />

            <Typography
              description="Coordenador" 
              variant="body2"
            >
              Instituições sem fins lucrativos (creches, asilos, casas de apoio), associações comunitárias, escolas públicas, equipamentos públicos de saúde e projetos de extensão da própria UCB.
            </Typography>
          </Typography>
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            pb: 3
          }}
        >        
          <Typography variant="subtitle1">
            Informações Relevantes:
            <Box sx={{ pb: 1 }} />

            <Typography
              description="Coordenador" 
              variant="body2"
            >
              O(a) estudante inscrito(a) no Projeto estará segurado contra acidentes.
              O(a) estudante interessado(a) em continuar atuando na instituição parceira/projeto, mesmo após o cumprimento das 36 horas previstas, poderá fazê-lo na modalidade voluntário e em acordo com a instituição na qual foi desenvolvida a atividade.
              Saiba mais acessando o {' '} 
              <Link href="https://ucb.catolica.edu.br/portal/wp-content/uploads/2022/03/EDITAL-UCB-016.2022-PROGRAMA-SER1-2022-REPUBLICACAO.pdf">
                {'edital aqui.'}
              </Link>
            </Typography>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            pb: 3
          }}
        >        
          <Typography variant="subtitle1">
            Contatos:
            <Box sx={{ pb: 1 }} />

            <Typography
              description="Coordenador" 
              variant="body2"
            >
              Coordenador: José Ivaldo Araújo de Lucena
            </Typography>
            <Typography variant="body2">
              Contatos: projetosermais@ucb.br / (61) 3356-9032
            </Typography>
            <Typography variant="body2">
              Localização: Campus I, Bloco M, Sala 207
            </Typography>
          </Typography>
        </Box>
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
