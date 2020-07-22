import React from "react";
import "./background.css";
// import SIZE from "../../const";

export default function Background(props) {
  let bgStyle = {
    background: "",
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: props.size.WIDTH,
    width: props.size.WIDTH,
    height: props.size.HEIGHT,
    flexDirection: "column",
    display: "flex",
    // alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <div style={bgStyle}>
        {props.screenshot ? (
          <img src={props.screenshot} alt="link" />
        ) : (
          <p>Please enter your link.</p>
        )}
        {props.children}
      </div>
    </>
  );
}
