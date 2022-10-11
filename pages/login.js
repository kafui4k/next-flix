import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "../lib/magic-client";

import styles from "../styles/Login.module.css";

const Login = () => {
  const router = useRouter();
  const [userMsg, setUserMsg] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);

    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e) => {
    setUserMsg("");

    const email = e.target.value;

    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    if (email) {
      if (email === "kalordo7@gmail.com") {
        try {
          setLoading(true);

          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });

          if (didToken) {
            const response = await fetch("/api/login", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${didToken}`,
                "Content-Type": "application/json",
              },
            });

            const loggedInResponse = await response.json();

            if (loggedInResponse.done) {
              router.push("/");
            } else {
              setLoading(false);
              console.error("Something went wrong logging in", error);
            }
          }
        } catch (error) {
          // Handle errors if required!
          console.error("Something went wrong logging in", error);
          setLoading(false);
        }
      } else {
        setLoading(false);
        setUserMsg("Something went wrong");
      }
    } else {
      setLoading(false);
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Flix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>NextFlix</div>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>

          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
