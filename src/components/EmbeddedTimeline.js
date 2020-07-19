import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Platform, Animated, ActivityIndicator, View, StyleSheet, PixelRatio, Dimensions } from "react-native";

import WebView from "./WebView";

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "transparent" },
  center: { alignItems: "center", justifyContent: "center" },
});

const EmbeddedTimeline = ({ alias, style, width, height, pointerEvents, limit, dark, ...extraProps }) => {
  const [animOpacity] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(true);
  const scale = (PixelRatio.get() + 1);
  useEffect(
    () => {
      if (!loading) {
        Animated.timing(
          animOpacity,
          {
            toValue: 0,
            duration: 1000,
            useNativeDriver: Platform.OS !== "web",
          },
        )
          .start();
      }
    },
    [loading],
  );
  return (
    <View
      pointerEvents={pointerEvents}
      style={[
        StyleSheet.flatten(style),
        {
          width,
          height,
          overflow: 'hidden',
        },
      ]}
    >
      <Animated.View
        style={{
          width,
          height: height,
          opacity: Animated.subtract(1, animOpacity),
        }}
      >
        <WebView
          style={{
            width,
            height,
            backgroundColor: "transparent",
          }}
          onLoad={() => setLoading(false)}
          {...extraProps}
          originWhitelist={['*']}
          source={{ html: `
<body style="margin: 0 !important;padding: 0 !important;">
  <a class="twitter-timeline" data-width="${width * scale}" data-height="${(height) * scale}" data-tweet-limit="${limit}" data-chrome="noheader nofooter noborders transparent" data-cards="hidden" data-theme="${dark ? "dark" : "light"}" data-dnt="true" href="https://twitter.com/${alias}?ref_src=twsrc%5Etfw&cards=hidden">Tweets by cawfree</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</body>
<script>
</script>
          `}}
        />
      </Animated.View>
      <Animated.View
        pointerEvents={loading ? "auto" : "none"}
        style={[{opacity: animOpacity}, StyleSheet.absoluteFill, styles.center]}
      >
        <ActivityIndicator />
      </Animated.View>
    </View>
  );
};

EmbeddedTimeline.propTypes = {
  alias: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  width: PropTypes.number,
  height: PropTypes.number,
  pointerEvents: PropTypes.string,
  limit: PropTypes.number,
  dark: PropTypes.bool,
};

EmbeddedTimeline.defaultProps = {
  alias: "cawfree",
  style: {},
  width: Dimensions.get("window").width,
  height: 80,
  pointerEvents: "none",
  limit: 1,
  dark: false,
};

export default EmbeddedTimeline;
