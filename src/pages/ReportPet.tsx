import React from "react";
import { useRecoilState } from "recoil";
import { petOnEditState } from "./../utils/atoms";
import { ReportPetForm } from "../components/ReportPetForm";

export const ReportPet = () => {
  const [petOnEdit]: any = useRecoilState(petOnEditState);

  return (
    <>
      <h2 className="text-3xl text-center font-semibold my-8">
        {Object.keys(petOnEdit).length === 0
          ? "Reportar mascota perdida"
          : `Editar mascota perdida: ${petOnEdit.name}`}
      </h2>
      <ReportPetForm />
    </>
  );
};
