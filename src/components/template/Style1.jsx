import React from "react";
import Background from "../background/background";
import Title from "../title/title";
import BodyArea from "../bodyArea/BodyArea";
import UET from "../../assets/images/UET.png";
import Subtitle from "../subtitle/subtitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Blue from "../../assets/images/template/blue.png";
export default function Style1(props) {
  return (
    <>
      <Background size={props.size} screenshot={props.screenshot} image={Blue}>
        <Title text={props.text} size={30} font="Lalezar"></Title>
      </Background>
    </>
  );
}
