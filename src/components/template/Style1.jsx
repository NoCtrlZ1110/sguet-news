import React from "react";
import Background from "../Background/background";
import Title from "../Title/title";

export default function Style1(props) {
  return (
    <>
      <Background image={props.color} screenshot={props.screenshot}>
        <Title text={props.text} size={30}></Title>
      </Background>
    </>
  );
}
