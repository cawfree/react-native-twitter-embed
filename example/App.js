import React from "react";
import PropTypes from "prop-types";
import {View, SafeAreaView} from "react-native";
import {ProfileHeader} from "react-native-twitter-embed";
import axios from "axios";

const fetch = mention => axios({
  url: `https://cawfree.com/twitter/${mention}`,
  method: "get",
})
  .then(({data: {data}}) => data);

export default () => (
  <SafeAreaView>
    <ProfileHeader
      fetch={fetch}
      mention="@cawfree"
    />
    <ProfileHeader
      mention="@cawfree"
    />
  </SafeAreaView>
);
