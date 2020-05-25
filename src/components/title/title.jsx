import React from "react";
import "./title.css";

export default function Title(props) {
  let fontLink = `https://fonts.googleapis.com/css2?`;
  if (props.font) fontLink += `family=${props.font}`;
  else fontLink += `family=Anton`;
  return (
    <>
      <link href={fontLink} rel="stylesheet" crossOrigin="anonymous"></link>
      <b>
        <h1
          className="title"
          style={{
            fontSize: props.size,
            color: props.color,
            fontFamily: props.font,
            fontWeight: props.fontWeight,
          }}
        >
          {props.text}
        </h1>
      </b>
    </>
  );
}
