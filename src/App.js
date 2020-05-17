import React, { useState } from "react";
import Background from "./components/background/background";
import Title from "./components/title/title";
import Subtitle from "./components/subtitle/subtitle";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import image from "./image/VNU.jpg";
import "./App.css";
import SIZE from "./const";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {
  const [size, setSize] = useState(SIZE);
  const [text, setText] = useState("Thông Báo");

  function getLatestNews() {
    fetch("http://localhost:8080/SGUET/latest")
      .then((response) => response.json())
      .then((data) => setText(data.title));
  }

  function downloadHandler(event) {
    event.preventDefault();
    domtoimage
      .toBlob(document.getElementById("NoCtrlZ"), {
        width: size.WIDTH,
        height: size.HEIGHT,
        quality: 1,
        style: {},
      })
      .then(function (blob) {
        console.log(blob);
        saveAs(blob, "myImage.png");
      });
  }
  function changeSize() {
    if (size.HEIGHT !== 900) setSize({ HEIGHT: 900, WIDTH: 1200 });
    else setSize(SIZE);
  }
  function changeText() {
    setText("Dự kiến lịch thi học kỳ II năm học 2019-2020");
  }
  return (
    <div className="App">
      <div className="d-flex">
        <div className="flex-fill">
          <div className="middle mt-5" id="mainArea">
            <div id="NoCtrlZ">
              <Background size={size} image={image}>
                <Title text={text} />
                <Subtitle text="A little boy trying to code a website" />
              </Background>
            </div>
          </div>
        </div>
        <div className="flex-fill align-self-center">
          <div className="text-center middle" id="rectangle">
            <button
              className="btn btn-success"
              onClick={downloadHandler.bind(this)}
            >
              Download image
            </button>
            <button className="btn btn-success my-3" onClick={changeSize}>
              Change Size
            </button>
            <button className="btn btn-success" onClick={changeText}>
              Change Text
            </button>
            <button className="btn btn-success" onClick={getLatestNews}>
              Get Latest News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
