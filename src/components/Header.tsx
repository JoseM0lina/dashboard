import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";

interface HeaderProps {
  toggleTheme: () => void;
}

export default function Header({ toggleTheme }: HeaderProps) {
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);

  const handleNotificationsMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setAnchorElNotifications(null);
  };

  const [anchorElDetalle, setAnchorElDetalle] = useState<null | HTMLElement>(null);
  const handleDetalleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDetalle(event.currentTarget);
  };
  const handleDetalleMenuClose = () => {
    setAnchorElDetalle(null);
  };

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          WeatherNow
        </Typography>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => handleScrollToSection("resumen")}>
          Resumen
        </Typography>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={handleDetalleMenuOpen}
        >
          Detalle
        </Typography>
        <Menu
          anchorEl={anchorElDetalle}
          open={Boolean(anchorElDetalle)}
          onClose={handleDetalleMenuClose}
        >
          <MenuItem onClick={() => handleScrollToSection("condi_actu")}>Condiciones actuales</MenuItem>
          <MenuItem onClick={() => handleScrollToSection("ten_clima")}>Tendencias climáticas</MenuItem>
          <MenuItem onClick={() => handleScrollToSection("pronosticos")}>Pronósticos del tiempo</MenuItem>
        </Menu>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => handleScrollToSection("sugerencia")}>
          Sugerencia
        </Typography>

        <IconButton
          color="inherit"
          onClick={handleNotificationsMenuOpen}
        >
          <NotificationsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorElNotifications}
          open={Boolean(anchorElNotifications)}
          onClose={handleNotificationsMenuClose}
        >
          <MenuItem onClick={() => alert("Activar notificaciones")}>
            Activar notificaciones
          </MenuItem>
          <MenuItem onClick={() => alert("Desactivar notificaciones")}>
            Desactivar notificaciones
          </MenuItem>
        </Menu>

        <Typography variant="h5" sx={{ marginLeft: 2, marginRight: 2 }}>
          user@company.com
        </Typography>

        <IconButton color="inherit" onClick={toggleTheme}>
          <Brightness4Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
