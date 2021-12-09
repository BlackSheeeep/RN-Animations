import "./styles.css";
import DemoView from "./DemoView";
import React, { useState, useRef, useMemo } from "react";
import LeftMenuBar from "./LeftMenuBar";
import animations from "./animationsConfig";
const names = Object.keys(animations);
const defaultItem = animations[names[0]];
export default function App() {
  const [item, setItem] = useState(defaultItem);
  const aref = useRef(null);
  function onMenuItemClick(newitem, index) {
    console.log("ok");
    setItem(newitem);
  }
  const currProps = useMemo(() => ({ ...item.defaultProps }), [
    item.defaultProps
  ]);
  const replayAnimation = () => {
    if (!aref.current) return;
    // @ts-ignore
    aref.current.resetAnimation(currProps);
    // // @ts-ignore
    // aref.current.reset && aref.current.reset();
    // // @ts-ignore
    // aref.current.start && aref.current.start();
  };
  const onSettingChange = (name, value) => {
    if (typeof value === "object") {
      console.log(value);
    }
    // @ts-ignore
    aref.current.updateCode();
    currProps[name] = value;
  };
  return (
    <div className="App">
      <LeftMenuBar onMenuItemClick={onMenuItemClick} />
      <DemoView
      // @ts-ignore
        currProps={currProps}
        replayAnimation={replayAnimation}
        ref={aref}
        onSettingChange={onSettingChange}
        item={item}
      />
    </div>
  );
}
