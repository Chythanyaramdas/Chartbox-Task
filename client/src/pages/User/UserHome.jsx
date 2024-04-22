import React from "react";
import Navbar from "../../components/User/Navbar";
import Todo from "../../components/User/Todo";
const UserHome = () => {
  return (
    <div>
      <Navbar/>
      <div>
         <Todo/>
      </div>
    </div>
  );
};
export default UserHome;
