import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import GradeIcon from "@mui/icons-material/Grade";
import { PostStudents } from "../../services/Api";
import { useSelector } from "react-redux";

function AddStudents({ fetchStudents }) {
  const selector = useSelector((state) => state.tutor.tutorInfo);
  const [open, setOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    fullName: "",
    subject: "",
    mark: "",
    tutorId:selector.id
  });
  const [errors, setErrors] = useState({
    fullName: "",
    subject: "",
    mark: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrors({ fullName: "", subject: "", mark: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { fullName: "", subject: "", mark: "" };

    if (!studentData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }
    if (!studentData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }
    if (!studentData.mark.trim()) {
      newErrors.mark = "Mark is required";
      valid = false;
    } else if (!/^\d+$/.test(studentData.mark)) {
      newErrors.mark = "Mark must be a number";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const response = await PostStudents(studentData);
      if (response.status) {
        fetchStudents();
        handleClose();
      }
      setStudentData({
        fullName: "",
        subject: "",
        mark: "",
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{ p: { xs: "1px", sm: "6px", md: "10px" } }}
      >
        Add Student
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-student-modal-title"
        aria-describedby="add-student-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            position: "relative",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            id="add-student-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            Add a New Student
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="fullName"
              name="fullName"
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              value={studentData.fullName}
              onChange={handleChange}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="subject"
              name="subject"
              label="Subject"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              value={studentData.subject}
              onChange={handleChange}
              error={Boolean(errors.subject)}
              helperText={errors.subject}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="mark"
              name="mark"
              label="Mark"
              variant="outlined"
              fullWidth
              margin="normal"
              type="text"
              value={studentData.mark}
              onChange={handleChange}
              error={Boolean(errors.mark)}
              helperText={errors.mark}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GradeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Add Student
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddStudents;
