import {useState, useEffect} from "react";

import {fetchTwitterProfile} from "../requests";

const useTwitterProfile = (mention, fetch = fetchTwitterProfile) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect( 
    () => Promise
      .resolve()
      .then(() => setLoading(true))
      .then(() => fetch(mention))
      .then(setData)
      .then(() => setError(null))
      .then(() => setLoading(false))
      .catch(setError) && undefined,
    [mention, fetch, setData, setError, setLoading],
  );
  return [loading, data, error];
};

export default useTwitterProfile;
