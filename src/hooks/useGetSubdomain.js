import { useEffect, useState } from "react";
import { parse } from "tldjs";

const useGetSubdomain = () => {
  const [subdomain, setSubdomain] = useState({});

  useEffect(() => {
    const { protocol, host, port } = window.location;
    let data = parse(`${protocol}//${host}`);
    setSubdomain({
      ...data,
      subdomain: data?.subdomain?.replace("www.", ""),
      domain: `${data?.domain}${port ? `:${port}` : ""}`
    });
    return () => {};
  }, [window.location.host, window.location.protocol]);
  return subdomain;
};

export default useGetSubdomain;
