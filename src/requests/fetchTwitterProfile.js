import axios from "axios";
import {parse} from "node-html-parser";
import {Platform} from "react-native";

const fetchTwitterProfile = (mention) => {
  return Promise
    .resolve()
    .then(() => {
      if (typeof mention !== "string" || mention.length <= 0) {
        return Promise.reject(new Error(`Expected non-empty String mention, encountered ${mention}.`));
      }
      return mention.startsWith("@") ? mention.substring(1) : mention;
    })
    .then(
      (mention) => {
        return axios({
          url: `${Platform.OS === "web" ? "https://cors-anywhere.herokuapp.com/" : ""}http://gettwitterid.com/?user_name=${mention}&submit=GET+USER+ID`,
          method: 'get',
        })
        .then(({data}) => parse(data))
        .then(
          ($) => {
            const [{childNodes: [_, {attributes: {src: profileImage } }]}] = $.querySelectorAll('#profile_photo');
            const [{childNodes: info}] = $.querySelectorAll('.profile_info');
            const [id, profileName, ignored, followers, statuses] = info
              .map(
                (e, i) => {
                  if (i % 2 === 1) {
                    return e.childNodes[3].text.trim();
                  }
                  return undefined;
                },
              )
              .filter(e => !!e);
            return {id, name: profileName, screen_name: mention, profile_image_url: profileImage};
          },
        );
      },
    );
};

export default fetchTwitterProfile;
