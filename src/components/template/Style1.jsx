import React from "react";
import Background from "../background/background";
import Title from "../title/title";

export default function Style1(props) {
  return (
    <>
      <Background image={props.color} screenshot={props.screenshot}>
        <Title text={props.text} size={30}></Title>
      </Background>
    </>
  );
}
