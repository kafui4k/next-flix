import Head from "next/head";
import styles from "../styles/Home.module.css";

import NavBar from "../components/nav/navbar";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/section-cards";

import { getPopularVideos, getVideos } from "../lib/videos";

export async function getServerSideProps() {
  const disneyVideos = await getVideos("disney trailer");
  const vanLifeAndTravels = await getVideos("van life and travels");
  const spaceExploration = await getVideos("spacex exploration");
  const popularVideos = await getPopularVideos();

  // Pass data to the page via props
  return {
    props: { disneyVideos, vanLifeAndTravels, spaceExploration, popularVideos },
  };
}

export default function Home({
  disneyVideos,
  vanLifeAndTravels,
  spaceExploration,
  popularVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next-Flix | App</title>
        <meta name="description" content="a NetFlix clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />

        <Banner
          title="On the road..."
          subTItle="On the Come up!"
          imgUrl="/static/clifford.jpg"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards
            title="Space Exploration"
            videos={spaceExploration}
            size="small"
          />
          <SectionCards
            title="Van Life and Travels"
            videos={vanLifeAndTravels}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
