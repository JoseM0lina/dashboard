import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'
import { TextField, Button, Paper, Typography } from "@mui/material";
import IndicatorWeather from "./IndicatorWeather";
import SearchIcon from "@mui/icons-material/Search";

const countryNames: { [key: string]: string } = {
  "EC": "Ecuador",
  "US": "Estados Unidos",
  "AR": "Argentina",
  "ES": "España",
  "MX": "México",
  "CO": "Colombia",
  "KR": "Corea del Sur",
  "BR": "Brasil",
  "CA": "Canadá",
  "PE": "Perú",
  "CL": "Chile",
  "VE": "Venezuela",
  "BO": "Bolivia",
  "PY": "Paraguay",
  "UY": "Uruguay",
  "DO": "República Dominicana",
  "CU": "Cuba",
  "GT": "Guatemala",
  "HN": "Honduras",
  "NI": "Nicaragua",
  "SV": "El Salvador",
  "CR": "Costa Rica",
  "PA": "Panamá",
  "JM": "Jamaica",
  "HT": "Haití",
  "BS": "Bahamas",
  "TT": "Trinidad y Tobago",
  "BZ": "Belice",
  "GL": "Groenlandia",
  "IS": "Islandia",
  "GB": "Reino Unido",
  "FR": "Francia",
  "DE": "Alemania",
  "IT": "Italia",
  "PT": "Portugal",
  "NL": "Países Bajos",
  "BE": "Bélgica",
  "SE": "Suecia",
  "NO": "Noruega",
  "FI": "Finlandia",
  "DK": "Dinamarca",
  "AT": "Austria",
  "CH": "Suiza",
  "PL": "Polonia",
  "CZ": "República Checa",
  "HU": "Hungría",
  "RO": "Rumanía",
  "SK": "Eslovaquia",
  "BG": "Bulgaria",
  "GR": "Grecia",
  "AL": "Albania",
  "MK": "Macedonia del Norte",
  "RS": "Serbia",
  "HR": "Croacia",
  "SI": "Eslovenia",
  "BA": "Bosnia y Herzegovina",
  "ME": "Montenegro",
  "XK": "Kosovo",
  "MD": "Moldavia",
  "LT": "Lituania",
  "LV": "Letonia",
  "EE": "Estonia",
  "UA": "Ucrania",
  "BY": "Bielorrusia",
  "RU": "Rusia",
  "IE": "Irlanda",
  "IN": "India",
  "CN": "China",
  "JP": "Japón",
  "KP": "Corea del Norte",
  "VN": "Vietnam",
  "PH": "Filipinas",
  "TH": "Tailandia",
  "ID": "Indonesia",
  "PK": "Pakistán",
  "BD": "Bangladés",
  "MY": "Malasia",
  "SG": "Singapur",
  "LK": "Sri Lanka",
  "MM": "Birmania",
  "KH": "Camboya",
  "NP": "Nepal",
  "LA": "Laos",
  "MN": "Mongolia",
  "BT": "Bután",
  "KW": "Kuwait",
  "QA": "Catar",
  "AE": "Emiratos Árabes Unidos",
  "SA": "Arabia Saudita",
  "OM": "Omán",
  "JO": "Jordania",
  "LB": "Líbano",
  "SY": "Siria",
  "IQ": "Irak",
  "IL": "Israel",
  "TR": "Turquía",
};

interface ResumenProps {
  setLocation: (newLocation: string) => void;
  location: string;
  hour: string;
  minute: string;
  country: string;
}

export default function Resumen({ setLocation, location, hour, minute, country }: ResumenProps) {
  const [inputValue, setInputValue] = useState("");
  const [countryName, setCountryName] = useState("");
  useEffect(() => {
    if (country) {
      const name = countryNames[country.toUpperCase()] || "Desconocido";
      setCountryName(name);
    }
  }, [country]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const trimmedValue = inputValue.trim();
  const handleSearch = () => {
    if (trimmedValue && /^[a-zA-Z\s]+$/.test(trimmedValue)) {
      setLocation(trimmedValue);
    } else {
      alert("Por favor, ingresa un nombre de ciudad válido.");
    }
  };

  const isDayTime = parseInt(hour) >= 6 && parseInt(hour) < 18;
  const dayOrNight = isDayTime ? "Día 🔻" : "Noche 🔻";

  const indicator = {
    title: `Hora ${countryName}`,
    subtitle: `${dayOrNight}`,
    value: `${hour}:${minute}`,
  };

  return (
    <Grid container spacing={2} sx={{ padding: "20px" }}>
      <Grid item xs={12} md={6} container sx={{ padding: "10px", flexDirection: "column", textAlign: "left" }}>
        <Typography variant="h2" sx={{ fontWeight: 600 }}>
          {location}
        </Typography>
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          Clima de {location} ahora
        </Typography>
      </Grid>
      < Grid xs={6} md={6} >
        <Paper
          elevation={4}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Buscar ciudad"
                value={inputValue}
                onChange={handleInputChange}
                sx={{
                  borderRadius: 0,
                }}
              />
            </Grid>
            <Grid item margin={0} padding={0} xs={2}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={handleSearch}
                sx={{
                  height: "56px",
                  borderRadius: 0,
                }}
              >
                <SearchIcon sx={{ fontSize: "1.6rem" }} />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={6} container style={{ justifyContent: "center", height: "137.5px", alignItems: "center", border: "1px solid #ccc" }}>
              {isDayTime ? (
                <div style={{ fontSize: "100px", color: "#FF9800" }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/9586/9586645.png"
                    alt="Sol"
                    style={{
                      width: "130px",
                      maxWidth: "130px",
                      height: "138px",
                      maxHeight: "138px",
                      objectFit: "cover"
                    }} />
                </div>
              ) : (
                <div style={{ fontSize: "100px", color: "#00BCD4" }}>
                  <img src="https://cdn-icons-png.flaticon.com/512/3262/3262959.png"
                    alt="Luna"
                    style={{ width: "100px", maxHeight: "138px", objectFit: "cover" }} />
                </div>
              )}
            </Grid>
            <Grid xs={6}>
              <IndicatorWeather
                title={indicator.title}
                subtitle={indicator.subtitle}
                value={indicator.value} />
            </Grid>
          </Grid>
        </Paper>
      </Grid >
    </Grid>
  );

}


