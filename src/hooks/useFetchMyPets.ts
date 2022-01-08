import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userValue } from "../utils/atoms";

export const useFetchMyPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const user: any = useRecoilValue(userValue);

  const fetchPets = async () => {
    const authorization = "bearer " + localStorage.getItem("token");

    const url = `https://m7-desafio-jous.herokuapp.com/api/pets/user/${user.id}`;

    const query = await (
      await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization,
        },
      })
    ).json();
    setPets(query);
    setLoading(false);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return [loading, pets];
};
