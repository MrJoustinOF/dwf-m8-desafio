import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "./../pages/Home";
import { SignIn } from "./../pages/SignIn";
import { Me } from "./../pages/Me";
import { MyPets } from "./../pages/MyPets";
import { ReportPet } from "../pages/ReportPet";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="me" element={<Me />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="mypets" element={<MyPets />} />
        <Route path="reportpet" element={<ReportPet />} />
      </Route>
    </Routes>
  );
};
