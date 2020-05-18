import React from "react";
import "./background.css";
// import SIZE from "../../const";

export default function Background(props) {
  let bgStyle = {
    backgroundImage: `url(${props.image})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: props.size.WIDTH,
    height: props.size.HEIGHT,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  let maskStyle = {
    width: props.size.WIDTH,
    height: props.size.HEIGHT,
    position: "absolute",
    background: "black",
    opacity: 0.5,
    zIndex: 0,
  };

  return (
    <>
      <div id="black" style={maskStyle}></div>
      <div style={bgStyle}>{props.children}</div>
    </>
  );
}
