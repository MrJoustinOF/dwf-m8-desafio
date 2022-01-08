import React from "react";

type DeleteButtonProps = {
  text: string;
  onClick: (e: any) => any;
};

export const DeleteButton = ({ onClick, text }: DeleteButtonProps) => {
  return (
    <p
      className="my-8 text-main text-center underline uppercase cursor-pointer"
      onClick={onClick}
    >
      {text}
    </p>
  );
};
