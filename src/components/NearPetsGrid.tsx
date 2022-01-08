import React, { useState } from "react";
import { NearPetCard } from "../ui/NearPetCard";
import { SendReportForm } from "./SendReportForm";

type NearPetsGridProps = {
  nearPets: any;
};

export const NearPetsGrid = ({ nearPets }: NearPetsGridProps) => {
  const [petOnReport, setPetOnReport] = useState({});

  return (
    <>
      <div className={`${nearPets.length !== 0 && "md:grid"} grid-cols-3`}>
        {nearPets.length === 0 ? (
          <h2 className="text-center text-2xl font-semibold my-8">
            Todavia no hay mascotas reportadas
          </h2>
        ) : (
          nearPets.map((pet: any) => (
            <NearPetCard
              pet={pet}
              key={pet.objectID}
              onClick={() => setPetOnReport(pet)}
            />
          ))
        )}
      </div>
      {Object.keys(petOnReport).length !== 0 && (
        <SendReportForm pet={petOnReport} onClick={() => setPetOnReport({})} />
      )}
    </>
  );
};
