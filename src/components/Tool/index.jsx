import React, { useEffect, useState } from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";
import Header from "../Home/Header";
import Banner from "./Banner";
import Page1 from "./Page1";
import Footer from "../Home/Footer";
import ModalContainer from "./Modal";
import "../Home/static/style";
import { css } from "@emotion/core";
import SquareLoader from "react-spinners/PacmanLoader";
import LoadingOverlay from "react-loading-overlay";
import { Col, Row } from "antd";
// import View from "../view/View";

export const Tool = () => {
  const [isMobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    enquireScreen((b) => {
      setMobile(!!b);
    });
  }, []);

  const callback = (url) => {
    setLoading(true);
    fetchData(url);
  };

  const fetchData = async (url) => {
    setTimeout(() => {
      setVisible(true);
      setLoading(false);
    }, 3000);
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
                <span>Fetching Data</span>
              </div>
            }
          >
            <Header isMobile={isMobile} />
            <div className="home-wrapper">
              <Banner isMobile={isMobile} callback={callback} />
            </div>
            <Page1 isMobile={isMobile} />

            <Footer />
          </LoadingOverlay>
        </div>
      </DocumentTitle>
      <ModalContainer
        visible={visible}
        setVisible={setVisible}
        title={success ? "Data fetched successfully!" : "Data fetched failed!"}
      >
        {success ? (
          <div>
            <Row>
              <Col>
                <img
                  src="https://media1.tenor.com/images/1b0948cd2ae915af0293e4641c441b09/tenor.gif"
                  width="50%"
                ></img>
              </Col>
              <Col>Information Here</Col>
            </Row>
          </div>
        ) : (
          "Failed, try again!"
        )}
      </ModalContainer>
    </>
  );
};

export default Tool;
