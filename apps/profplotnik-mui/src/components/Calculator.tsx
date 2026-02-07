import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CalculateIcon from '@mui/icons-material/Calculate';

const steps = ['Тип дома', 'Параметры', 'Контакты'];

export default function Calculator() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [houseType, setHouseType] = useState<string>('brus');
  const [area, setArea] = useState<number>(100);

  const estimatedPrice = () => {
    const basePrice = houseType === 'brus' ? 10000 : 8500;
    return (basePrice * area).toLocaleString('ru-RU');
  };

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: 'primary.main',
        color: 'white',
      }}
      id="calculator"
    >
      <Container maxWidth="md">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{ mb: 1 }}
        >
          <CalculateIcon sx={{ fontSize: 36 }} />
          <Typography variant="h2" align="center" sx={{ color: 'white' }}>
            Калькулятор стоимости
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, opacity: 0.85, maxWidth: 500, mx: 'auto' }}
        >
          Рассчитайте предварительную стоимость строительства вашего дома
        </Typography>

        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Выберите тип дома
              </Typography>
              <ToggleButtonGroup
                value={houseType}
                exclusive
                onChange={(_, val) => val && setHouseType(val)}
                fullWidth
                sx={{ mb: 3 }}
              >
                <ToggleButton value="brus">Дом из бруса</ToggleButton>
                <ToggleButton value="karkas">Каркасный дом</ToggleButton>
                <ToggleButton value="banya">Баня из бруса</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Площадь дома: {area} м²
              </Typography>
              <Slider
                value={area}
                onChange={(_, val) => setArea(val as number)}
                min={30}
                max={300}
                step={10}
                valueLabelDisplay="auto"
                sx={{ mb: 3 }}
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="h5" color="secondary.dark" sx={{ fontWeight: 700 }}>
                Предварительная стоимость: от {estimatedPrice()} ₽
              </Typography>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Оставьте контакты для расчёта
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Ваше имя" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Телефон" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
              </Grid>
            </Box>
          )}

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
              Назад
            </Button>
            <Button
              variant="contained"
              color={activeStep === steps.length - 1 ? 'secondary' : 'primary'}
              onClick={() => {
                if (activeStep < steps.length - 1) {
                  setActiveStep((s) => s + 1);
                }
              }}
            >
              {activeStep === steps.length - 1 ? 'Отправить заявку' : 'Далее'}
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
