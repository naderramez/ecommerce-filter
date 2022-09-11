import React, { FC } from "react";
import AMAZON_LOGO from "../../assets/amazon-logo.jpg";

const Header: FC = () => {
  return (
    <div>
      <img src={AMAZON_LOGO} alt="Amazon Logo" width={100} height={60} style={{ margin: "20px" }} />
    </div>
  );
};

export default Header;
