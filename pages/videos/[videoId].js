import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "../../styles/Video.module.css";

import cls from "classnames";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

  const video = {
    title: "Hi cute dog",
    publishTime: "1990-01-01",
    description:
      "A big red dog that is super cute, can he get any better,A big red dog that is super cute, can he get any betterA big red dog that is super cute, can he get any betterA big red dog that is super cute, can he get any better A big red dog that is super cute, can he get any better, A big red dog that is super cute, can he get any better, A big red dog that is super cute, can he get any better, A big red dog that is super cute, can he get any better, A big red dog that is super cute, can he get any better, A big red dog that is super cute, can he get any better",
    channelTitle: "Paramount Pictures",
    viewCount: 10000,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel="Watch the Video"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${router.query.videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameborder="0"
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.text}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>

              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
