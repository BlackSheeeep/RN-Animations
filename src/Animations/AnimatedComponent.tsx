import Animated from "./Animated";
//@ts-ignore
import { Easing } from "react-native";
import React, {
  useImperativeHandle,
  useMemo,
  useEffect,
  useRef,
  useState
} from "react";
import getReverseAnimation from "./getReverseAnimation";
type EasingType = [string /*函数名*/] | Function;
function isCuryFunction(easingName): boolean {
  const curyMap = ["elastic", "in", "out", "inOut", "bezier"];
  return curyMap.indexOf(easingName) >= 0;
}
function getAnimatedConfig(props: any): any {
  const config = {};
  const others = {};
  const configMap = [
    "toValue",
    "listener",
    "useNativeDriver",
    "duration",
    "easing",
    "delay",
    "isInteraction",
    "friction",
    "tension",
    "speed",
    "bounciness",
    "velocity",
    "deceleration",
    "stiffness",
    "damping",
    "mass",
    "overshootClamping",
    "restDisplacementThreshold",
    "restSpeedThreshold"
  ];
  for (const id in props) {
    if (configMap.indexOf(id) >= 0) {
      config[id] = props[id];
    } else {
      others[id] = props[id];
    }
  }
  return [config, others];
}
export default React.memo(
  React.forwardRef(function (props: any, ref) {
    const {
      children = null,
      autoStart = true,
      onAnimationStart = () => {},
      onAnimationEnd = () => {},
      onAnimatedValueChanged = () => {},
      animatedValue,
      iterations = -1,
      resetBeforeIteration = true,
      autoBack = false,
      loop,
      ...others
    } = props;
    const [config, extothers]: any = getAnimatedConfig(others);

    const {
      easing,
      duration = 0,
      useNativeDriver = false,
      ...otherConfig
    }: { [key: string]: any; easing: EasingType | undefined } = config;
    let _easing: any = undefined;
    if (Array.isArray(easing) && easing.length > 0) {
      const key = easing[0];
      const params = easing.filter((item, index) => index > 0);
      if (Easing[key] && typeof Easing[key] === "function") {
        if (isCuryFunction(Easing[key])) {
          _easing = Easing[key](...params);
        } else {
          _easing = Easing[key];
        }
      }
    } else if (typeof easing === "function") {
      _easing = easing;
    }
    const _config: any = {
      ...otherConfig,
      duration,
      easing: _easing,
      useNativeDriver
    };
    const _animation = props.animation || Animated.timing;
    const animation = useMemo(() => {
      const a = _animation(animatedValue, _config);
      return a;
    }, [_animation, animatedValue]);
    const reverseAnimation = useMemo(() => {
      return getReverseAnimation({
        animatedValue,
        config: _config,
        initAnimation: _animation
      });
    }, [animation]);
    const __reverseStart = function (cb?) {
      reverseAnimation.start(() => {
        cb && cb();
      });
    };
    const __reverseStop = function () {
      reverseAnimation.stop();
    };
    const __start = function (cb?) {
      animation.start(() => {
        autoBack && !loop && reverseAnimation.start();
        onAnimationEnd();
        cb && cb();
      });
      onAnimationStart();
    };
    const __stop = function () {
      animation.stop();
    };
    const __reset = function () {
      animation.reset();
      reverseAnimation.reset();
    };
    const loopedAnimation = useMemo(
      () => Animated.loop(animation, { iterations, resetBeforeIteration }),
      [animation]
    );
    const __loop = function () {
      loopedAnimation.start();
    };
    useImperativeHandle(
      ref,
      () => {
        const ret: any = {
          start(cb: () => void) {
            __start(cb);
          },
          stop() {
            __stop();
          },
          reset() {
            __reset();
          },
          reverseStart(cb?) {
            __reverseStart(cb);
          },
          reverseStop() {
            __reverseStop();
          },
          getAnimation() {
            return animation;
          },
          getAnimatedValue() {
            return animatedValue;
          },
          getReverseAnimation() {
            return reverseAnimation;
          }
        };
        return ret;
      },
      [_animation, animation]
    );
    useEffect(() => {
      autoStart && !loop && __start();
      loop && __loop();
      animatedValue.addListener(onAnimatedValueChanged);
      return () => {
        animatedValue.removeAllListeners();
      };
    }, []);
    const AnimatedComponent = props.animatedCompt || Animated.View;
    return <AnimatedComponent {...extothers}>{children}</AnimatedComponent>;
  }),
  (prev, next) => {
    if (Object.keys(prev).every((key) => prev[key] === next[key])) {
      return true;
    }
    return false;
  }
);
