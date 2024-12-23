import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item';

import { Cloud, Air, WaterDrop, BeachAccess } from '@mui/icons-material';

interface MyProp {
  itemsIn: Item[];
}

export default function BasicTable(props: MyProp) {
  const [rows, setRows] = useState<Item[]>([]);

  useEffect(() => {
    setRows(props.itemsIn);
  }, [props.itemsIn]);

  const extractTime = (isoString: String): String => {
    return isoString.split('T')[1]?.split('+')[0];
  };

  const extractDay = (isoString: String): String => {
    return isoString.split('T')[0]
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "rgb(45, 23, 117)" }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>INTERVALO DE TIEMPO</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>HUMEDAD</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>PRESIÓN</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>PROBABILIDAD DE PRECIPITACIÓN</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>CONDICIÓN DEL CIELO</TableCell>
            <TableCell align="left" sx={{ color: 'white' }}>RAFAGAS DE VIENTO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "rgb(34, 110, 224)" }}>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ color: 'white' }}>
                {extractDay(row.dateStart)} - {extractTime(row.dateStart)} a {extractTime(row.dateEnd)}
              </TableCell>
              <TableCell align="left" sx={{ color: 'white' }}><WaterDrop /> {row.humidity} %</TableCell>
              <TableCell align="left" sx={{ color: 'white' }}>{row.pressure} hpa</TableCell>
              <TableCell align="left" sx={{ color: 'white' }}><BeachAccess /> {row.precipitation} %</TableCell>
              <TableCell align="left" sx={{ color: 'white' }}><Cloud /> {row.clouds}</TableCell>
              <TableCell align="left" sx={{ color: 'white' }}><Air /> {row.windGust} m/s</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
