import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useRecoilState } from "recoil";
import { authState } from "./../utils/atoms";
import { Navbar } from "./../ui/Navbar";

export const Layout = () => {
  const [auth, setAuth]: any = useRecoilState(authState);

  useEffect(() => {
    const token: any = localStorage.getItem("token");

    if (token && !auth.user.email) {
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
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
