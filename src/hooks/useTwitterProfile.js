import {useState, useEffect} from "react";

import {fetchTwitterProfile} from "../requests";

const useTwitterProfile = (mention) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect( 
    () => Promise
      .resolve()
      .then(() => setLoading(true))
      .then(() => fetchTwitterProfile(mention))
      .then(setData)
      .then(() => setError(null))
      .then(() => setLoading(false))
      .catch(setError) && undefined,
    [mention, setData, setError, setLoading],
  );
  return [loading, data, error];
};

export default useTwitterProfile;
