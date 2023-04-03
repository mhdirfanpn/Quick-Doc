import React from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import DoctorsRequest from "../../../components/admin/doctorsRequest/DoctorsRequest";

const ManageDoctors = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <DoctorsRequest />
    </>
  );
};

export default ManageDoctors;
