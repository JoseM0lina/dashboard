import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Item from '../interface/Item';
import { Typography } from "@mui/material";

interface MyProp {
    itemsIn: Item[];
}

export default function Sugerencia(props: MyProp) {
    const [mensaje, setMensaje] = useState<string>("");
    const [promedio, setPromedio] = useState<number>(0);
    const umbral = 50;

    const calcularSugerencia = () => {
        if (props.itemsIn && props.itemsIn.length > 0) {
            const probabilidades = props.itemsIn.map(item => {
                const value = parseFloat(item.precipitation.valueOf());
                return isNaN(value) ? 0 : value;
            });

            const promedioCalculado =
                probabilidades.reduce((acc, val) => acc + val, 0) / probabilidades.length;
            setPromedio(promedioCalculado);

            if (promedioCalculado > umbral) {
                setMensaje("Existe un riesgo moderado de lluvia próximamente. Considera llevar un paraguas o una chaqueta impermeable por precaución, especialmente si planeas estar al aire libre por mucho tiempo.");
            } else {
                setMensaje("La probabilidad de precipitación próxima es baja. Es un buen momento para planificar actividades al aire libre sin preocupaciones. Sin embargo, es recomendable llevar una sombrilla ligera por los rayos solares, especialmente si el clima es variable.");
            }
        } else {
            setMensaje("No hay datos disponibles para calcular la probabilidad de lluvia.");
        }
    };

    useEffect(() => {
        calcularSugerencia();
    }, [props.itemsIn]);

    return (
        <Grid container justifyContent="center" alignItems="center" flexDirection="column">
            <Typography variant="h4" sx={{ fontWeight: 600, marginTop: "1.5rem" }}>
                Sugerencias
            </Typography>
            <Typography variant="h5" sx={{ marginTop: 1, textAlign: "justify" }}>
                {mensaje}
            </Typography>
            {promedio > umbral ? (
                <div style={{ padding: "2rem", fontSize: "100px", color: "#FF9800" }}>
                    <img src="https://www.laprensa.hn/binrepository/600x389/0c0/0d0/none/11004/KFHN/tcclima080216_LP927413_MG66207230.jpg"
                        alt="Lluvioso"
                        style={{
                            maxWidth: "450px",
                            maxHeight: "400px",
                            objectFit: "cover"
                        }} />
                </div>
            ) : (
                <div style={{ padding: "2rem", fontSize: "100px", color: "#00BCD4" }}>
                    <img src="https://tn.com.ar/resizer/v2/durante-la-tarde-se-espera-que-haya-un-marcado-ascenso-de-la-temperatura-que-superara-los-20-grados-foto-tn-6ZHNKAN363TCV4RLSRHEBJAJW4.jpg?auth=ad5997e724e77e5e14dbd223a7e9085a37e642388515b458cd3ca083fb37b73e&width=767"
                        alt="Despejado"
                        style={{
                            maxWidth: "450px",
                            maxHeight: "400px",
                            objectFit: "cover"
                        }} />
                </div>
            )}
        </Grid>
    );
}


