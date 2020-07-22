import React from "react";
import "./BodyArea2.css";
import Title from "../title/title";
import Content from "../content/content";
import Draggable from "react-draggable";

export default function BodyArea2(props) {
  console.log(props.width);

  return (
    <div className="bodyArea2" style={{ maxHeight: props.size.HEIGHT / 2 }}>
      <div
        id="text-box2"
        style={{
          width: props.size.WIDTH,

          minHeight: props.size.HEIGHT / 2,
        }}
      >
        <div id="content2">
          <br />
          <Draggable disabled={!props.drag}>
            <div>
              <Title
                text={props.title}
                color="#ffffff"
                size={50}
                edit={props.edit}
                // fontWeight={900}
                font="Lalezar"
                id="title"
              />
            </div>
          </Draggable>
          <hr className="mb-4" />
          <Draggable disabled={!props.drag}>
            <div>
              <Content
                text={props.content}
                color="#ffffff"
                font="Niramit"
                size={25}
                edit={props.edit}
              />
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
}
