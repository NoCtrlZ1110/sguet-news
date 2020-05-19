import React from "react";
import "./content.css";

export default function Content(props) {
  let fontLink = `https://fonts.googleapis.com/css2?family=Anton&display=swap`;
  if (props.font) fontLink += `&family=${props.font}`;
  return (
    <>
      <link href={fontLink} rel="stylesheet" crossOrigin="anonymous"></link>
      <b>
        <h1
          className="content m-3 align-self-center"
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
