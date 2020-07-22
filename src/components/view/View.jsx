/* eslint-disable no-unused-vars */
import "./View.css";
import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import SIZE from "../../const";
import html2canvas from "html2canvas";
import GitHubLogo from "../../assets/images/github.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import Style1 from "../template/Style1";
import Style2 from "../template/Style2";
import axios from "axios";

// const axios = require("axios");
export default function View(props) {
  const [size, setSize] = useState(SIZE);
  const [screenShot, setScreenShot] = useState(null);
  const [drag, setDrag] = useState(false);
  const [edit, setEdit] = useState(true);
  const [text, setText] = useState("Title will go here!");

  const [content, setContent] = useState(
    `Phòng Đào tạo (ĐT) xin gửi đến các đơn vị Dự kiến Lịch thi học kỳ II, năm học 2019 - 2020 của các lớp đại học hệ chính quy, đề nghị Lãnh đạo đơn vị thông báo cho cán bộ thuộc đơn vị mình quản lý và mời giảng: nếu cần đề nghị thay đổi về thời gian, hình thức thi,… thì liên hệ trực tiếp với chuyên viên Nguyễn Thị Thu Thảo, Phòng ĐT (024. 37547865, * thaontt@vnu.edu.vn) trước ngày 20/05/2020. [...]`
  );

  useEffect(() => {});

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function getLatestNews() {
    fetch("https://noctrlz.herokuapp.com/SGUET/latest")
      .then((response) => response.json())
      .then((data) => {
        setText(decodeHtml(data.title));
        setContent(decodeHtml(data.content));
      });
  }

  function downloadHandler(event) {
    event.preventDefault();
    html2canvas(document.getElementById("NoCtrlZ"), {
      scale: 2,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      letterRendering: 1,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
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

  function getScrnsht(e) {
    e.preventDefault();
    const link = e.target.elements.link.value;
    axios
      .get(
        `https://screenshotapi.net/api/v1/screenshot?url=${link}&token=REUXZIEP5RLXUEFS8PEF0RZTH15SJK5A&width=920&height=788&fresh=true`
      )
      .then((res) => {
        const screenshot = res.data.screenshot;
        setScreenShot(screenshot);
      });
  }

  return (
    <div className="App">
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
      <form onSubmit={getScrnsht}>
        <input type="text" name="link" placeholder="Enter your Url here..." />
        <button>Submit</button>
      </form>
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
      <div className="d-flex">
        <div className="flex-fill">
          <div className="middle mt-5">
            <div id="NoCtrlZ">
              <Style1
                size={size}
                text={text.toUpperCase()}
                content={content}
                edit={edit}
                screenshot={screenShot}
              />
              {/* <Style2
                size={size}
                image={image}
                drag={drag}
                text={text}
                edit={edit}
                content={content}
              /> */}
            </div>
          </div>
        </div>
        <Draggable>
          <div className="flex-fill align-self-center" style={{ zIndex: 2 }}>
            <div className="text-center middle" id="rectangle">
              <button
                className="btn btn-success"
                onClick={downloadHandler.bind(this)}
              >
                <FontAwesomeIcon id="icon" icon={faDownload} />
                Download
              </button>
              <button className="btn btn-success mt-3" onClick={changeSize}>
                Change Size
                <FontAwesomeIcon id="icon" icon={faSyncAlt} />
              </button>

              <button className="btn btn-success mt-3" onClick={changeText}>
                Change Text
                <FontAwesomeIcon id="icon" icon={faAlignLeft} />
              </button>

              <button
                className="btn btn-success mt-3"
                onClick={() => {
                  setEdit((e) => !e);
                }}
              >
                Edit Text
                <FontAwesomeIcon id="icon" icon={faEdit} />
              </button>

              <button
                className="btn btn-success mt-3"
                onClick={() => {
                  setDrag((d) => !d);
                }}
              >
                Edit Position
                <FontAwesomeIcon id="icon" icon={faExchangeAlt} />
              </button>

              <button className="btn btn-success mt-3" onClick={getLatestNews}>
                Latest News
                <FontAwesomeIcon id="icon" icon={faNewspaper} />
              </button>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
}
