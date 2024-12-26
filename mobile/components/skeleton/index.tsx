import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ISkeletonProps {
  /**
   * Custom style for the Skeleton component.
   * Accepts styles for a `View`, such as dimensions, colors, borders, etc.
   * Can include animated values if needed.
   */
  style: StyleProp<ViewStyle>;
}

/**
 * Skeleton Component.
 *
 * This component is used as a placeholder while the actual content is loading.
 *
 * @param {SkeletonProps} props - The component's properties.
 * @param {StyleProp<ViewStyle>} [props.style] - Custom styles for the skeleton.
 * @returns {JSX.Element} A view component styled as a skeleton placeholder.
 */
const Skeleton: React.FC<ISkeletonProps> = ({ style }) => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, [shimmerValue]);

  const backgroundColor = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#f5f5f5'],
  });

  return (
    <Animated.View style={[style, styles.skeleton, { backgroundColor }]} />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
});

export { Skeleton };
