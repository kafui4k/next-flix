import styles from "./navbar.module.css";

import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { magic } from "../../lib/magic-client";

const NavBar = () => {
  const router = useRouter();
  const [hideShow, setHideShow] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { email, issuer } = await magic.user.getMetadata();
        const didToken = await magic.user.getIdToken();

        if (email) {
          setUsername(email);
        } else {
          return null;
        }
      } catch (error) {
        // Handle errors if required!
        console.error("Error retrieving email", error);
      }
    }
    fetchData();
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropDown = (e) => {
    e.preventDefault();
    setHideShow(!hideShow);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      router.push("/login");
    } catch (error) {
      // Handle errors if required!
      console.error("Error logging out", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>NextFlix</div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropDown}>
              <p className={styles.username}>{username}</p>
              {/**Expand more icon */}
              <Image
                src="/static/expand_more.svg"
                width="27px"
                height="27px"
                alt="Expand more icon"
              />
            </button>
            {hideShow && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
