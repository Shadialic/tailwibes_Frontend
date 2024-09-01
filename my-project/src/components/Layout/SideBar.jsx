import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 900);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMdUp(window.innerWidth >= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: { md: "14%", xs: isOpen ? "16%" : "4rem" },
        height: "100",
        transition: "width 0.3s",
        mt: isOpen ? 0 : 2,
      }}
    >
      <Drawer
        variant="persistent"
        anchor="left"
      
        open={isMdUp || isOpen}
        sx={{
          width: { md: "6%", xs: isOpen ? "16%" : "4rem" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "inherit",
            boxSizing: "border-box",
            bgcolor: "#000000",
            py: 2,
            mt: 7,
            display: {
              xs: isOpen ? "block" : "none",
              sm: isOpen ? "block" : "none",
              md:  isOpen ? "block" : "block",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ml: 1,
          }}
        >
          <Box sx={{ mt: 2 }}>
            <MuiLink
              component={Link}
              to="/admin"
              underline="hover"
              color="inherit"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PeopleIcon sx={{ color: "#be2aeb", fontSize: "2rem" }} />
              <Typography
                variant="body2"
                sx={{ mt: 0.2, mr: 1, color: "#be2aeb" }}
              >
                Studets
              </Typography>
            </MuiLink>
          </Box>
        </Box>
      </Drawer>
      {!isMdUp && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "fixed",
            top: 4,
            zIndex: 20,
            display: { md: "none", sm: "block", xs: "block" },
            color: "white",
          }}
        >
          <MenuIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      )}
    </Box>
  );
}

export default Sidebar;
