import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/projetoSerPlus/projeto-toolbar';
import { ProductCard } from '../components/projetoSerPlus/projeto-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Products = () => (
  <>
    <Head>
      <title>
        Ser+ | Extensão - UCB
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 15
      }}
    >
      <Container maxWidth={false}>
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                // item
                // key={product.id}
                // lg={4}
                // md={6}
                // xs={12}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
