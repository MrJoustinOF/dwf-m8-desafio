import React from "react";

type ButtonProps = {
  text: string;
  color: string;
  onClick?: (e: any) => any;
};

export const Button = ({ text, color, onClick }: ButtonProps) => {
  return (
    <button
      className={`font-bold bg-${color} rounded w-60 block md:w-96 h-10 my-2 cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
