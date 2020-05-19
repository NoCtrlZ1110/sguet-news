import React from "react";
import "./BodyArea.css";
import Title from "../title/title";

export default function BodyArea(props) {
  return (
    <div className="bodyArea">
      <div id="text-box">
        <div id="content">
          <br />
          <Title
            text={props.title}
            color="#008B8B"
            size={25}
            fontWeight={900}
            font="Roboto"
          />
          <hr />
        </div>
      </div>
    </div>
  );
}
