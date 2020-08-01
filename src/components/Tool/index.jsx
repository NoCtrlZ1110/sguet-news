import axios from "axios";
import React, { useEffect, useState } from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";
import PageHeader from "../Home/Header";
import Banner from "./Banner";
import Page1 from "./Page1";
import PageFooter from "../Home/Footer";
import ModalContainer from "./Modal";
import SquareLoader from "react-spinners/PacmanLoader";
import LoadingOverlay from "react-loading-overlay";
import Crawler from "crawler";
import { css } from "@emotion/core";
import { PROXY, UET, API, TOKEN } from "../../const";
import { Card, Layout } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../Home/static/style";

const { Sider, Content } = Layout;

export const Tool = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [title, setTitle] = useState(null);
  const [capture, setCapture] = useState(null);
  const [status, setStatus] = useState(null);
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    enquireScreen((b) => {
      setMobile(!!b);
    });
  }, []);

  const callback = (url) => {
    setLoading(true);
    setSuccess(true);

    fetchData(url);
  };

  const fetchData = (url) => {
    setStatus("Fetching Data ...");
    new Crawler({
      maxConnections: 10,
      callback: function (error, res, done) {
        getScrnsht(url);
        if (error) {
          console.log(error);
          setSuccess(false);
        } else {
          var $ = res.$;
          setTitle($("title").text().replace(UET, ""));
        }
        done();
      },
    }).queue(PROXY + url);
  };

  const getScrnsht = (link) => {
    setStatus("Taking Screenshot ...");
    axios
      .get(`${API}${link}&token=${TOKEN}`)
      .then((res) => {
        setVisible(true);
        setLoading(false);

        setCapture(res.data.screenshot);
      })
      .catch((err) => {
        console.log("Lỗiii:" + err);
        setSuccess(false);
      });
  };

  return (
    <>
      <DocumentTitle title="UETNews Generator">
        <div>
          <LoadingOverlay
            active={loading}
            spinner={
              <div>
                <SquareLoader
                  css={css`
                    display: block;
                    margin-bottom: 100px;
                  `}
                  color={"#ffffff"}
                  loading={loading}
                />
                {status ? status : ""}
                <br />
                <br />
                <br />
                <br />
              </div>
            }
          >
            <PageHeader isMobile={isMobile} />
            <div className="home-wrapper">
              <Banner isMobile={isMobile} callback={callback} />
            </div>
            <Page1 isMobile={isMobile} />

            <PageFooter />
          </LoadingOverlay>
        </div>
      </DocumentTitle>
      <ModalContainer
        visible={visible}
        setVisible={setVisible}
        title={success ? "Data fetched successfully!" : "Data fetched failed!"}
        success={success}
        callback={(setLoading) => {
          setLoading(true);
          localStorage.setItem("title", title);
          localStorage.setItem("capture", capture);
          setTimeout(() => {
            setLoading(false);
            setVisible(false);
            window.location.href = "/#/view/";
          }, 1000);
        }}
      >
        {success ? (
          <div>
            <Layout style={{ alignSelf: "center" }}>
              <Sider theme="light">
                <img
                  className="mr-4"
                  src="https://media1.tenor.com/images/1b0948cd2ae915af0293e4641c441b09/tenor.gif"
                  width="75%"
                  alt="thành cmn công :>"
                />
              </Sider>
              <Content style={{ alignSelf: "center" }}>
                {capture ? (
                  <img src={capture} alt="capture" width="300px"></img>
                ) : null}
              </Content>
            </Layout>
            <Card className="mt-4">
              <b>Title to render (you can change it)</b>
              <TextArea
                className="mt-3"
                name="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Card>
          </div>
        ) : (
          <>
            <h4>Failed, try again!</h4>
            <img
              className="mr-4"
              src="https://media1.tenor.com/images/9467bbf064b80e9065cdf10b26cbae5b/tenor.gif"
              width="75%"
              alt="sao lại fail nhở, khó hiểu vch :(("
            />
          </>
        )}
      </ModalContainer>
    </>
  );
};

export default Tool;
