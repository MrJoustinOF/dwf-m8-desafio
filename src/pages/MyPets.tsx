import React from "react";
import { useFetchMyPets } from "../hooks/useFetchMyPets";
import { Loader } from "../ui/Loader";
import { MyPetCard } from "../ui/MyPetCard";

export const MyPets = () => {
  const [loading, pets]: any = useFetchMyPets();

  return (
    <>
      <h2 className="text-3xl md:text-center md:mx-0 mx-4 font-semibold my-8">
        Mis mascotas reportadas
      </h2>

      {pets.length === 0 && loading && (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      )}

      {pets.length === 0 && !loading && (
        <h2 className="text-2xl text-center">No has reportado mascotas aun</h2>
      )}

      {pets.length !== 0 && !loading && (
        <div className="md:grid grid-cols-3">
          {pets.map((pet: any) => (
            <MyPetCard pet={pet} key={pet.id} />
          ))}
        </div>
      )}
    </>
  );
};
