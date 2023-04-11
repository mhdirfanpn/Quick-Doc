

import React from "react";
import { Box } from "@chakra-ui/react";
import './Body1.css'

const Body1 = () => {
  return (
    <React.Fragment>
      <div className="w-full mt-4 bg-white flex flex-col justify-between">
        <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
          <div className=" flex flex-col justify-center md:items-start w-full py-8 my-div mt-8">
            <h1 className="doc py-3 text-5xl md:text-7xl font-bold">
              QUICK-DOC
            </h1>
            <p className="text-4xl mt-5 font-semibold text-gray-700">
              Our specialist doctors are ready to help you, Hassle-free virtual
              care
            </p>
          </div>

          <div>
            <img
              className="w-11/12"
              src="https://img.freepik.com/free-vector/online-doctor-flat-design_23-2148521415.jpg?w=826&t=st=1680710341~exp=1680710941~hmac=6af90500c51bb4e5d540c55489fbd2e3cd4e462277837ac1f22348ec2088a2a6"
              alt="/"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Body1;

