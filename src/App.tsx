//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import Grid from '@mui/material/Grid2'
import './App.css'
import IndicatorWeather from './components/IndicatorWeather';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Grid container spacing={5}>

      {/* Indicadores */}
      <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 1<IndicatorWeather /></Grid>
      <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 2<IndicatorWeather /></Grid>
      <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 3<IndicatorWeather /></Grid>
      <Grid size={{ xs: 12, xl: 3 }}>Elemento: Indicador 4<IndicatorWeather /></Grid>
    
      {/* Tabla */}
      <Grid size={{ xs: 12, xl: 8 }}>Elemento: Tabla</Grid>

      {/* Gráfico */}
      <Grid size={{ xs: 12, xl: 4 }}>Elemento: Gráfico 1</Grid>
		  
    </Grid>
  )
}

export default App
