# react-native-twitter-embed
Embed a user's latest Tweet in React Native, without the need for API keys. Works on [**Android**](), [**iOS**]() and [**Web**]() for vanilla and Expo.

## Getting Started

To install, please make sure you have added [`react-native-webview`](https://github.com/react-native-community/react-native-webview) and [`react-native-web-webview`](https://www.npmjs.com/package/react-native-web-webview).

Using [`yarn`](https://yarnpkg.com/lang/en/):

```bash
yarn add react-native-twitter-embed
```

## Usage

```javascript
import React from "react";
import PropTypes from "prop-types";
import {ProfileHeader} from "react-native-twitter-embed";

export default () => (
  <ProfileHeader
    mention="cawfree"
  />
);
```

## Licence
[**MIT**](./LICENSE.md)
