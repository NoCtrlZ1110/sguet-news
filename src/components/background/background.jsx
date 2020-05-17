import React from "react";
import "./background.css";
import SIZE from "../../const";

export default function Background(props) {
  let bgStyle = {
    backgroundImage: `url(${props.image})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: SIZE.WIDTH,
    height: SIZE.HEIGHT,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  return <div style={bgStyle}>{props.children}</div>;
}
