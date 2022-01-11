import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { decodeToken } from "react-jwt";
import { Error } from "../ui/Error";
import { FormInput } from "./../ui/FormInput";
import { SubmitBtn } from "./../ui/SubmitBtn";
import { authState } from "./../utils/atoms";

export const MeForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errors, setErrors] = useState([]);

  const [{ loged, user }, setAuth]: any = useRecoilState(authState);
  const { email, id } = user;

  const navigate = useNavigate();

  useEffect(() => {
    if (!loged && !email) {
      navigate("/signin");
    }

    setName(user.name ? user.name : "");
    setPassword(user.password ? user.password : "");
    setConfirmPass(user.password ? user.password : "");
  }, [loged, user, email, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let errs: any = [];

    if (
      name.trim().length === 0 ||
      password.trim().length === 0 ||
      confirmPass.trim().length === 0
    ) {
      errs.push("Todos los campos son obligatorios");
    }

    if (name.trim().length < 4 && name.trim().length !== 0) {
      errs.push("Tu nombre debe tener al menos 4 caracteres");
    }

    if (password.trim().length < 8 && password.trim().length !== 0) {
      errs.push("Tu contaseña debe tener al menos 8 caracteres");
    }

    if (password.trim() !== confirmPass.trim()) {
      errs.push("Las contraseñas introducidas no son iguales");
    }

    setErrors(errs);

    if (loged) {
      const { msg, token } = await (
        await fetch("http://localhost:3001/api/users/" + id, {
          method: "PUT",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
      ).json();

      if (msg === "user updated" && token) {
        localStorage.setItem("token", token);

        let userToContext: any;

        try {
          // The secret is from the backend that we made the last module
          userToContext = decodeToken(token);
        } catch (err) {
          console.log(err);
        }

        setAuth({
          loged: true,
          user: userToContext,
        });

        navigate("/");
      }
    } else if (!loged && email) {
      const { msg, token } = await (
        await fetch("http://localhost:3001/api/users", {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (msg === "user saved" && token) {
        localStorage.setItem("token", token);

        let userToContext: any;

        try {
          // The secret is from the backend that we made the last module
          userToContext = decodeToken(token);
        } catch (err) {
          console.log(err);
        }

        setAuth({
          loged: true,
          user: userToContext,
        });

        navigate("/");
      }
    }
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit}>
      <div className="w-60 md:w-96">
        <div className="errsContainer">
          {errors.length !== 0 &&
            errors.map((err) => <Error text={err} key={err} />)}
        </div>

        <FormInput
          label="Nombre"
          name="name"
          type="text"
          value={name}
          onChange={setName}
        />

        <div className="mt-8">
          <FormInput
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>

        <div className="mt-2">
          <FormInput
            label="Repetir contraseña"
            name="confirmPass"
            type="password"
            value={confirmPass}
            onChange={setConfirmPass}
          />
        </div>

        <SubmitBtn text="Guardar" color="pink" />
      </div>
    </form>
  );
};
