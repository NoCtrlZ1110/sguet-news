/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import BannerSVGAnim from "./component/BannerSVGAnim";
import { Form, Modal, Button, Table } from "antd";
import Search from "antd/lib/input/Search";
import { NEWS } from "../../const";

const validateMessages = {
  required: "URL cần được nhập!",
  types: {
    url: "Đây không phải là một đường dẫn URL hợp lệ!",
  },
};

const Banner = (props) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    if (props.callback) props.callback(e.url);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      key: "url",
      render: (text, record) => (
        <Button
          onClick={() => {
            setVisible(false);
            handleSubmit({ url: record.url });
          }}
        >
          Select
        </Button>
      ),
    },
  ];

  const fetchData = async () => {
    fetch(NEWS)
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then(
        (result) => {
          let arr = [];
          result.forEach((e) => {
            arr.push({ title: e.title, url: e.buttons[0].url });
          });
          setNews(arr);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <>
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
              <Search
                loading={loading}
                className="mt-4"
                color="#ffffff"
                size="large"
                enterButton={<Button>Latest 💗</Button>}
                onSearch={() => {
                  setVisible(true);
                }}
                placeholder="https://uet.vnu.edu.vn/..."
              ></Search>
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
      <Modal
        title="List of latest news"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Table
          dataSource={news}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </>
  );
};

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
