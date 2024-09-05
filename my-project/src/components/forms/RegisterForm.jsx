import React, { useState } from "react";
import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import RegisterLoop from "../../assets/loop.mp4";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { RegisterTeacher } from "../../services/Api";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Za-z]/.test(formData.password)) {
      tempErrors.password = "Password must include at least one letter";
    } else if (!/\d/.test(formData.password)) {
      tempErrors.password = "Password must include at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      tempErrors.password =
        "Password must include at least one special character";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await RegisterTeacher(formData);
        console.log(response);
        if (response.status) {
          handleClear();
          toast.success(response.message);
          navigate("/login");
        } else {
          toast.error(response.message);
        }
      } catch (err) {
        console.error("Submission error:", err);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "column", md: "row" }}
      height="100vh"
    >
      <Box
        width={{ xs: "100%", sm: "100%", md: "35%" }}
        height="100%"
        textAlign="left"
      >
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            fontWeight: "bold",
            p: 2,
            color: "white",
            fontSize: "2rem",
          }}
        >
          tailwebs.
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <video
            src={RegisterLoop}
            loop
            autoPlay
            muted
            style={{ height: "117vh", objectFit: "cover", width: "100%" }}
          />
        </Box>
      </Box>
      <Box width={{ xs: "100%", sm: "100%", md: "50%" }} mt={{ xs: 3, sm: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Divider sx={{ width: "25%" }} />
            <Typography variant="subtitle1" sx={{ mx: 2, color: "gray" }}>
              Register
            </Typography>
            <Divider sx={{ width: "25%" }} />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            width="100%"
            mx={{ sm: 1 }}
          >
            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{ borderRadius: "50px", mx: { xs: 6, sm: 15, md: 14 } }}
            >
              Clear
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            maxWidth={400}
            mx="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                First Name
              </Typography>
            </Box>
            <TextField
              fullWidth
              variant="outlined"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleOnChange}
              sx={{ mb: 2 }}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Last Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleOnChange}
              sx={{ mb: 2 }}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />          
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Email
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleOnChange}
              sx={{ mb: 2 }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Password
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleOnChange}
              sx={{ mb: 2 }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ borderRadius: "50px", maxWidth: 400, mx: "auto", py: 1 }}
          >
            SIGN UP
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <Button
              variant="text"
              onClick={handleClick}
              sx={{ textDecoration: "underline" }}
            >
              Sign in
            </Button>
          </Typography>
        </Box>
      </Box>
      <Toaster />
    </Box>
  );
}

export default RegistrationForm;
