import AnimatedComponent from "../AnimatedComponent";
import React, { useImperativeHandle, useRef, useMemo } from "react";
import Animated from "../Animated";
import decreaseInterpolate from '../decreaseInterpolate';
export default React.forwardRef(function FadeAnimation(
  props: any,
  ref
) {
  const __ref = useRef({});

  const { fromValue, style = {},rotateCenter = 'z',toValue, ...others  } = props;
  useImperativeHandle(
    ref,
    () => {
      // 继承AnimatedComponent中的方法，这里可以重写或者添加新方法。
      return Object.create(__ref.current);
    },
    [__ref.current]
  );
  const {animatedValue, fromValue: from, toValue: to} = useMemo(() => decreaseInterpolate({fromValue,toValue}), [
    fromValue
  ]);
  const rotate = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [from, to],
        outputRange: [fromValue + "deg", props.toValue + "deg"]
      }),
    [animatedValue]
  );
  const _style = useMemo(
    () => ({
      ...style,
      transform: [
        {
          ["rotate" + rotateCenter.toUpperCase()]: rotate,
          
        }
      ]
    }),
    [rotate, rotateCenter]
  );
  return (
    <AnimatedComponent
      {...others}
      ref={__ref}
      toValue={to}
      animation={Animated.timing}
      animatedValue={animatedValue}
      style={_style}
    >
      {props.children}
    </AnimatedComponent>
  );
});
