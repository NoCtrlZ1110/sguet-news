/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import PropTypes from "prop-types";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import BannerSVGAnim from "./component/BannerSVGAnim";
import { Form, Input, Button } from "antd";

const validateMessages = {
  required: "URL cần được nhập!",
  types: {
    url: "Đây không phải là một đường dẫn URL hợp lệ!",
  },
};

function Banner(props) {
  const handleSubmit = (e) => {
    if (props.callback) props.callback(e.url);
  };

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
          Enter ↵
          <br /> UET Link Here!
        </h1>
        <p key="content">From #NoCtrlZ with love 🥰</p>

        <Form
          name="nest-messages"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["url"]}
            rules={[
              {
                required: true,
                type: "url",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (
                    !value ||
                    getFieldValue("url")
                      .toString()
                      .toLowerCase()
                      .indexOf("uet.vnu.edu.vn") !== -1
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Đây không phải đường dẫn của website UET"
                  );
                },
              }),
            ]}
          >
            <Input
              className="mt-4"
              size="large"
              placeholder="https://uet.vnu.edu.vn/..."
            ></Input>
          </Form.Item>

          <Form.Item>
            <Button type="primary" className="mt-4" htmlType="submit" danger>
              Get Data!
            </Button>
          </Form.Item>
        </Form>
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
