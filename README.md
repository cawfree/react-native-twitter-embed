# react-native-twitter-embed
Embed a user's latest Tweet in React Native.

## Getting Started

To install, please make sure you have added [`react-native-webview`](https://github.com/react-native-community/react-native-webview) and [`react-native-web-webview`](https://www.npmjs.com/package/react-native-web-webview).

Using [`yarn`](https://yarnpkg.com/lang/en/):

```bash
yarn add react-native-twitter-embed
```

## Usage

```javascript
import React from "react";
import {EmbeddedTimeline} from "react-native-twitter-embed";

export default () => (
  <EmbeddedTimeline
    alias="cawfree"
    width={220}
    height={80}
    limit={1}
    dark
    pointerEvents="auto"
  />
);
```

## Licence
[**MIT**](./LICENSE.md)
