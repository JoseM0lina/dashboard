import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';

interface LineChartWeatherProps {
    time: string[];
    values: number[];
}

export default function LineChartWeather({ time, values }: LineChartWeatherProps) {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <LineChart
                width={1200}
                height={400}
                margin={{ left: 100, right: 100 }}
                sx={{ paddingBottom: 2 }}
                series={[
                    {
                        data: values,
                        color: '#007BFF',
                        area: false,
                    },
                ]}
                xAxis={[
                    {
                        scaleType: 'point',
                        data: time,
                        label: 'HORAS DEL DÍA',
                        tickSize: 10,
                        labelStyle: { fontSize: 15, fill: '#007BFF', transform: 'translate(0, 5px)' },
                    },
                ]}
                yAxis={[
                    {
                        min: 0,
                        max: 100,
                        tickSize: 10,
                    },
                ]}
            />
        </Paper>
    );
}
