import { useState, useEffect } from "react";

type useFetchNearPetsProps = {
  lat: number;
  lng: number;
};

export const useFetchNearPets = ({ lat, lng }: useFetchNearPetsProps) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNearPets = async () => {
    if (lat && lng) {
      const url = `https://m7-desafio-jous.herokuapp.com/api/pets/near/${lat}/${lng}`;
      const nearPets = await (await fetch(url)).json();

      setPets(nearPets);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNearPets();
  }, [lat, lng]);

  return [loading, pets];
};
