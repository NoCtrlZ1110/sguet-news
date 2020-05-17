import React, { useEffect } from "react";
import Background from "./components/background/background";
import Title from "./components/title/title";
import Subtitle from "./components/subtitle/subtitle";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import image from "./image/VNU.jpg";
import "./App.css";

function downloadHandler(event) {
  event.preventDefault();
  domtoimage
    .toBlob(document.getElementById("NoCtrlZ"), {
      width: 1500,
      // height: 1000,
      quality: 1,
      style: {},
    })
    .then(function (blob) {
      console.log(blob);
      saveAs(blob, "myImage.png");
    });
}

function App() {
  return (
    <div className="App">
      <button
        className="btn btn-success btn-download"
        onClick={downloadHandler.bind(this)}
      >
        Download image
      </button>
      <div id="NoCtrlZ">
        <Background image={image}>
          <Title text="Nguyễn Văn Huy" />
          <Subtitle text="A little boy trying to code a website" />
        </Background>
      </div>
    </div>
  );
}

export default App;
