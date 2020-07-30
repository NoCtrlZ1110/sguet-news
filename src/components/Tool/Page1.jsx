/* eslint-disable jsx-a11y/accessible-emoji */

import React from "react";
import PropTypes from "prop-types";
import Parallax from "rc-scroll-anim/lib/ScrollParallax";

class Page1 extends React.PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <>
        {!this.props.isMobile ? (
          <>
            <div className="home-page page1">
              <div className="home-page-wrapper" id="page1-wrapper">
                <Parallax
                  className="page1-bg"
                  animation={{
                    translateY: 0,
                    ease: "linear",
                    playScale: [0, 1.65],
                  }}
                  location="page1-wrapper"
                >
                  <h2>
                    💗 <span>SGUET</span> 💗
                  </h2>
                  SGUET
                </Parallax>

                <div className="title-line-wrapper page1-line">
                  <div className="title-line" />
                </div>
              </div>
            </div>{" "}
          </>
        ) : (
          <br />
        )}
      </>
    );
  }
}

export default Page1;
