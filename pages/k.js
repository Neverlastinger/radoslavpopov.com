import Link from 'next/link'
import Layout from '../components/Layout';
import styles from './styles.module.scss';

const KredyPage = () => (
  <Layout>
    <div className={styles.projectPage}>
      <div className={styles.projectCard}>
        <div className={styles.infoCard}>
          Currently designing and implementing the Front-End architecture of this upcoming start-up idea.
        </div>
        <div className={styles.imageWrapper}>
          <Link href="/">
            <img src="/images/k-work-in-progress.png" alt="/projects/k" className={styles.projectImage} />
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default KredyPage;
