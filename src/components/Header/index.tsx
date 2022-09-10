import React, { FC } from "react";
import IQVIA_LOGO from "../../assets/iqvia-logo.svg";

const Header: FC = () => {
  return (
    <div>
      <img
        src={IQVIA_LOGO}
        alt="IQVIA Logo"
        width={100}
        style={{ margin: "20px" }}
      />
    </div>
  );
};

export default Header;
