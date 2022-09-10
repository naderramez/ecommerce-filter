import React, { FC, useState } from "react";

interface Props {
  label: string;
}

const Button: FC<Props> = ({ label = "Button" }) => {
  const [filterIsActive, setFilterIsActive] = useState<boolean>(false);

  const activeClass = filterIsActive ? "outline" : "";

  return <button>{label}</button>;
};

export default Button;
