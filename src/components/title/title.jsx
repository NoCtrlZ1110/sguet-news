import React from "react";
import "./title.css";
import ContentEditable from "react-contenteditable";

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
            fontFamily: "UTMNeutra",
            fontWeight: props.fontWeight,
            paddingLeft: 60,
            paddingRight: 60,
            paddingTop: 290,
            lineHeight: 1.5,
            ...props.style,
          }}
        >
          <ContentEditable disabled={props.edit} html={props.text} />
        </h1>
      </b>
    </>
  );
}
