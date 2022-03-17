import React from "react";
import { Container } from "./Bullets.styles";

interface IBullet {
  active?: boolean;
}

const Bullets = ({ active = false }: IBullet) => {
  return <Container active={active} />;
};

export default Bullets;
