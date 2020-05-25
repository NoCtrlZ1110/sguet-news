import React from "react";
import "./BodyArea.css";
import Title from "../title/title";
import Content from "../content/content";

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
            font="Alata"
            id="title"
          />
          <hr className="mb-4" />
          {/* <p className="text-left m-4">{props.content}</p> */}
          <Content
            text={props.content}
            color="#008B8B"
            font="Niramit"
            size={22}
          />
        </div>
      </div>
    </div>
  );
}
