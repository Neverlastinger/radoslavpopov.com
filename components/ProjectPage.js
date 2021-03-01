import Link from 'next/link';
import Layout from './Layout';
import styles from './ProjectPage.module.scss';

const ProjectPage = ({ img, text }) => (
  <Layout>
    <div className={styles.projectPage}>
      <div className={styles.projectCard}>
        <div className={styles.infoCard}>
          {text}
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

export default ProjectPage;
