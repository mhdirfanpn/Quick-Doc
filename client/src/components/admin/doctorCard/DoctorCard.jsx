import { Box, Grid, GridItem, Text, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from '../../../utils/axios'







const DoctorCard = () => {

  const params = useParams()
  const navigate = useNavigate()
  const [doctorList,setDoctor]=useState([]);
  const adminToken=localStorage.getItem("adminToken");

  console.log(params.doctorId)

  useEffect(()=>{
    getDoctorsDetails();
  },[])

  const approve = (id) =>{
    console.log(id)
    axios.put(`/admin/verifyDoctor/${id}`,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then(()=>{
        console.log('updated')
        navigate('/manage-doctors')
    })
  }

  const reject = (id) =>{
    console.log(id)
    axios.put(`/admin/rejectDoctor/${id}`,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then(()=>{
        console.log('updated')
        navigate('/manage-doctors')
    })
  }


  const getDoctorsDetails = async()=>{
    try{
      axios.get(`/admin/getDoctor/${params.doctorId}`,{ headers: { 'Authorization': `Bearer ${adminToken}` } }).then((response)=>{
        console.log(response.data.doctor);
        setDoctor(response.data.doctor);  
        
      }).catch((err)=>{
        console.log(err,"catch error in doctorFetching")
      })
    }catch(err){
      console.log(err)
    } 
    
  }


  return (
    <Box
      marginLeft="330"
      marginTop={10}
      bg="white"
      rounded="lg"
      border="1px"
      borderColor="gray.200"
      maxWidth="1400"
      p={4}
      shadow="md"
      dark={{ bg: "gray.800", borderColor: "gray.700" }}
    >
      <Grid gap={8} templateColumns={{ lg: "repeat(2, 1fr)" }}>
        <GridItem>
        <Text mb={5} fontSize="light" color="gray.500" dark={{ color: "gray.400" }}>
            Name - {doctorList.fullName}
          </Text>
          <Text mb={5} fontSize="light" color="gray.500" dark={{ color: "gray.400" }}>
            Email - {doctorList.email}
          </Text>
          <Text mb={5} fontSize="light" color="gray.500" dark={{ color: "gray.400" }}>
            Mobile - {doctorList.number}
          </Text>
          <Box d="flex" justifyContent={{ md: "center" }} mt={{ md: 5 }}>
            {doctorList.isVerified ? (
              <Text textShadow={4} style={{color:"green"}} p={4}>Approved</Text>
            ) : ( 
              <Box mt={5}>
                <Button
                  colorScheme="blue"
                  size="sm"
                  mr={5}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to approve?")) {
                      approve(doctorList._id);
                    }
                  }}
                >
                  Approve
                </Button>
                <Button
                  colorScheme="gray"
                  size="sm"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reject?")) {
                      reject(doctorList._id);
                    }
                  }}
                >
                  Reject
                </Button>
              </Box>
            )} 
          </Box>
        </GridItem>
        <GridItem>
        <Text mb={5} fontSize="light" color="gray.500" dark={{ color: "gray.400" }}>
            Specialization - {doctorList.specialization}
          </Text>
          <Text mb={5} fontSize="light" color="gray.500" dark={{ color: "gray.400" }}>
            Experience - {doctorList.experience}
          </Text>
          <Text mb={5} fontSize="light" color="gray.500" dark={{ color: "gray.400" }}>
            Medical Registration Number - {doctorList.register}
          </Text>
          <Text mb={5} fontSize="light" color="gray.500" dark={{ color: "gray.400" }}>
            Date of Birth - {doctorList.date}
          </Text>
          
        </GridItem>
      </Grid>
    </Box>
  );
};


export default DoctorCard;