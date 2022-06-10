import { useEffect } from "react";
import { useQuery } from "react-query";
import { publicRoutes } from "routes/routes";
import { removeCurrentUser, removeCurrentUserAuthToken } from "utilities/storage";

const Logout = () => {
  const { remove } = useQuery("user");
  useEffect(() => {
    removeCurrentUserAuthToken();
    removeCurrentUser();
    remove();
    window.location.replace(publicRoutes.login);
  }, []);

  return <h5>Logging you out...</h5>;
};

export default Logout;
