import { useEffect } from "react";

const Redirect = ({ url }) => {
  useEffect(() => {
    window.location.replace(url);
  }, []);

  return <h5>Loading...</h5>;
};

export default Redirect;
