import React from "react";
import "./subtitle.css";

export default function Subtitle(props) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Tangerine"
        rel="stylesheet"
        crossOrigin="anonymous"
      ></link>
      <h1 className="subtitle">{props.text}</h1>
    </>
  );
}
