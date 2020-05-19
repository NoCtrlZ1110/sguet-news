import React, { useState, useEffect } from "react";
import Background from "./components/background/background";
import Title from "./components/title/title";
import Subtitle from "./components/subtitle/subtitle";
import { saveAs } from "file-saver";
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
  const [content, setContent] = useState(
    `\tPhòng Đào tạo (ĐT) xin gửi đến các đơn vị Dự kiến Lịch thi học kỳ II, năm học 2019-2020 của các lớp đại học hệ chính quy, đề nghị Lãnh đạo đơn vị thông báo cho cán bộ thuộc đơn vị mình quản lý và mời giảng: nếu cần đề nghị thay đổi về thời gian, hình thức thi,… thì liên hệ trực tiếp với chuyên viên Nguyễn Thị Thu Thảo, Phòng ĐT (024. 37547865, * thaontt@vnu.edu.vn) trước ngày 20/05/2020. \n\n\tCác sinh viên cần xem kỹ Dự kiến lịch thi, nếu có vướng mắc cần viết Giấy đề nghị cụ thể và nộp cho Bộ phận tiếp người học (P.104-E3). Sinh viên phải trình Thẻ sinh viên mới được dự thi, sinh viên nào chưa có, bị mất hoặc hỏng Thẻ sinh viên phải đến bộ phận tiếp người học làm thủ tục xin cấp lại.Mọi đề nghị sau ngày 20/05/2020 sẽ không được giải quyết.`
  );

  useEffect(() => {});

  function getLatestNews() {
    fetch("https://noctrlz.herokuapp.com/SGUET/latest")
      .then((response) => response.json())
      .then((data) => setText(data.title));
  }

  function downloadHandler(event) {
    event.preventDefault();
    html2canvas(document.getElementById("NoCtrlZ"), {
      scale: 2,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
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
                    <Title text="Thông Báo" size={60} />
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
                <BodyArea title={text.toUpperCase()} content={content} />
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
