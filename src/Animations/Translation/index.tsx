import AnimatedComponent from "../AnimatedComponent";
import React, {
  useImperativeHandle,
  useRef,
  useMemo,
  useCallback
} from "react";
import Animated from "../Animated";
import interpolate from '../decreaseInterpolate'
export default React.forwardRef(function FadeAnimation(
  props: any,
  ref
) {
  const __ref = useRef({});

  const {
    fromValue,
    toValue,
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
  const {fromValue: fromX, toValue: toX, animatedValue, interpolated} = useMemo(() => {
    return interpolate({fromValue: fromValue[0], toValue: toValue[0]});
  }
  ,[fromValue,toValue]);
  const animatedY = useMemo(() => {
      return animatedValue.interpolate({
        inputRange:[fromX, toX],
        outputRange: [fromValue[1], toValue[1]]
      })
  }, [animatedValue]);
  const _style = useMemo(
    () => ({
      ...style,
      transform: [
        {
          translateX: interpolated
        },{
          translateY: animatedY
        }
      ]
    }),
    [animatedValue]
  );
  // const animationFunc = useCallback((val, configs) => {
  //   const { toValue } = configs;
  //   if (Array.isArray(toValue)) {
  //     return Animated.timing(val, {
  //       ...configs,
  //       toValue: toValue[0]
  //     });
  //   } else {
  //     return Animated.timing(val, configs);
  //   }
  // }, []);
  if(!(Array.isArray(fromValue) && Array.isArray(toValue)) || fromValue.length !== 2 || toValue.length !==2)return null;

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
