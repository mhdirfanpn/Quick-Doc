import React from "react";
import "./Body1.css";

const Body1 = () => {
  return (
    <React.Fragment>
      <div className="w-full mt-44 bg-white flex flex-col justify-between">
        <div className="grid md:grid-cols-2 max-w-[1450px] m-auto">
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
              src="https://img.freepik.com/free-photo/full-shot-sick-man-couch_23-2148998295.jpg?w=1380&t=st=1681988532~exp=1681989132~hmac=684d8b78bd69aa07f9c17fad4d1ab7efc6704098e1c1ec097e139cce71626008"
              alt="/"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Body1;
