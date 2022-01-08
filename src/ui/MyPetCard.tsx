import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { petOnEditState } from "../utils/atoms";

type MyPetCardProps = {
  pet: any;
};

export const MyPetCard = ({ pet }: MyPetCardProps) => {
  const [, setPetOnEdit]: any = useRecoilState(petOnEditState);
  const { name, image, refPlace, found } = pet;
  const navigate = useNavigate();

  const handleClick = () => {
    setPetOnEdit(pet);
    navigate("/reportpet");
  };

  return (
    <div className="w-60 border-2 border-black mx-auto my-4">
      <img src={image} alt="pet-img" className="w-full block" />
      <div className="mx-4 my-2 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="uppercase">{refPlace}</p>
        </div>
        <img
          src="./img/editIcon.png"
          alt="edit-icon"
          className="cursor-pointer w-6 h-6"
          onClick={handleClick}
        />
      </div>
      {found && <p className="mx-4 my-2 text-green uppercase">Encontrado</p>}
    </div>
  );
};
