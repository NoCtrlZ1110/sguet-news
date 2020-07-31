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
  const [isMobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [title, setTitle] = useState(null);
  const [capture, setCapture] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isGotData, setIsGotData] = useState(false);

  useEffect(() => {
    enquireScreen((b) => {
      setMobile(!!b);
    });
  }, []);

  const callback = (url) => {
    setLoading(true);
    setSuccess(true);
    getScrnsht(url);
    fetchData(url);
  };

  const fetchData = async (url) => {
    new Crawler({
      maxConnections: 10,
      callback: function (error, res, done) {
        console.log(isCaptured);
        setIsGotData(true);
        // if (isCaptured) {
        setVisible(true);
        setLoading(false);
        // }
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
    axios
      .get(`${API}${link}&token=${TOKEN}`)
      .then((res) => {
        setIsCaptured(true);
        if (isGotData) {
          setVisible(true);
          setLoading(false);
        }
        setCapture(res.data.screenshot);
      })
      .catch((err) => {
        console.log("Lỗiii:" + err);
        setIsCaptured(true);
        setSuccess(false);
        console.log(isCaptured);
      });
  };

  return (
    <>
      <DocumentTitle title="UETNews Generator">
        <div>
          <LoadingOverlay
            active={loading}
            // spinner={}
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
                {!isGotData ? <span>Fetching Data</span> : ""}
                {!isCaptured ? <span>Taking Screenshot</span> : ""}
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
            window.location.href = "/view";
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
            <Card autoSize className="mt-4">
              <b>
                <TextArea
                  name="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </b>
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
