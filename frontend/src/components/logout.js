import React, { useEffect } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const response = axiosInstance.post("logout/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    axiosInstance.defaults.headers["Authorization"] = null;

    navigate("/");
  });

  return <div>Logout</div>;
}
