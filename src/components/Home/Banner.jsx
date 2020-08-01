/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import PropTypes from "prop-types";
import GitHubButton from "react-github-button";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Button } from "antd";
import BannerSVGAnim from "./component/BannerSVGAnim";
// import history from "../../services/history";

function Banner(props) {
  return (
    <div className="banner-wrapper">
      {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim
        className="banner-title-wrapper"
        type={props.isMobile ? "bottom" : "right"}
      >
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: "translateX(-64px)" }}
          />
        </div>
        <h1 key="h1">
          UETNEWS
          <br /> GENERATOR
        </h1>
        <p key="content">A small gift for my #SGUET 🥰</p>
        <div key="button" className="button-wrapper">
          <Button
            type="primary"
            onClick={() => (window.location.href = "/#/tool")}
          >
            Get Started
          </Button>

          <a href="https://github.com/NoCtrlZ1110/sguet-news/">
            <Button style={{ margin: "0 16px" }} type="primary" ghost>
              Source Code
            </Button>
          </a>
          <GitHubButton
            key="github-button"
            type="stargazers"
            namespace="NoCtrlZ1110"
            repo="sguet-news"
          />
        </div>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
