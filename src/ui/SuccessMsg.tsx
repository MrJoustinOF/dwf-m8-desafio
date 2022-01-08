import React from "react";

type SuccessMsgProps = {
  text: string;
};

export const SuccessMsg = ({ text }: SuccessMsgProps) => {
  return (
    <h2 className="mx-auto text-center text-green-700 bg-green-100 my-4 py-4 border-l-8 border-green-700">
      {text}
    </h2>
  );
};
