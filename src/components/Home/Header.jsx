/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Row, Col, Menu, Button, Popover } from "antd";
import Icon from "@ant-design/icons";
import { enquireScreen } from "enquire-js";

const LOGO_URL =
  "https://pbs.twimg.com/profile_images/446341618107305984/KCiLUHdh.png";

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: "horizontal",
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ menuMode: b ? "inline" : "horizontal" });
    });
  }

  render() {
    const { menuMode, menuVisible } = this.state;

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="home">
          <a>Home</a>
        </Menu.Item>
        <Menu.Item key="main">
          <a>
            <span>Generator</span>
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div id="header" className="header">
        {menuMode === "inline" ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <div id="logo" to="/">
              <img src={LOGO_URL} alt="logo" />
              <span>SUPPORT GROUP UET</span>
            </div>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              <div id="preview">
                <a
                  id="preview-button"
                  target="_blank"
                  href="#"
                  rel="noopener noreferrer"
                >
                  <Button icon="eye-o">About</Button>
                </a>
              </div>
              {menuMode === "horizontal" ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
