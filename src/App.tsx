import Grid from '@mui/material/Grid2'
import { createTheme, ThemeProvider, CssBaseline, Typography } from "@mui/material";
import './App.css'
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import Header from './components/Header';
import Resumen from './components/Resumen';
import Sugerencia from './components/Sugerencia';
import Item from "./interface/Item";
import { useEffect, useState } from 'react';
interface Indicator {
  title?: String;
  subtitle?: String;
  value?: String;
}
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [location, setLocation] = useState("Guayaquil");
  const [latitude, setLatitude] = useState("-2.1667");
  const [longitude, setLongitude] = useState("-79.9");
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const [country, setCountry] = useState<string>("Ecuador");
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      ...(isDarkMode
        ? {
          background: {
            default: "#242424",
          },
          text: {
            primary: "rgba(255, 255, 255, 0.87)",
          },
        }
        : {
          background: {
            default: "#ffffff",
          },
          text: {
            primary: "#213547",
          },
        }),
    },
    typography: {
      fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
  });
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  let [indicators, setIndicators] = useState<Indicator[]>([])
  let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))
  const [items, setItems] = useState<Item[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('savedHour') || !localStorage.getItem('savedMinute')) {
      const currentHour = new Date().getHours().toString().padStart(2, '0');
      const currentMinute = new Date().getMinutes().toString().padStart(2, '0');
      localStorage.setItem('savedHour', currentHour);
      localStorage.setItem('savedMinute', currentMinute);
    }

    const savedHour = localStorage.getItem('savedHour')!;
    const savedMinute = localStorage.getItem('savedMinute')!;
    setHour(savedHour);
    setMinute(savedMinute);

    const intervalId = setInterval(() => {
      const updatedHour = new Date().getHours().toString().padStart(2, '0');
      const updatedMinute = new Date().getMinutes().toString().padStart(2, '0');
      setHour(updatedHour);
      setMinute(updatedMinute);
      localStorage.setItem('savedHour', updatedHour);
      localStorage.setItem('savedMinute', updatedMinute);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let request = async () => {

      let savedTextXML = localStorage.getItem(`openWeatherMap-${location}`) || "";
      let expiringTime = localStorage.getItem(`expiringTime-${location}`);
      let nowTime = (new Date()).getTime();

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        let API_KEY = "995db4d7a668dd46d50ca8fc16a700b0"
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&mode=xml&appid=${API_KEY}`
        );
        savedTextXML = await response.text();

        let hours = 0.01
        let delay = hours * 3600000
        let expiringTime = nowTime + delay

        localStorage.setItem(`openWeatherMap-${location}`, savedTextXML);
        localStorage.setItem(`expiringTime-${location}`, expiringTime.toString());
        localStorage.setItem("nowTime", nowTime.toString())

        localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
        localStorage.setItem("nowDateTime", new Date(nowTime).toString())

        setOWM(savedTextXML)
      }

      if (savedTextXML) {
        {/* XML Parser */ }
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        const countryCode = xml.getElementsByTagName("country")[0].innerHTML || "";
        setCountry(countryCode);

        const timezoneOffset = parseInt(xml.getElementsByTagName("timezone")[0].innerHTML) || 0;
        let utcDate = new Date();
        let localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);
        localDate.setHours(localDate.getHours() + 5);
        const formattedHour = localDate.toLocaleString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false });
        const [formattedHourValue, formattedMinuteValue] = formattedHour.split(':');
        setHour(formattedHourValue);
        setMinute(formattedMinuteValue);

        let dataToItems: Item[] = [];
        const timeNodes = xml.getElementsByTagName("time");

        for (let i = 0; i < timeNodes.length; i++) {
          const timeNode = timeNodes[i];
          const dateStart = timeNode.getAttribute("from") || "";
          const dateEnd = timeNode.getAttribute("to") || "";

          const precipitationNode = timeNode.getElementsByTagName("precipitation")[0];
          let precipitacion = precipitationNode?.getAttribute("probability") || "";
          const precipitation = String(Math.round(parseFloat(precipitacion) * 100));

          const temperatureNode = timeNode.getElementsByTagName("temperature")[0];
          const temperatureK = temperatureNode?.getAttribute("value") || "";
          const temperature = String(Math.round(parseFloat(temperatureK) - 273.15));

          const windGustNode = timeNode.getElementsByTagName("windGust")[0];
          const windGust = windGustNode?.getAttribute("gust") || "";

          const pressureNode = timeNode.getElementsByTagName("pressure")[0];
          const pressure = pressureNode?.getAttribute("value") || "";

          const humidityNode = timeNode.getElementsByTagName("humidity")[0];
          const humidity = humidityNode?.getAttribute("value") || "";

          const cloudsNode = timeNode.getElementsByTagName("clouds")[0];
          const clouds = cloudsNode?.getAttribute("value") || "";

          const item: Item = {
            dateStart,
            dateEnd,
            precipitation,
            temperature,
            windGust,
            pressure,
            humidity,
            clouds,
          };

          const startDate = new Date(dateStart);
          if (startDate > localDate) {
            dataToItems.push(item);
          }
        }

        const limitedDataToItems = dataToItems.slice(0, 6);
        setItems(limitedDataToItems);

        let dataToIndicators: Indicator[] = new Array<Indicator>();

        const firstItem = dataToItems[0].temperature;
        let temperatura = firstItem + "°C";
        let tempValue = parseFloat(firstItem.valueOf());
        let tempSubtitle = "";

        if (tempValue > 30) {
          tempSubtitle = "Caluroso 🔻";
        } else if (tempValue < 10) {
          tempSubtitle = "Frío 🔻";
        } else {
          tempSubtitle = "Agradable 🔻";
        }
        dataToIndicators.push({ "title": "Temperatura", "subtitle": tempSubtitle, "value": temperatura })

        let location = xml.getElementsByTagName("location")[1]

        let latitude = location.getAttribute("latitude") || ""
        setLatitude(latitude)
        let latSubtitle = "";
        tempValue = parseFloat(latitude);
        if (tempValue > 0) {
          latSubtitle = "Hemisferio Norte 🔻";
        } else if (tempValue < 0) {
          latSubtitle = "Hemisferio Sur 🔻";
        } else {
          latSubtitle = "Sobre el ecuador 🔻";
        }
        dataToIndicators.push({ "title": "Latitud", "subtitle": latSubtitle, "value": latitude })

        let longitude = location.getAttribute("longitude") || ""
        setLongitude(longitude)
        let lonSubtitle = "Longitud";
        if (parseFloat(longitude) > 0) {
          lonSubtitle = "Hemisferio Este 🔻";
        } else if (parseFloat(longitude) < 0) {
          lonSubtitle = "Hemisferio Oeste 🔻";
        } else {
          lonSubtitle = "Sobre el meridiano de Greenwich 🔻";
        }
        dataToIndicators.push({ "title": "Longitud", "subtitle": lonSubtitle, "value": longitude })

        let altitude = location.getAttribute("altitude") || ""
        let altSubtitle = "Altitud";
        let altitudeValue = parseFloat(altitude);
        if (altitudeValue < 0) {
          altSubtitle = "Bajo el nivel del mar 🔻";
        } else if (altitudeValue === 0) {
          altSubtitle = "Nivel del mar 🔻";
        } else if (altitudeValue > 0 && altitudeValue <= 500) {
          altSubtitle = "Baja 🔻";
        } else if (altitudeValue > 500 && altitudeValue <= 2000) {
          altSubtitle = "Moderada 🔻";
        } else {
          altSubtitle = "Alta 🔻";
        }
        dataToIndicators.push({ "title": "Altitud", "subtitle": altSubtitle, "value": altitude })

        setIndicators(dataToIndicators)
      }
      setRefresh((prev) => !prev);
    };

    request();

  }, [location])

  let renderIndicators = () => {
    return indicators
      .map(
        (indicator, idx) => (
          <Grid key={idx} size={{ xs: 12, xl: 3 }}>
            <IndicatorWeather
              title={indicator["title"]}
              subtitle={indicator["subtitle"]}
              value={indicator["value"]} />
          </Grid>
        )
      )
  }

  return (
    <Grid container spacing={5}>
      {/* Header */}
      <Grid size={{ xs: 12, xl: 12 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header toggleTheme={toggleTheme} />
        </ThemeProvider>
      </Grid>
      {/* Resumen */}
      <Grid id="resumen" size={{ xs: 12, xl: 12 }} style={{ alignItems: "left" }}>
        <Resumen
          setLocation={setLocation}
          location={location}
          hour={hour}
          minute={minute}
          country={country}
        />
      </Grid>
      {/* Indicadores */}
      <Grid id="condi_actu" size={{ xs: 12, xl: 12 }} sx={{ borderTop: "1px solid #ccc" }}>
        <Typography variant="h4" sx={{ fontWeight: 600, marginTop: "1.5rem" }}>
          Condiciones actuales
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 1 }}>
          En esta sección encontrarás informacion detallada sobre la situación actual
        </Typography>
      </Grid>
      {renderIndicators()}
      <Grid id="ten_clima" size={{ xs: 12, xl: 12 }} sx={{ borderTop: "1px solid #ccc" }}>
        <Typography variant="h4" sx={{ fontWeight: 600, marginTop: "1.5rem" }}>
          Tendencias climáticas
        </Typography>
        <Typography variant="h5" sx={{ marginTop: 1 }}>
          En esta sección, encontrarás una visión detallada de cómo evolucionará el clima a lo largo del día, organizada por intervalos de horas. Entre los datos destacados que se presentan están:
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, xl: 12 }}>
        <TableWeather itemsIn={items} />
      </Grid>
      {/* Tabla */}
      <Grid id="pronosticos" size={{ xs: 12, xl: 12 }} sx={{ borderTop: "1px solid #ccc" }}>
        <Typography variant="h4" sx={{ fontWeight: 600, padding: "1.5rem" }}>
          Pronósticos del tiempo
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 12 }}>
            <ControlWeather
              latitude={latitude}
              longitude={longitude} />
          </Grid>
        </Grid>
      </Grid>
      <Grid id="sugerencia" size={{ xs: 12, xl: 12 }} sx={{ borderTop: "1px solid #ccc" }}>
        <Sugerencia itemsIn={items} />
      </Grid>
    </Grid>
  )
}

export default App
