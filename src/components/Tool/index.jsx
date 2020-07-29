import React from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";

import Header from "../Home/Header";
import Banner from "./Banner";
import Page1 from "./Page1";
import Footer from "../Home/Footer";
import View from "../view/View";
import "../Home/static/style";

let isMobile;

enquireScreen((b) => {
  isMobile = b;
});

class Tool extends React.PureComponent {
  state = {
    isMobile,
  };
  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  render() {
    return (
      <DocumentTitle title="UETNews Generator">
        <div>
          <Header isMobile={this.state.isMobile} />
          <div className="home-wrapper">
            <Banner isMobile={this.state.isMobile} />
            <Page1 isMobile={this.state.isMobile} />
          </div>
          <View />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default Tool;
