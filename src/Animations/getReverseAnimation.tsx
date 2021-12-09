export default function ({
    animatedValue,
    config,
    initAnimation
}) {
    const toValue = animatedValue._startingValue;
    return initAnimation(animatedValue,{...config, toValue});
}