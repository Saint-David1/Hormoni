import React, { useEffect, useId } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';
import { colors } from '../theme/tokens';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface RingProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0..1
  trackColor?: string;
  animate?: boolean;
  animationDuration?: number;
  children?: React.ReactNode;
}

export const Ring: React.FC<RingProps> = ({
  size,
  strokeWidth,
  progress,
  trackColor = colors.bgWash,
  animate = true,
  animationDuration = 900,
  children,
}) => {
  const gradientId = `ringGradient-${useId()}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const clampedProgress = Math.max(0, Math.min(1, progress));

  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    if (animate) {
      animatedProgress.value = withTiming(clampedProgress, {
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      animatedProgress.value = clampedProgress;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampedProgress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={size}
            y2={size}
          >
            <Stop offset="0" stopColor={colors.phaseFertile} />
            <Stop offset="0.5" stopColor={colors.phasePeriod} />
            <Stop offset="1" stopColor={colors.phaseOvulation} />
          </LinearGradient>
        </Defs>

        {/* Untracked/remaining track — dotted, thinner */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={Math.max(strokeWidth / 2, 2)}
          strokeDasharray="2 8"
          strokeLinecap="round"
          fill="none"
          rotation={-90}
          origin={`${center}, ${center}`}
        />

        {/* Elapsed arc */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      {children}
    </View>
  );
};
