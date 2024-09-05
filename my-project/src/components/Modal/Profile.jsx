import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutDetails } from "../../redux/slice/TutorSlice";

const Profile = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const selector = useSelector((state) => state.tutor.tutorInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutDetails())
    toast.success("Logging out Successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Box
      sx={{ position: "relative", display: "inline-block", textAlign: "left" }}
    >
      <IconButton
        onClick={handleOpen}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <AccountCircleIcon sx={{ color: "#fff" }} />
        <Typography
          sx={{
            color: "#fff",
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
          variant="subtitle1"
        >
          {selector?.firstName}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            p: 2,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "bold", textDecoration: "underline" }}
        >
          Your Profile
        </Typography>
        <MenuItem sx={{ fontSize: "0.875rem", mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Name:{" "}
            <span style={{ fontFamily: "monospace" }}>
              {selector?.firstName}
              {selector?.lastName}
            </span>
          </Typography>
        </MenuItem>
        <MenuItem sx={{ fontSize: "0.875rem", mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Email:{" "}
            <span style={{ fontFamily: "monospace" }}>{selector?.email}</span>
          </Typography>
        </MenuItem>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleLogout}
          sx={{
            mt: 2,
            fontWeight: "bold",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
        >
          Logout
        </Button>
      </Menu>
      <Toaster />
    </Box>
  );
};

export default Profile;
