import AnimatedComponent from "../AnimatedComponent";
import React, { useImperativeHandle, useRef, useMemo } from "react";
import Animated from "../Animated";
import { decreaseInterpolateXY } from "../decreaseInterpolate";
export default React.forwardRef(function FadeAnimation(props: any, ref) {
  const __ref = useRef({});

  const {
    fromValue: _fromValue,
    toValue: _toValue,
    style = {},
    ...others
  }: any = props;
  useImperativeHandle(
    ref,
    () => {
      // 继承AnimatedComponent中的方法，这里可以重写或者添加新方法。
      return Object.create(__ref.current);
    },
    [__ref.current]
  );

  const {
    fromValue,
    toValue,
    animatedValue,
    interpolatedX,
    interpolatedY
  } = useMemo(() => {
    return decreaseInterpolateXY({ fromValue: _fromValue, toValue: _toValue });
  }, [_fromValue, _toValue]);
  const _style = useMemo(
    () => ({
      ...style,
      transform: [
        {
          translateX: interpolatedX
        },
        {
          translateY: interpolatedY
        }
      ]
    }),
    [interpolatedX, interpolatedY]
  );

  return (
    <AnimatedComponent
      {...others}
      toValue={toValue}
      ref={__ref}
      animation={Animated.timing}
      animatedValue={animatedValue}
      style={_style}
    >
      {props.children}
    </AnimatedComponent>
  );
});
