import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { decodeToken } from "react-jwt";
import { FormInput } from "./../ui/FormInput";
import { SubmitBtn } from "./../ui/SubmitBtn";
import { Error } from "./../ui/Error";
import { authState } from "./../utils/atoms";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("email");
  const [errors, setErrors] = useState([]);

  const [{ loged }, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();

  useEffect(() => {
    if (loged) {
      navigate("/");
    }
  }, [loged]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let errs: any = [];

    if (!/^\w+@\w+\.\w+$/.test(email.trim()) && mode !== "password") {
      errs.push("Este email no es valido");
    }

    if (password.trim().length < 8 && mode === "password") {
      errs.push("Tu contraseña debe tener mas de 8 caracteres");
    }

    setErrors(errs);

    if (errs.length === 0 && mode !== "password") {
      const { created } = await (
        await fetch("http://localhost:3001/api/users/" + email)
      ).json();

      if (created) {
        setMode("password");
      } else {
        setAuth({
          loged: false,
          user: {
            email,
          },
        });

        navigate("/me");
      }
    } else if (errs.length === 0 && mode === "password") {
      const { msg, token } = await (
        await fetch("http://localhost:3001/api/users/token", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (!msg && token) {
        localStorage.setItem("token", token);

        try {
          const user: any = decodeToken(token);

          setAuth({
            loged: true,
            user,
          });
        } catch (error) {
          console.log(error);
        }

        navigate("/");
      } else if (msg === "wrong password") {
        const err: any = ["Wrong password"];
        setErrors(err);
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

        {mode === "password" ? (
          <FormInput
            label="Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        ) : (
          <FormInput
            label="Email"
            name="email"
            type="text"
            value={email}
            onChange={setEmail}
          />
        )}

        <SubmitBtn
          text={mode === password ? "Ingresar" : "Siguiente"}
          color="pink"
        />
      </div>
    </form>
  );
};
