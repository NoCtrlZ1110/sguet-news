import React from "react";
import Background from "../background/background";

import BodyArea2 from "../bodyArea2/BodyArea2";
import { Grid } from "gymnast";

export default function Style2(props) {
  return (
    <>
      <Background size={props.size} image={props.image}>
        <Grid size={5} margin={2}></Grid>

        <BodyArea2
          title={props.text.toUpperCase()}
          content={props.content}
          font="Niramit"
          size={props.size}
          drag={props.drag}
          edit={props.edit}
        />

        {/* <Subtitle className="middle" text="--- from #sguet with love ---" /> */}
      </Background>
    </>
  );
}
