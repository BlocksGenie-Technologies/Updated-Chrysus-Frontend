import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Dashboard/Dashboard";
import UserSideBar from "./Dashboard/UserSideBar";

const Accounts = () => {
  return (
    <Div className="bg-black">
      <UserSideBar />
      <Outlet />
    </Div>
  );
};

export default Accounts;

const Div = styled.div`
  position: relative;
  background-color: #121212;
`;
