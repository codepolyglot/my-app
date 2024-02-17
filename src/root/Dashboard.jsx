import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../form/Login";
import Registration from "../form/Registration";
import ForgetPassword from "../form/ForgetPassword";
import ResetPassword from "../form/ResetPassword";
import AdminPanel from "../main/AdminPanel";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            loggedIn ? (
              <AdminPanel setLoggedIn={setLoggedIn} />
            ) : (
              <Registration />
            )
          }
        />
      </Routes>
    </>
  );
};

export default Dashboard;
