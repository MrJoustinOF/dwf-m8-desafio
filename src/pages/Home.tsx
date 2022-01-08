import React, { useState } from "react";
import { AskForGeo } from "../ui/AskForGeo";
import { NearPetsGrid } from "../components/NearPetsGrid";
import { useFetchNearPets } from "../hooks/useFetchNearPets";
import { Loader } from "../ui/Loader";

export const Home = () => {
  const [geoloc, setGeoloc]: any = useState({});
  const [loading, pets] = useFetchNearPets(geoloc);

  return (
    <>
      <h2 className="text-center text-3xl font-semibold my-8">
        Mascotas perdidas cerca tuyo
      </h2>

      {Object.keys(geoloc).length === 0 ? (
        <AskForGeo setGeoloc={setGeoloc} />
      ) : (
        <>
          {loading && (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          )}

          {!loading && <NearPetsGrid nearPets={pets} />}
        </>
      )}
    </>
  );
};
