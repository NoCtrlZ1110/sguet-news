import React from "react";
import "./background.css";
import { SIZE } from "../../const";
import Texture from "../../assets/images/texture.jpg";

export default function Background(props) {
  let bgStyle = {
    background: "",
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: SIZE.WIDTH,
    width: SIZE.WIDTH,
    height: SIZE.HEIGHT,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
  };

  let screenShotStyle = {
    background: "",
    backgroundImage: `url(${props.screenshot ? props.screenshot : Texture})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: SIZE.WIDTH,
    width: SIZE.WIDTH,
    height: SIZE.HEIGHT,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <div style={screenShotStyle}>
        <div style={bgStyle}>{props.children}</div>
      </div>
    </>
  );
}
