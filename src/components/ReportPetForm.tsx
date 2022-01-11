import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState, petOnEditState } from "./../utils/atoms";
import { FormInput } from "../ui/FormInput";
import { MyDropzone } from "../ui/MyDropzone";
import { MyMapbox } from "../ui/MyMapbox";
import { Button } from "../ui/Button";
import { Error } from "../ui/Error";
import { DeleteButton } from "../ui/DeleteButton";

export const ReportPetForm = () => {
  const [auth]: any = useRecoilState(authState);
  const [petOnEdit, setPetOnEdit]: any = useRecoilState(petOnEditState);
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState("/src/img/bg-image.png");
  const [geoLoc, setGeoLoc] = useState({ lat: 0, lng: 0 });
  const [refPlace, setRefPlace] = useState("");
  const [errors, setErrors]: any = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.loged) {
      navigate("/signin");
    }

    if (Object.keys(petOnEdit).length !== 0) {
      const { name, image, lat, lng, refPlace } = petOnEdit;

      setName(name);
      setImageData(image);
      setGeoLoc({ lat, lng });
      setRefPlace(refPlace);
    }
  }, [petOnEdit, auth, navigate]);

  useEffect(() => {
    return () => {
      setPetOnEdit({});
    };
  }, [setPetOnEdit]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let errs: any = [];

    if (name.length === 0 || refPlace.length === 0) {
      errs.push("Todos los campos son obligatorios");
    }

    if (imageData === "/src/img/bg-image.png") {
      errs.push("Debes agregar una imagen de tu mascota");
    }

    if (name.length < 4 && name.length !== 0) {
      errs.push("El nombre de tu mascota debe tener mas de 4 caracteres");
    }

    if (geoLoc.lat === 0 && geoLoc.lng === 0) {
      errs.push("Debes buscar una ubicacion en el mapa");
    }

    setErrors(errs);

    if (errs.length === 0 && Object.keys(petOnEdit).length === 0) {
      const { lat, lng } = geoLoc;
      const UserId = auth.user.id;
      const authorization = "bearer " + localStorage.getItem("token");

      try {
        const { msg } = await (
          await fetch("https://m7-desafio-jous.herokuapp.com/api/pets/", {
            method: "POST",
            body: JSON.stringify({
              name,
              imageData,
              lat,
              lng,
              refPlace,
              UserId,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization,
            },
          })
        ).json();

        if (msg === "pet saved") navigate("/mypets");
      } catch (error) {
        setErrors([
          "La imagen es muy pesada para nuestro servidor, intenta subir una nueva",
        ]);
      }
    } else if (errs.length === 0 && Object.keys(petOnEdit).length !== 0) {
      const url = `https://m7-desafio-jous.herokuapp.com/api/pets/${petOnEdit.id}`;
      const authorization = "bearer " + localStorage.getItem("token");
      const { found } = petOnEdit;
      const { lat, lng } = geoLoc;

      try {
        const { msg } = await (
          await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
              name,
              imageData,
              found,
              lat,
              lng,
              refPlace,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization,
            },
          })
        ).json();

        if (msg === "pet updated") navigate("/mypets");
      } catch (error) {
        setErrors([
          "La imagen es muy pesada para nuestro servidor, intenta subir una nueva",
        ]);
      }
    }
  };

  const handleSetPetFound = async () => {
    const url = `https://m7-desafio-jous.herokuapp.com/api/pets/found/${petOnEdit.id}`;
    const authorization = "bearer " + localStorage.getItem("token");
    const { msg } = await (
      await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization,
        },
      })
    ).json();

    if (msg === "pet found") navigate("/mypets");
  };

  const handleDeletePet = async () => {
    const url = `https://m7-desafio-jous.herokuapp.com/api/pets/${petOnEdit.id}`;
    const authorization = "bearer " + localStorage.getItem("token");
    const { msg } = await (
      await fetch(url, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization,
        },
      })
    ).json();

    if (msg === "pet deleted") navigate("/mypets");
  };

  return (
    <form className="flex justify-center" onSubmit={(e) => e.preventDefault()}>
      <div>
        <div className="errsContainer">
          {errors.length !== 0 &&
            errors.map((err: any) => <Error text={err} key={err} />)}
        </div>

        <FormInput
          label="Nombre"
          name="name"
          type="text"
          value={name}
          onChange={setName}
        />

        <div className="my-4">
          <img src={imageData} alt="pet-img" className="w-60 md:w-96 block" />

          <MyDropzone setImageData={setImageData} />
        </div>

        <MyMapbox
          setGeoloc={setGeoLoc}
          refPlace={refPlace}
          setRefPlace={setRefPlace}
        />

        <Button
          text={
            Object.keys(petOnEdit).length !== 0
              ? "Guardar"
              : "Reportar como perdido"
          }
          color="pink"
          onClick={handleSubmit}
        />

        {Object.keys(petOnEdit).length !== 0 && (
          <Button
            text="Reportar como encontrado"
            color="green"
            onClick={handleSetPetFound}
          />
        )}

        {Object.keys(petOnEdit).length === 0 && (
          <Link to="/mypets">
            <Button text="Cancelar" color="gray" />
          </Link>
        )}

        {Object.keys(petOnEdit).length !== 0 && (
          <DeleteButton text="Despublicar" onClick={handleDeletePet} />
        )}
      </div>
    </form>
  );
};
