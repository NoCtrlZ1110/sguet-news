import React from "react";
import "./title.css";

export default function Title(props) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Tangerine"
        rel="stylesheet"
        crossOrigin="anonymous"
      ></link>
      <h1 className="title ">{props.text}</h1>
    </>
  );
}
