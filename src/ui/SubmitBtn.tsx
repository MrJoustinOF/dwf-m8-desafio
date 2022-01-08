import React from "react";

type SubmitBtnProps = {
  text: string;
  color: string;
};

export const SubmitBtn = ({ text, color }: SubmitBtnProps) => {
  return (
    <input
      type="submit"
      value={text}
      className={`font-bold bg-${color} rounded w-full block h-10 my-2 cursor-pointer`}
    />
  );
};
