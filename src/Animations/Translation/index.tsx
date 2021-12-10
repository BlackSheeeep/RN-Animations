import AnimatedComponent from "../AnimatedComponent";
import React, { useImperativeHandle, useRef, useMemo } from "react";
import Animated from "../Animated";
import decreaseInterpolate from "../decreaseInterpolate";
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
  const fromValue = [..._fromValue],
    toValue = [..._toValue];
  // 如果x值不变就互换x和y，防止fromX和toX相等而y不等时动画不执行。
  if (fromValue[0] === toValue[0]) {
    fromValue.reverse();
    toValue.reverse();
  }
  const {
    fromValue: fromX,
    toValue: toX,
    animatedValue,
    interpolated
  } = useMemo(() => {
    // animated的fromValue和toValue不支持递减值，这里处理一下，保证from和to是递增的
    return decreaseInterpolate({
      fromValue: fromValue[0],
      toValue: toValue[0]
    });
  }, [fromValue, toValue]);
  const animatedY = useMemo(() => {
    return animatedValue.interpolate({
      inputRange: [fromX, toX],
      outputRange: [fromValue[1], toValue[1]]
    });
  }, [animatedValue, fromX, toX]);
  const _style = useMemo(
    () => ({
      ...style,
      transform: [
        {
          // translatex和translatey必须要这样分开写，否则动画只会作用在x或y上
          translateX: interpolated
        },
        {
          translateY: animatedY
        }
      ]
    }),
    [animatedValue]
  );
  if (
    !(Array.isArray(fromValue) && Array.isArray(toValue)) ||
    fromValue.length !== 2 ||
    toValue.length !== 2
  )
    return null;

  return (
    <AnimatedComponent
      {...others}
      toValue={toX}
      ref={__ref}
      animation={Animated.timing}
      animatedValue={animatedValue}
      style={_style}
    >
      {props.children}
    </AnimatedComponent>
  );
});
