import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';

export const SettingsNotifications = (props) => (
  <form {...props}>
    <Card>
      <CardHeader
        subheader="Configure as notificações de acordo com sua preferência."
        title="Configurações de Notificação"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Notificações
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Email"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Push Notifications"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Text Messages"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Phone calls"
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Mensagens
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Email"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Push Notifications"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                />
              )}
              label="Phone calls"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Card>
  </form>
);
