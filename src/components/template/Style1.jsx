import React from "react";
import Background from "../background/background";
import Title from "../title/title";
import Blue from "../../assets/images/template/blue.png";
export default function Style1(props) {
  return (
    <>
      <Background image={Blue} screenshot={props.screenshot}>
        <Title text={props.text} size={30}></Title>
      </Background>
    </>
  );
}
