import React, { useState } from "react";
import { Error } from "../ui/Error";
import { FormInput } from "../ui/FormInput";
import { SubmitBtn } from "../ui/SubmitBtn";
import { SuccessMsg } from "../ui/SuccessMsg";

type SendReportFormProps = {
  pet: any;
  onClick: (e: any) => any;
};

export const SendReportForm = ({ pet, onClick }: SendReportFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccessMsg] = useState([]);

  const { name: namePet, objectID: petId } = pet;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let errs: any = [];

    if (name.length === 0 || phone.length === 0 || message.length === 0) {
      errs.push("Todos los campos son obligatorios");
    } else if (name.length < 4 && name.length !== 0) {
      errs.push("Tu nombre debe tener al menos 4 caracteres");
    } else if (phone.length < 10 && phone.length !== 0) {
      errs.push("Tu telefono debe tener al menos 10 digitos");
    } else if (message.length < 5 && message.length !== 0) {
      errs.push("Debes poner un poco mas de informacion de la mascota");
    }

    setErrors(errs);

    if (errs.length === 0) {
      const { msg } = await (
        await fetch("http://m7-desafio-jous.herokuapp.com/api/sendmail", {
          method: "POST",
          body: JSON.stringify({
            name,
            phone,
            message,
            petId,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (msg === "email sent") {
        const messageToShow: any = [
          "Se ha reportado esta mascota correctamente",
        ];
        setSuccessMsg(messageToShow);
      }
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 right-0 bg-black-opacity flex justify-center items-center">
      <div className="bg-white w-60 md:w-96 px-4 py-8 rounded">
        <div className="flex justify-end">
          <img
            src="./img/closeIcon.png"
            alt="close-icon"
            className="closeFormButton w-4 h-4 cursor-pointer"
            onClick={onClick}
          />
        </div>
        <div>
          <h2 className="text-center text-2xl font-bold">
            Reportar info de {namePet}
          </h2>

          <div>
            {errors.map((err) => (
              <Error text={err} key={err} />
            ))}
            {successMsg.map((msg) => (
              <SuccessMsg text={msg} key={msg} />
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <FormInput
                label="Tu nombre"
                name="name"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
              />
            </div>

            <div className="my-4">
              <FormInput
                label="Tu telefono"
                name="phone"
                type="text"
                value={phone}
                onChange={(data) => setPhone(data)}
              />
            </div>

            <div className="my-4">
              <label className="text-sm block w-full uppercase">
                Donde lo viste?
              </label>
              <textarea
                name="message"
                cols={30}
                rows={10}
                defaultValue={message}
                onChange={(data) => setMessage(data.target.value)}
                className="messageReport rounded border-black border-2 block w-full"
              ></textarea>
            </div>

            <SubmitBtn text="Enviar" color="pink" />
          </form>
        </div>
      </div>
    </div>
  );
};
