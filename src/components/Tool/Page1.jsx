import React from "react";
import PropTypes from "prop-types";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import Parallax from "rc-scroll-anim/lib/ScrollParallax";
import QueueAnim from "rc-queue-anim";

class Page1 extends React.PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };

  render() {
    let children = [[], [], []];

    children.push();

    children = children.map((item, i) => (
      <QueueAnim
        className="page1-box-wrapper"
        key={i.toString()}
        type="bottom"
        leaveReverse
        delay={[i * 100, (children.length - 1 - i) * 100]}
        component="ul"
      >
        {item}
      </QueueAnim>
    ));
    return (
      <div className="home-page page1">
        <div className="home-page-wrapper" id="page1-wrapper">
          {!this.props.isMobile && (
            <Parallax
              className="page1-bg"
              animation={{
                translateY: 200,
                ease: "linear",
                playScale: [0, 1.65],
              }}
              location="page1-wrapper"
            >
              SGUET
            </Parallax>
          )}
          <h2>{/* What the <span>hell</span> can it do?{" "} */}</h2>
          <div className="title-line-wrapper page1-line">
            <div className="title-line" />
          </div>
          <OverPack>{children}</OverPack>
        </div>
      </div>
    );
  }
}

export default Page1;
