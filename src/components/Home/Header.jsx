/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Row, Col, Menu, Button, Popover, Modal } from "antd";
import Icon from "@ant-design/icons";
import { enquireScreen } from "enquire-js";

const LOGO_URL =
  "https://pbs.twimg.com/profile_images/446341618107305984/KCiLUHdh.png";

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: "horizontal",
    modalAbout: false,
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ menuMode: b ? "inline" : "horizontal" });
    });
  }

  closeModal() {
    let modalAbout = false;
    this.setState({ modalAbout });
  }

  render() {
    const { menuMode, menuVisible } = this.state;

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="home">
          <a href="/">Home</a>
        </Menu.Item>

        <Menu.Item key="main">
          <a href="/#/tool">
            <span>Generator</span>
          </a>
        </Menu.Item>
        <Menu.Item key="SGUET">
          <a href="https://www.facebook.com/SupportGroupUET/">SGUET</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <>
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
              <a href="/">
                <div id="logo" to="/">
                  <img src={LOGO_URL} alt="logo" />
                  <>
                    <b>SUPPORT GROUP UET</b>
                  </>
                </div>
              </a>
            </Col>
            <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
              <div className="header-meta">
                <div id="preview">
                  <Button
                    onClick={() => {
                      let modalAbout = true;
                      this.setState({ modalAbout });
                    }}
                  >
                    About
                  </Button>
                </div>
                {menuMode === "horizontal" ? <div id="menu">{menu}</div> : null}
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          title={<div className="text-center">About this project 😎</div>}
          centered
          visible={this.state.modalAbout}
          onOk={() => this.closeModal()}
          onCancel={() => this.closeModal()}
          footer={[
            <div className="text-center">
              <Button
                key="submit"
                type="dashed"
                onClick={() =>
                  window.open(
                    "https://github.com/NoCtrlZ1110/sguet-news",
                    "_blank"
                  )
                }
              >
                Star ⭐
              </Button>
              <Button
                key="submit"
                type="dashed"
                onClick={() => this.closeModal()}
              >
                🥰🥰🥰
              </Button>
            </div>,
          ]}
        >
          <div className="text-center">
            <p>❤ A small gift for my #SGUET ❤</p>
            <p>Developed by: Nguyễn Văn Huy</p>
            <p>01/08/2020</p>
          </div>
        </Modal>
      </>
    );
  }
}

export default Header;
