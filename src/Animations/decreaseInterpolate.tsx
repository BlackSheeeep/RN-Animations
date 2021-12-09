import Animated from './Animated';

export default function ({fromValue, toValue}: {fromValue: number, toValue: number}) {
    const animatedValue: Animated.Value = new Animated.Value(fromValue < toValue ? fromValue : toValue);
    if(fromValue < toValue) {
        return {fromValue, toValue, animatedValue, interpolated: animatedValue.interpolate({
            inputRange: [fromValue, toValue],
            outputRange: [fromValue, toValue]
            })};
    }
    else {
        return {
            fromValue: toValue,
            toValue: fromValue,
            interpolated: animatedValue.interpolate({
            inputRange: [toValue, fromValue],
            outputRange: [fromValue, toValue]
            }),
            animatedValue
        }
    }
}