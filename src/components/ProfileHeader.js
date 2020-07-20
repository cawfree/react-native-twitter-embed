import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Platform, ActivityIndicator, Image, View, StyleSheet} from "react-native";
import axios from "axios";
import {parse} from "node-html-parser";
import {Header} from "react-native-socials/src/Twitter/Header";

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center", justifyContent: "center" },
  header: { marginTop: -20 },
});

const ProfileHeader = ({ style, mention, onFailure, ...extraProps }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect( 
    () => Promise
      .resolve()
      .then(() => {
        if (typeof mention !== "string" || mention.length <= 0) {
          return Promise.reject(new Error(`Expected non-empty String mention, encountered ${mention}.`));
        }
        const alias = mention.startsWith("@") ? mention.substring(1) : mention;

        setLoading(true);

        return alias;
      })
      .then(mention => axios({
        url: `${Platform.OS === "web" ? "https://cors-anywhere.herokuapp.com/" : ""}http://gettwitterid.com/?user_name=${mention}&submit=GET+USER+ID`,
        method: 'get',
      }))
      .then(({data}) => parse(data))
      .then(
        ($) => {
          const [{childNodes: [_, {attributes: {src: profileImage } }]}] = $.querySelectorAll('#profile_photo');
          const [{childNodes: info}] = $.querySelectorAll('.profile_info');
          const [id, profileName, mention, followers, statuses] = info
            .map(
              (e, i) => {
                if (i % 2 === 1) {
                  return e.childNodes[3].text.trim();
                }
                return undefined;
              },
            )
            .filter(e => !!e);
          return setData({id, profileName, mention, followers, statuses, profileImage});
        },
      )
      .then(() => setLoading(false))
      .catch(onFailure) && undefined,
    [mention, setData, setLoading],
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
