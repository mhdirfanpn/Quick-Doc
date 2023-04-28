import { Box, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import Swal from "sweetalert2";

const DoctorCard = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [doctorList, setDoctor] = useState([]);
  const adminToken = localStorage.getItem("adminToken");


  useEffect(() => {
    getDoctorsDetails();
  }, []);


  const approve = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this doctor!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/admin/verifyDoctor/${id}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          })
          .then(() => {
            navigate("/manage-doctors");
          });
        Swal.fire("Approved!", "The doctor has been approved.", "success");
      }
    });
  };


  const reject = (id) => {
    Swal.fire({
      title: "Are you sure you want to reject this doctor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/admin/rejectDoctor/${id}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          })
          .then(() => {
            Swal.fire("Rejected!", "The doctor has been rejected.", "success");
            navigate("/manage-doctors");
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };


  const getDoctorsDetails = async () => {
    try {
      axios
        .get(`/admin/getDoctor/${params.doctorId}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        })
        .then((response) => {
          setDoctor(response.data.doctor);
        })
        .catch((err) => {
          console.log(err, "catch error in doctorFetching");
        });
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <Box 
    p="6"
    bg="white"
    marginLeft={24}
    marginTop={24}
    maxWidth="1400"
    border="1px"
    borderColor="gray.200"
    rounded="lg"
    shadow="md"
    dark={{
      bg: "gray.800",
      border: "1px",
      borderColor: "gray.700",
    }}
    >
      <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
        <GridItem>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Name -DR. {doctorList.fullName}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Email - {doctorList.email}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Mobile - {doctorList.number}
          </Text>
          <Box d="flex" justifyContent={{ md: "center" }} mt={{ md: 5 }}>
            {doctorList.isVerified ? (
              <Text textShadow={4} style={{ color: "green" }} p={4}>
                Approved
              </Text>
            ) : (
              <Box mt={5}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  mr={5}
                  onClick={() => {
                    approve(doctorList._id);
                  }}
                >
                  Approve
                </Button>
                <Button
                  colorScheme="gray"
                  size="sm"
                  onClick={() => {
                    reject(doctorList._id);
                  }}
                >
                  Reject
                </Button>
              </Box>
            )}
          </Box>
        </GridItem>
        <GridItem>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Specialization - {doctorList.specialization}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Experience - {doctorList.experience}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Medical Registration Number - {doctorList.register}
          </Text>
          <Text
            mb={5}
            fontSize="light"
            color="gray.500"
            dark={{ color: "gray.400" }}
          >
            Date of Birth - {doctorList.date}
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DoctorCard;
