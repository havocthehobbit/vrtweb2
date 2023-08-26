import { useRete } from "./rete";
import { useRef } from "react";

import "./styles.css";

export const RetejsEditor=(props)=>{
  const [setContainer] = useRete();

  return (
    <div
      key={props.key}
      style={{
        width: "100vw",
        height: "100vh"
      }}
      ref={(ref) => ref && setContainer(ref)}
    />
  );
}