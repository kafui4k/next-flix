import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/nav/navbar";
import Banner from "../components/banner/banner";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";

export default function Home() {
  const disneyVideos = [
    {
      imgUrl: "/static/clifford.jpg",
    },
    {
      imgUrl: "/static/clifford.jpg",
    },
    {
      imgUrl: "/static/clifford.jpg",
    },
  ];

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

      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />

        <SectionCards
          title="Productivity"
          videos={disneyVideos}
          size="medium"
        />
      </div>
    </div>
  );
}
