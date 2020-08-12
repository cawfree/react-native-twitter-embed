import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import {Header} from "react-native-socials/src/Twitter/Header";

import {fetchTwitterProfile} from "../requests";
import {useTwitterProfile} from "../hooks";

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center", justifyContent: "center" },
  header: { marginTop: -20 },
});

const ProfileHeader = ({ style, mention, fetch, onFailure, ...extraProps }) => {
  const [loading, data, error] = useTwitterProfile(mention, fetch);
  useEffect(
    () => {
      (!!error) && onFailure(error);
    },
    [error, onFailure],
  );
  return (
    <View style={StyleSheet.flatten(style)}>
      {(!!loading) && (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )}
      {(!!data) && (
        <View style={styles.header}>
          <Header
            posterImageUrl={data.profile_image_url}
            posterDisplayName={data.name}
            posterUniqueName={data.screen_name}
            isPosterVerified={false}
          />
        </View>
      )} 
    </View>
  );
};

ProfileHeader.displayName = "ProfileHeader";

ProfileHeader.propTypes = {
  mention: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]),
  onFailure: PropTypes.func,
  fetch: PropTypes.func,
};

ProfileHeader.defaultProps = {
  style: {},
  onFailure: Promise.reject,
  fetch: fetchTwitterProfile,
};

export default React.memo(ProfileHeader);
