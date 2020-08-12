import React, { useState } from "react";
import PropTypes from "prop-types";
import {View, SafeAreaView, TextInput} from "react-native";
import {ProfileHeader} from "react-native-twitter-embed";
import axios from "axios";

const fetch = mention => axios({
  url: `https://www.cawfree.com/twitter/users/show/${mention}`,
  method: "get",
})
  .then(({ data }) => data);

export default () => {
  const [value, onChange] = useState('');
  return (
    <SafeAreaView>
      <ProfileHeader
        fetch={fetch}
        mention="@cawfree"
      />
      <ProfileHeader
        mention="@cawfree"
      />
      <TextInput
        style={{
          width: 100,
          height: 100,
          backgroundColor: "green",
        }}
        value={value}
        onChangeText={onChange}
      />
    </SafeAreaView>
  );
};
