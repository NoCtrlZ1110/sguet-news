import "./View.css";
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import GitHubLogo from "../../assets/images/github.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Draggable from "react-draggable";
import Style1 from "../template/Style1";
import { Button } from "antd";
import {
  faDownload,
  faAlignLeft,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API, TOKEN, COLORS } from "../../const";

export default function View(props) {
  const [text, setText] = useState("Title will go here!");
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(COLORS[index]);
  const [screenshot, setScreenShot] = useState(null);

  useEffect(() => {
    setColor(COLORS[index]);
  }, [index]);

  function getScrnsht(link) {
    axios.get(`${API}${link}&token=${TOKEN}`).then((res) => {
      const scrnSht = res.data.screenshot;
      convertScrnsht(scrnSht);
    });
  }

  const convertScrnsht = (url) => {
    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          console.log(url);
          const link = document.createElement("a");
          link.href = url;
          console.log(link);
          setScreenShot(link);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let downloadHandler = (event) => {
    event.preventDefault();
    html2canvas(document.getElementById("NoCtrlZ"), {
      allowTaint: true,
      scale: 2,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      // letterRendering: 1,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "myImage.png");
      });
    });
  };

  let changeText = () => {
    setText("Dự kiến lịch thi học kỳ II năm học 2019-2020");
  };
  let changeColor = () => {
    console.log(index);
    if (index < COLORS.length - 1) {
      setIndex(index + 1);
    } else setIndex(0);
    setColor(COLORS[index]);
  };

  let controlPanel = () => {
    return (
      <Draggable>
        <div className="flex-fill align-self-center" style={{ zIndex: 2 }}>
          <div className="middle" id="rectangle">
            <Button
              type="primary"
              className="btn"
              onClick={downloadHandler.bind(this)}
            >
              <FontAwesomeIcon id="icon" icon={faDownload} />
              Download
            </Button>
            <Button type="primary" className="btn mt-3" onClick={changeText}>
              Text
              <FontAwesomeIcon id="icon" icon={faAlignLeft} />
            </Button>
            <Button type="primary" className="btn mt-3" onClick={changeColor}>
              Color
              <FontAwesomeIcon id="icon" icon={faExchangeAlt} />
            </Button>{" "}
            <Button
              type="primary"
              className="btn mt-3"
              onClick={() =>
                getScrnsht(
                  "https://uet.vnu.edu.vn/trieu-tap-nguoi-hoc-tham-du-le-trao-bang-tot-nghiep-thang-07-nam-2020/"
                )
              }
            >
              Test
              <FontAwesomeIcon id="icon" icon={faExchangeAlt} />
            </Button>
          </div>
        </div>
      </Draggable>
    );
  };

  let background = () => {
    return (
      <>
        <iframe
          id="nodeGarden"
          title="node-garden"
          src="https://nodegarden.js.org/"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -2,
            border: "none",
            marginRight: "185px",
          }}
        ></iframe>
        <a href="https://github.com/NoCtrlZ1110/sguet-news">
          <img
            src={GitHubLogo}
            alt="NoCtrlZ1110"
            id="githublogo"
            style={{
              transform: "rotate(45deg)",
              position: "absolute",
              borderRadius: "10px",
              width: 35,
              height: 35,
              top: 10,
              right: 10,
              zIndex: 2,
              backgroundColor: "white",
            }}
          ></img>
        </a>
      </>
    );
  };

  return (
    <div className="App">
      {background()}
      <div className="d-flex">
        <div className="flex-fill">
          <div className="middle mt-5">
            <div id="NoCtrlZ">
              <Style1
                text={text.toUpperCase()}
                screenshot={screenshot}
                color={color}
              />
            </div>
          </div>
        </div>
        {controlPanel()}
      </div>
    </div>
  );
}

/* 
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
 */
