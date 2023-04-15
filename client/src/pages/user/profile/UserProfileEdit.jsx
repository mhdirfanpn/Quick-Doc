import React from "react";
import NavBar from "../../../components/user/navbar/Navbar";
import Footer from "../../../components/user/footer/Footer";
import UpdateProperty from "../../../components/user/profile/UpdateUserProfile";

const UserProfileEdit = () => {
  return (
    <>
      <NavBar />
      <UpdateProperty/>
      <Footer />
    </>
  );
};

export default UserProfileEdit;
