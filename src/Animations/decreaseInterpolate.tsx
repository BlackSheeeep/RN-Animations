import Animated from "./Animated";

export const decreaseInterpolate = function ({
  fromValue,
  toValue
}: {
  fromValue: number;
  toValue: number;
}) {
  const animatedValue: Animated.Value = new Animated.Value(
    fromValue < toValue ? fromValue : toValue
  );
  if (fromValue < toValue) {
    return {
      fromValue,
      toValue,
      animatedValue,
      interpolated: animatedValue.interpolate({
        inputRange: [fromValue, toValue],
        outputRange: [fromValue, toValue]
      })
    };
  } else {
    return {
      fromValue: toValue,
      toValue: fromValue,
      interpolated: animatedValue.interpolate({
        inputRange: [toValue, fromValue],
        outputRange: [fromValue, toValue]
      }),
      animatedValue
    };
  }
};
export const decreaseInterpolateXY: (props: {
  fromValue: number[];
  toValue: number[];
}) => {
  toValue: any;
  fromValue: any;
  animatedValue: any;
  interpolatedX: any;
  interpolatedY: any;
} = function ({
  fromValue: _fromValue,
  toValue: _toValue
}: {
  fromValue: [number, number];
  toValue: [number, number];
}) {
  let reversed = false;
  const fromValue = [..._fromValue],
    toValue = [..._toValue];
  if (_fromValue[0] === _toValue[0]) {
    fromValue.reverse();
    toValue.reverse();
    reversed = true;
  }
  console.log("---", fromValue, toValue);
  const {
    interpolated: interpolatedX,
    animatedValue,
    fromValue: fromX,
    toValue: toX
  } = decreaseInterpolate({
    fromValue: fromValue[0],
    toValue: toValue[0]
  });
  console.log("---", fromX, toX);

  const interpolatedY = animatedValue.interpolate({
    inputRange: [fromX, toX],
    outputRange: [fromValue[1], toValue[1]]
  });
  if (reversed) {
    return {
      fromValue: fromValue[1],
      toValue: toValue[1],
      animatedValue,
      interpolatedX: interpolatedY,
      interpolatedY: interpolatedX
    };
  } else {
    return {
      fromValue: fromValue[0],
      toValue: toValue[0],
      animatedValue,
      interpolatedX,
      interpolatedY
    };
  }
};
