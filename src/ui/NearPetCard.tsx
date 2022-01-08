import React from "react";

type NearPetCardTypes = {
  pet: [];
  onClick: (e: any) => any;
};

export const NearPetCard = ({ pet, onClick }: NearPetCardTypes) => {
  const { name, image, refPlace, found }: any = pet;

  return (
    <div className="w-60 border-2 border-black mx-auto my-4">
      <img src={image} alt="pet-img" className="w-full block" />
      <div className="mx-4 my-2 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="uppercase">{refPlace}</p>
        </div>
        <p
          className="cursor-pointer text-right text-blue underline"
          onClick={onClick}
        >
          Reportar informacion
        </p>
      </div>

      {found && <p className="mx-4 my-2 text-green uppercase">Encontrado</p>}
    </div>
  );
};
