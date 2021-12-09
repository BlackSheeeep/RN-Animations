import AnimatedComponent from "../AnimatedComponent";
import React, { useImperativeHandle, useRef, useMemo,useState } from "react";
import Animated from "../Animated";
import decreaseInterpolate from "../decreaseInterpolate";
export default React.forwardRef(function FadeAnimation(
  props: any,
  ref
) {
  const __ref = useRef({});
  const { fromValue, toValue, style = {}, ...others } = props;
  useImperativeHandle(
    ref,
    () => {
      const ret = Object.create(__ref.current)
      // 继承AnimatedComponent中的方法，这里可以重写或者添加新方法。
      return ret;
    },
    [__ref.current]
  );
  const {animatedValue,interpolated: animatedX , fromValue: fromX, toValue: toX} = useMemo(() => decreaseInterpolate({fromValue:fromValue[0], toValue: toValue[0]}), [fromValue, toValue]);
  const animatedY = useMemo(()=>animatedX.interpolate({
      inputRange:[fromX, toX],
      outputRange: [fromValue[1], toValue[1]]
  }),[animatedX])
  const _style = useMemo(
    () => ({
      ...style,
      transform: [
          {
              scaleX: animatedX
          },
          {
              scaleY: animatedY
          }
      ]
    }),
    [animatedX]
  );
  return (
    <AnimatedComponent
      {...others}
      ref={__ref}
      toValue={toX}
      animation={Animated.timing}
      animatedValue={animatedValue}
      style={_style}
    >
      {props.children}
    </AnimatedComponent>
  );
});
