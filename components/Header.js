import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Link route="/">
        <a className="item">Tunmise Crowdfund</a>
      </Link>
      <Menu.Menu position="right"></Menu.Menu>
      <Link route="/">
        <a className="item">Home</a>
      </Link>
      <Link route="/">
        <a className="item">Address</a>
      </Link>
      <Link route="/campaigns/new">
        <a className="item">+</a>
      </Link>
    </Menu>
  );
};
