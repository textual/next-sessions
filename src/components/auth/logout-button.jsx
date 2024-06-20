"use client";

import { redirect } from "next/navigation";
import { Button } from "../button";
import { apiInstance } from "@/lib/axios";

const LogoutButton = () => {
  const handleClick = async () => {
    console.log("clciking");
    try {
      const response = await apiInstance.get("/api/auth/logout");
      // setData(response.data);
      console.log("auth/logout response", response);
      redirect("/");
    } catch (err) {
      // setError('Failed to fetch data');
      console.log("log out failed");
    }
  };
  return <Button onClick={handleClick}>log out</Button>;
};

export default LogoutButton;
