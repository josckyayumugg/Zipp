import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AutoMarqueeList({ data, itemWidth, itemHeight, renderItem }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  // We add side padding so the first and last items can align perfectly in the center
  const containerPadding = (SCREEN_WIDTH - itemWidth) / 2;

  // Track the active center index to pass it as isActive to children
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const x = event.nativeEvent.contentOffset.x;
        // Calculate which item is centered
        const index = Math.round(x / itemWidth);
        if (index >= 0 && index < data.length) {
          setActiveIndex(index);
        }
      },
    }
  );

  return (
    <View style={[styles.container, { height: itemHeight + 20 }]}>
      <Animated.FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        
        // Disable moving by momentum and scroll exactly one item per slide
        snapToInterval={itemWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        disableIntervalMomentum={true}
        
        contentContainerStyle={{
          paddingHorizontal: containerPadding,
          alignItems: 'center',
        }}
        
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item, index }) => {
          // Calculate the input range for the specific item
          const inputRange = [
            (index - 1) * itemWidth,
            index * itemWidth,
            (index + 1) * itemWidth,
          ];

          // Zoom effect: 1.15 when active in center, drops down to 0.85 when scrolled away
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.85, 1.15, 0.85],
            extrapolate: 'clamp',
          });

          // Opacity fade effect for non-active items
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1.0, 0.6],
            extrapolate: 'clamp',
          });

          const isActive = index === activeIndex;

          return (
            <Animated.View
              style={{
                width: itemWidth,
                height: itemHeight,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ scale }],
                opacity,
              }}
            >
              {renderItem({ item, isActive })}
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
});