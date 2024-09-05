import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tooltip,
  IconButton,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";
import GradeIcon from "@mui/icons-material/Grade";
import { EditStudents, PostStudents } from "../../services/Api";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";

function EditStudent({ fullName, subject, mark, id, fetchStudents }) {
  const [open, setOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    fullName: fullName,
    subject: subject,
    mark: mark,
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
    if (!studentData.mark) {
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
      const response = await EditStudents(studentData, id);
      if (response.status) {
        toast.success(response.message);
        fetchStudents();
        handleClose();
      }
    }
  };

  return (
    <>
      <Tooltip title="Edit Student">
        <IconButton
          color="#0000000"
          sx={{
            backgroundColor: "#000",
            fontWeight: "bold",
            p: 1,
            borderRadius: "3px",
            color: "#fff",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              color:"#467ee7"
            },
          }}
          onClick={handleOpen}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

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
            Edit a Student
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
              Update Student
            </Button>
          </Box>
        </Box>
      </Modal>
      <Toaster />
    </>
  );
}

export default EditStudent;
