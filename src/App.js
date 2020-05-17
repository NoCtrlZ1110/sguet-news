import React from "react";
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

function downloadHandler(event) {
  event.preventDefault();
  domtoimage
    .toBlob(document.getElementById("NoCtrlZ"), {
      width: SIZE.WIDTH,
      height: SIZE.HEIGHT,
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
      <Row>
        <Col className="" xs={7}>
          <div className="middle mt-5" id="mainArea">
            <div id="NoCtrlZ">
              <Background image={image}>
                <Title text="Thông Báo" />
                <Subtitle text="A little boy trying to code a website" />
              </Background>
            </div>
          </div>
        </Col>
        <Col className="middle" xs={4}>
          <div className="text-center middle" id="rectangle">
            <button
              className="btn btn-success"
              onClick={downloadHandler.bind(this)}
            >
              Download image
            </button>
            <button
              className="btn btn-success my-3"
              onClick={downloadHandler.bind(this)}
            >
              Download image
            </button>
            <button
              className="btn btn-success"
              onClick={downloadHandler.bind(this)}
            >
              Download image
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
