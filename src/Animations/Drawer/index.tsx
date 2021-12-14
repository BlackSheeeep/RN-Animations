import AnimatedComponent from "../AnimatedComponent";
import React, { useImperativeHandle, useRef, useMemo, useEffect } from "react";
import Animated from "../Animated";
// @ts-ignore
import { Dimensions } from "react-native";
const WINDOW = Dimensions.get("window");
export default React.forwardRef(function FadeAnimation(props: any, ref) {
  const __ref = useRef({});
  const DEFAULT_HEIGHT = WINDOW.height * 0.76;
  const DEFAULT_WIDTH = WINDOW.width;
  const {
    style = {},
    fromDirection = "bottom",
    height = DEFAULT_HEIGHT,
    width = DEFAULT_WIDTH,
    ...others
  } = props;
  let toValue = 0;

  useImperativeHandle(
    ref,
    () => {
      const ret = Object.create(__ref.current);
      // 继承AnimatedComponent中的方法，这里可以重写或者添加新方法。
      return ret;
    },
    [__ref.current]
  );
  const animatedValue = useMemo(() => {
    switch (fromDirection) {
      case "bottom":
        toValue = 0;
        return new Animated.Value(-height);
      case "top":
        toValue = 0;
        return new Animated.Value(-height);
      case "left":
        toValue = 0;
        return new Animated.Value(-width);
      case "right":
        toValue = 0;
        return new Animated.Value(-width);
    }
  }, [fromDirection, height, width]);
  const _style = useMemo(
    () => ({
      ...style,
      position: "absolute",
      height,
      width,
      backgroundColor: style.backgroundColor
        ? style.backgroundColor
        : "#ffffff",
      [fromDirection]: animatedValue
    }),
    [animatedValue]
  );
  return (
    <AnimatedComponent
      {...others}
      ref={__ref}
      toValue={toValue}
      animation={Animated.timing}
      animatedValue={animatedValue}
      style={_style}
    >
      {props.children}
    </AnimatedComponent>
  );
});
