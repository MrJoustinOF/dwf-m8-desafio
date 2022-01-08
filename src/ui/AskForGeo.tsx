import React from "react";
import { Button } from "./../ui/Button";

type AskForGeoTypes = {
  setGeoloc: (data: any) => any;
};

export const AskForGeo = ({ setGeoloc }: AskForGeoTypes) => {
  const handleAskGeoloc = (e: any) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const lat = latitude;
      const lng = longitude;

      setGeoloc({ lat, lng });
    });
  };

  return (
    <div className="w-60 md:w-96 mx-auto my-8">
      <p className="text-justify">
        Para ver las mascotas reportadas cerca tuyo necesitamos permiso para
        conocer tu ubicación.
      </p>

      <Button text="Dar mi ubicación" color="pink" onClick={handleAskGeoloc} />
    </div>
  );
};
