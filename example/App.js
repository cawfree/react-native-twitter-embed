import React from "react";
import PropTypes from "prop-types";
import {View, SafeAreaView} from "react-native";
import {ProfileHeader} from "react-native-twitter-embed";

export default () => (
  <SafeAreaView>
    <ProfileHeader
      style={{
        width: "100%",
      }}
      mention="@cawfree"
    />
  </SafeAreaView>
);
