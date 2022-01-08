import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useRecoilState } from "recoil";
import { authState } from "./../utils/atoms";
import { Navbar } from "./../ui/Navbar";

export const Layout = () => {
  const [{ user }, setAuth]: any = useRecoilState(authState);

  useEffect(() => {
    const token: any = localStorage.getItem("token");

    if (token && !user.email) {
      try {
        const user: any = decodeToken(token);
        setAuth({
          loged: true,
          user,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user.email, setAuth]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
