import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";
import "../styles/globals.css";

import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();

        if (isLoggedIn) {
          console.log(isLoggedIn); // => `true` or `false`
          router.push("/");
        } else {
          router.push("/login");
        }
      } catch (error) {
        // Handle errors if required!
        console.error("You are not logged in", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);

    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
