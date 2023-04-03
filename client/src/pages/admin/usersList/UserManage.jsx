import React from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import UsersList from "../../../components/admin/usersList/UsersList";

const UserManage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <UsersList />
    </>
  );
};

export default UserManage;
