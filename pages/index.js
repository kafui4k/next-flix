import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Flix | App</title>
        <meta name="description" content="a NetFlix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Next-Flix</h1>
      <Banner
        title="On the road..."
        subTItle="On the Come up!"
        imgUrl="/static/clifford.jpg"
      />
      {/* <NavBar />
      <Card /> */}
    </div>
  );
}
