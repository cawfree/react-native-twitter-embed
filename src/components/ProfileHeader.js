import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import {Header} from "react-native-socials/src/Twitter/Header";

import {useTwitterProfile} from "../hooks";

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center", justifyContent: "center" },
  header: { marginTop: -20 },
});

const ProfileHeader = ({ style, mention, onFailure, ...extraProps }) => {
  const [loading, data, error] = useTwitterProfile(mention);
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
            posterImageUrl={data.profileImage}
            posterDisplayName={data.profileName}
            posterUniqueName={data.mention}
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
};

ProfileHeader.defaultProps = {
  style: {},
  onFailure: Promise.reject,
};

export default ProfileHeader;
