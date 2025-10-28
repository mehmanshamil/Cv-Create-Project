"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import Image from "next/image";

interface Props {
  window?: () => Window;
  thema: boolean;
  setThema: React.Dispatch<React.SetStateAction<boolean>>;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function Header({ window, thema, setThema }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const changeThema = () => {
    setThema(!thema);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: thema ? "#fff" : "#114892",
        height: "100%",
        color: thema ? "black" : "#fff",
        transition: "background-color .5s ease, color .5s ease",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <Image
          src={"/logo.jpg"}
          width={100}
          height={100}
          alt="logo"
          className="rounded-[10px] object-cover w-[50px] h-[50px] m-auto"
        />
      </Typography>
      <Divider sx={{ borderColor: thema ? "#ccc" : "#1e60b1" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        <BedtimeIcon
          onClick={changeThema}
          sx={{
            cursor: "pointer",
            transition: "color .5s ease",
            color: thema ? "black" : "#fff",
            margin: "1rem",
            "&:hover": { color: thema ? "#114892" : "#fff" },
          }}
        />
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <header>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            padding: "10px",
            backgroundColor: thema ? "#fff" : "#114892",
            transition: "background-color .5s ease",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: thema ? "black" : "#fff" }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <Image
                src={"/logo.jpg"}
                width={100}
                height={100}
                alt="logo"
                className="rounded-[10px] object-cover w-[70px] h-[70px]"
              />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: thema ? "black" : "#fff",
                    fontWeight: "bold",
                    transition: ".5s",
                    ":hover": { color: thema ? "#114892" : "#ddd" },
                  }}
                >
                  {item}
                </Button>
              ))}
              <BedtimeIcon
                onClick={changeThema}
                sx={{
                  cursor: "pointer",
                  transition: "color .5s ease",
                  color: thema ? "black" : "#fff",
                  margin: "0 1rem",
                  "&:hover": { color: thema ? "#114892" : "#ddd" },
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: thema ? "#fff" : "#114892",
                color: thema ? "black" : "#fff",
                transition: "background-color .5s ease, color .5s ease",
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </header>
  );
}
