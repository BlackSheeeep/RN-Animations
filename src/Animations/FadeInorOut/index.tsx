import AnimatedComponent from "../AnimatedComponent";
import React, { useImperativeHandle, useRef, useMemo } from "react";
import Animated from "../Animated";
export default React.forwardRef(function FadeAnimation(
  props: any,
  ref
) {
  const __ref = useRef({});

  const { fromValue, style = {}, ...others } = props;
  useImperativeHandle(
    ref,
    () => {
      // 继承AnimatedComponent中的方法，这里可以重写或者添加新方法。
      return Object.create(__ref.current);
    },
    [__ref.current]
  );
  const animatedValue = useRef(new Animated.Value(fromValue)).current;
  const _style = useMemo(
    () => ({
      ...style,
      opacity: animatedValue
    }),
    [animatedValue]
  );
  return (
    <AnimatedComponent
      {...others}
      ref={__ref}
      animation={Animated.timing}
      animatedValue={animatedValue}
      style={_style}
    >
      {props.children}
    </AnimatedComponent>
  );
});
