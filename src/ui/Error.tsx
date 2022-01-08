import React from "react";

type ErrorProps = {
  text: string;
};

export const Error = ({ text }: ErrorProps) => {
  return (
    <h2 className="w-full mx-auto text-center text-red-700 bg-red-100 my-4 py-4 border-l-8 border-red-700">
      {text}
    </h2>
  );
};
