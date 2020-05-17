import React from "react";
import "./background.css";

export default function Background(props) {
    return (
        <div className="background" style={{ backgroundImage: `url(${props.image})` }}>
            {props.children}
        </div>
    )
}
