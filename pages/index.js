import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/nav/navbar";
import Banner from "../components/banner/banner";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Flix | App</title>
        <meta name="description" content="a NetFlix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar username="kafui.alordo@gmail.com" />

      <Banner
        title="On the road..."
        subTItle="On the Come up!"
        imgUrl="/static/clifford.jpg"
      />
      {/* <Card /> */}
    </div>
  );
}
