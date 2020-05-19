import React, { useState } from "react";
import Background from "./components/background/background";
import Title from "./components/title/title";
import Subtitle from "./components/subtitle/subtitle";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import image from "./image/VNU.jpg";
import SIZE from "./const";
import BodyArea from "./components/bodyArea/BodyArea";
import UET from "./image/UET.png";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MetaTags from "react-meta-tags";
import html2canvas from "html2canvas";

function App() {
  const [size, setSize] = useState(SIZE);
  const [text, setText] = useState("Title will go here!");

  function getLatestNews() {
    fetch("https://noctrlz.herokuapp.com/SGUET/latest")
      .then((response) => response.json())
      .then((data) => setText(data.title));
  }

  function getHTML() {
    editStyle();
    return document.getElementById("NoCtrlZ");
  }

  function editStyle() {
    document.getElementById("black").style.top = 0;
    document.getElementById("black").style.left = 0;
    document.getElementById("black").style.width = "120%";
    document.getElementById("black").style.height = "120%";
  }

  function removeStyle() {
    document.getElementById("black").style.top = "initial";
    document.getElementById("black").style.left = "initial";
    document.getElementById("black").style.width = size.WIDTH + "px";
    document.getElementById("black").style.height = size.HEIGHT + "px";
  }

  // function printToPNG() {
  //   html2canvas(document.getElementById("NoCtrlZ")).then((canvas) => {
  //     canvas.toBlob((blob) => {
  //       removeStyle();
  //       saveAs(blob, "myImage.png");
  //     });
  //   });
  // }

  function downloadHandler(event) {
    event.preventDefault();
    html2canvas(document.getElementById("NoCtrlZ")).then((canvas) => {
      canvas.toBlob((blob) => {
        removeStyle();
        saveAs(blob, "myImage.png");
      });
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
              <MetaTags>
                <meta charset="UTF-8" />
              </MetaTags>
              <Background size={size} image={image}>
                <br />
                <Row style={{ minWidth: 700 }}>
                  <Col xs={5} className="align-self-center">
                    <Title text="Thông Báo" />
                  </Col>
                  <Col xs={4} />
                  <Col>
                    <img
                      className="text-right"
                      src={UET}
                      alt="UET"
                      width="100"
                      height="100"
                      style={{ zIndex: 1 }}
                    />
                  </Col>
                </Row>
                <BodyArea title={text} />
                <Subtitle text="--- from #sguet with love ---" />
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
            <button className="btn btn-success mt-3" onClick={changeSize}>
              Change Size
            </button>
            <button className="btn btn-success mt-3" onClick={changeText}>
              Change Text
            </button>
            <button className="btn btn-success mt-3" onClick={getLatestNews}>
              Get Latest News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
