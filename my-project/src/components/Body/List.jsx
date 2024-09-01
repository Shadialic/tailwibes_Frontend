import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  InputBase,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Paper as MuiPaper } from "@mui/material";
import AddStudents from "../Modal/AddStudents";
import DeleteIcon from "@mui/icons-material/Delete";
import EditStudent from "../Modal/EditSutudent";
import {
  DeleteAllStudent,
  DeleteStudent,
  getStudents,
  searchStudents,
} from "../../services/Api";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";
import { deepPurple } from "@mui/material/colors";
import { Loading } from "../loading/Loading";
import { useSelector } from "react-redux";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const selector = useSelector((state) => state.tutor.tutorInfo);
  console.log(selector,'ss');
  
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents(selector.id);
      setStudents(response.students);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteById = async (id) => {
    try {
      const response = await DeleteStudent(id);
      if (response.status) {
        toast.success(response.message);
        fetchStudents();
      }
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  const handleDeleteAllStudents = async () => {
    try {
      const response = await DeleteAllStudent();
      if (response.status) {
        toast.success(response.message);
        fetchStudents();
      }
    } catch (error) {
      console.error("Failed to delete all students:", error);
    }
  };

  const searchStudent = debounce(async (searchTerm) => {
    try {
      const response = await searchStudents(searchTerm);
      if (response.status) {
        setStudents(response.students);
      }
    } catch (error) {
      console.error("Failed to search students:", error);
    }
  }, 100);

  useEffect(() => {
    if (search) {
      searchStudent(search);
    } else {
      fetchStudents();
    }
  }, [search]);

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <Box sx={{ backgroundColor: "#E5E7EB", mt: "10px", width: "100%" }}>
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            mb={2}
            sx={{ mr: { xs: 1, sm: 9, md: 10 } }}
            gap={2}
            mt={3}
          >
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                ml: { xs: 4 },
              }}
            >
              <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Search Users"
                inputProps={{ "aria-label": "search users" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <AddStudents fetchStudents={fetchStudents} />
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            sx={{
              ml: "16px",
            }}
          >
            {students && students.length > 0 ? (
              <Box
                sx={{
                  overflowY: "hidden",
                  borderRadius: "8px",
                  backgroundColor: "#E5E7EB",
                  mx: "auto",
                  width: "100%",
                  px: { xs: 2, sm: 10 },
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box display="flex">
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        fontFamily: "monospace",
                      }}
                    >
                      <PersonIcon sx={{ width: 32, height: 24 }} />
                      Student List
                    </Typography>
                  </Box>
                  <Typography component="h1" sx={{ ml: { xs: 2, sm: 10 } }}>
                    Are you sure to delete all Students?{" "}
                    <Button
                      variant="text"
                      color="error"
                      onClick={handleDeleteAllStudents}
                      sx={{
                        textDecoration: "underline",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Delete All
                    </Button>
                  </Typography>
                </Box>
                <TableContainer component={MuiPaper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "#9CA3AF" }}>
                        <TableCell
                          sx={{ px: 2, fontWeight: "bold", color: "#fff" }}
                        >
                          NO
                        </TableCell>
                        <TableCell
                          sx={{ px: 4, fontWeight: "bold", color: "#fff" }}
                        >
                          FULL NAME
                        </TableCell>
                        <TableCell
                          sx={{ px: 4, fontWeight: "bold", color: "#fff" }}
                        >
                          SUBJECT
                        </TableCell>
                        <TableCell
                          sx={{ px: 4, fontWeight: "bold", color: "#fff" }}
                        >
                          MARK
                        </TableCell>
                        <TableCell
                          sx={{ px: 2, fontWeight: "bold", color: "#fff" }}
                        >
                          ACTION
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ color: "#4B5563" }}>
                      {students.map((student, index) => (
                        <TableRow key={student._id} sx={{ fontWeight: "bold" }}>
                          <TableCell
                            sx={{
                              borderColor: "#E5E7EB",
                              backgroundColor: "#FFF",
                              px: 2,
                            }}
                          >
                            <Typography>{index + 1}</Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              borderColor: "#E5E7EB",
                              backgroundColor: "#FFF",
                              px: 4,
                            }}
                          >
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                {student.fullName[0]}
                              </Avatar>
                              <Typography sx={{ ml: 1, color: "#6B7280" }}>
                                {student.fullName}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{
                              borderColor: "#E5E7EB",
                              backgroundColor: "#FFF",
                              px: 4,
                            }}
                          >
                            <Typography>{student.subject}</Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              borderColor: "#E5E7EB",
                              backgroundColor: "#FFF",
                              px: 4,
                            }}
                          >
                            <Typography>{student.mark}</Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              borderColor: "#E5E7EB",
                              backgroundColor: "#FFF",
                              px: 2,
                            }}
                          >
                            <Box display="flex" gap={1}>
                              <EditStudent
                                fullName={student.fullName}
                                subject={student.subject}
                                mark={student.mark}
                                id={student._id}
                                fetchStudents={fetchStudents}
                              />
                              <Tooltip title="Delete User">
                                <IconButton
                                  color="error"
                                  sx={{
                                    backgroundColor: "#000",
                                    fontWeight: "bold",
                                    p: 1,
                                    borderRadius: "3px",
                                    color: "#FFF",
                                    transition: "transform 0.3s ease-in-out",
                                    "&:hover": {
                                      transform: "scale(1.05)",
                                    },
                                  }}
                                  onClick={() => handleDeleteById(student._id)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                textAlign="center"
                py={10}
                flexDirection="column"
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="textSecondary"
                >
                  Student list is{" "}
                  <Typography component="span" color="error">
                    empty
                  </Typography>
                </Typography>
              </Box>
            )}
          </Box>
          <Toaster />
        </Box>
      )}
    </>
  );
}

export default StudentList;
