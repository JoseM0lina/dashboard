import { useState, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LineChartWeather from './LineChartWeather';

interface ControlWeatherProps {
    latitude: string;
    longitude: string;
}

export default function ControlWeather({ latitude, longitude }: ControlWeatherProps) {
    const descriptionRef = useRef<HTMLDivElement>(null);

    const items = [
        { name: "Humedad Relativa", key: "relative_humidity_2m", description: "Porcentaje de humedad en el aire." },
        { name: "Temperatura Aparente", key: "apparent_temperature", description: "Temperatura percibida en grados Celsius." },
        { name: "Probabilidad de Precipitación", key: "precipitation_probability", description: "Probabilidad de lluvia en porcentaje." },
    ];

    const [selected, setSelected] = useState<string>('-1');
    const [chartData, setChartData] = useState<{ time: string[]; values: number[] }>({ time: [], values: [] });
    const [loading, setLoading] = useState(false);

    const fetchData = async (variableKey: string) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${variableKey}&timezone=auto&forecast_days=1`
            );
            const data = await response.json();
            const time = data.hourly.time.map((datetime: string) => {
                return datetime.split("T")[1].slice(0, 5);
            });
            const values = data.hourly[variableKey];
            setChartData({ time, values });
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        const idx = event.target.value;
        setSelected(idx);
        if (descriptionRef.current) {
            const selectedIdx = parseInt(idx);
            descriptionRef.current.innerHTML = selectedIdx >= 0 ? items[selectedIdx].description : "";
        }
        if (parseInt(idx) >= 0) {
            fetchData(items[parseInt(idx)].key);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography mb={2} component="h3" variant="h6" color="primary">
                Variables Meteorológicas
            </Typography>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="simple-select-label">Variables</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        label="Variables"
                        value={selected}
                        onChange={handleChange}
                    >
                        <MenuItem key="-1" value="-1" disabled>Seleccione una variable</MenuItem>
                        {items.map((item, index) => (
                            <MenuItem key={index} value={index}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Typography sx={{ paddingBottom: "1rem" }} ref={descriptionRef} mt={2} component="p" color="text.secondary" />

            {loading ? (
                <Typography mt={2} component="p" color="text.secondary">
                    Cargando datos...
                </Typography>
            ) : chartData.values.length > 0 && (
                <LineChartWeather time={chartData.time} values={chartData.values} />
            )}
        </Paper>
    );
}
