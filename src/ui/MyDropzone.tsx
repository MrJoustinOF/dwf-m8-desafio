import React from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./Button";

type DropzoneContainerProps = {
  setImageData: (any: any) => any;
};

export const MyDropzone = ({ setImageData }: DropzoneContainerProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      let file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const { result } = event.target;
        setImageData(result);
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <Button text="agregar/modificar foto" color="green" />
    </div>
  );
};
