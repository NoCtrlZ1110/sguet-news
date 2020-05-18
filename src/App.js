import React, { useState } from "react";
import Background from "./components/background/background";
import Title from "./components/title/title";
import Subtitle from "./components/subtitle/subtitle";
import { saveAs } from "file-saver";
import domtoimage from "dom-to-image";
import image from "./image/VNU.jpg";
import "./App.css";
import SIZE from "./const";
import BodyArea from "./components/bodyArea/BodyArea";

function App() {
  const [size, setSize] = useState(SIZE);
  const [text, setText] = useState("Thông Báo");

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
    document.getElementById("black").style.width = "100%";
    document.getElementById("black").style.height = "100%";
  }

  function removeStyle() {
    document.getElementById("black").style.top = "initial";
    document.getElementById("black").style.left = "initial";
    document.getElementById("black").style.width = size.WIDTH + "px";
    document.getElementById("black").style.height = size.HEIGHT + "px";
  }

  function downloadHandler(event) {
    event.preventDefault();
    domtoimage
      .toBlob(getHTML(), {
        width: size.WIDTH,
        height: size.HEIGHT,
        quality: 1,
        style: {
          top: 0,
          left: 0,
        },
      })
      .then(function (blob) {
        removeStyle();
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
                <BodyArea />
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
