import React from "react";
import Background from "./components/background/background";
import Title from "./components/title/title";
import Subtitle from "./components/subtitle/subtitle";
import "./App.css";

const image =
  "https://images.unsplash.com/photo-1555448248-2571daf6344b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Background image={image}>
          <Title text="Nguyễn Văn Huy" />
          <Subtitle text="A little boy trying to code a website" />
        </Background>
      </header>
    </div>
  );
}

export default App;
