import Link from 'next/link'
import { useState } from 'react';
import Layout from '../components/Layout';
import { useResize } from '../hooks';
import styles from './styles.module.scss';

export const isMobileWidth = () => (
  window.matchMedia('(max-width: 626px)').matches
);

const KredyPage = () => {
  const [img, setImg] = useState();

  useResize(() => {
    setImg(isMobileWidth() ? 'k-work-in-progress-mobile.png' : 'k-work-in-progress.png');
  });

  return (
    <Layout>
      <div className={styles.projectPage}>
        <div className={styles.projectCard}>
          <div className={styles.infoCard}>
            Currently designing and implementing the Front-End architecture of this upcoming start-up idea.
          </div>
          <div className={styles.imageWrapper}>
            <Link href="/">
              <img src={`images/${img}`} alt="/projects/k" className={styles.projectImage} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KredyPage;
