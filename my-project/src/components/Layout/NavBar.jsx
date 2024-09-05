import React from "react";
import { Box, Typography } from "@mui/material";
import Profile from "../Modal/Profile";

function NavBar() {
  return (
    <Box
      sx={{
        bgcolor: "#000000",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "7%",
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          p: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            ml: 2,
            fontFamily: "monospace",
            flex: "1 1 auto",
          }}
        >
          tailwebs.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ mr: 2 }}>
          <Profile />
        </Box>
      </Box>
    </Box>
  );
}

export default NavBar;
