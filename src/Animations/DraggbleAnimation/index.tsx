import AnimatedComponent from "../AnimatedComponent";
import React, { useImperativeHandle, useRef, useMemo,useState } from "react";
import Animated from "../Animated";
// @ts-ignore
import {PanResponder, Easing} from'react-native';
export default React.forwardRef(function FadeAnimation(
  props: any,
  ref
) {
  const { style = {}, velocity = .01, bezier = [0.02,0.95, 0.54, 1],...others } = props;
  const __ref = useRef({});
  const [pan, setPan] = useState(new Animated.ValueXY());
  const _isAnimating = useRef<number | null>(null);
  const _position = useRef({dx: 0, dy: 0});
  const _startTime = useRef(Date.now());
  function stopAnimation () {
    if(_isAnimating.current)
      cancelAnimationFrame(_isAnimating.current);
      _isAnimating.current = null;
      pan.x.setValue(_position.current.dx);
      pan.y.setValue(_position.current.dy);
      pan.flattenOffset();
  }
  function startAnimation(count) {
    pan.x.setValue(_position.current.dx * Easing.bezier(...bezier)(Math.min(count * velocity, 1)));
    pan.y.setValue(_position.current.dy * Easing.bezier(...bezier)(Math.min(count * velocity, 1)));
    _isAnimating.current = requestAnimationFrame(() => startAnimation(count+1));
  }
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: (e,gestureState) => {
        _position.current.dx = gestureState.dx;
        _position.current.dy = gestureState.dy;
        if(_isAnimating.current) {
          return;
        }
        _startTime.current = Date.now();
        startAnimation(0);
      },
      onPanResponderRelease: () => {
        stopAnimation();
      }
    })
  ).current;

  useImperativeHandle(
    ref,
    () => {
      // 继承AnimatedComponent中的方法，这里可以重写或者添加新方法。
      return Object.create(__ref.current);
    },
    [__ref.current]
  );
  const _style = useMemo(
    () => ({
      ...style,
      position: 'absolute',
      transform: [
        {
          translateX:pan.x
        },{
          translateY: pan.y
        }
      ]
      // left: pan.x,
      // top: pan.y
    }),
    [pan]
  );
  const _temp = useRef(Animated.timing(new Animated.Value(0),{
    toValue: 1
  })).current;
  const animation = useMemo(() => {
    return () => {
      const ret: any = {};
      const keys = Object.keys(_temp);
      keys.forEach(key => {
        if(typeof _temp[key] === 'function') {
          ret[key] = () => {}
        }
      })
      ret.reset = () => {
        setPan(new Animated.ValueXY());
      }
      return ret;
    }
  },[pan])
  return (
    <AnimatedComponent
      {...others}
      {...panResponder.panHandlers}
      ref={__ref}
      animation={animation}
      animatedValue={pan}
      style={_style}
    >
      {props.children}
    </AnimatedComponent>
  );
});
