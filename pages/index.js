import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';
import Layout from '../components/Layout';
import styles from './index.module.scss';

const Home = () => (
  <Layout>
    <div className={styles.wrapper}>

      <div className={styles.card}>
        <div className={styles.profileImage}>
          <img src="/images/me.jpg" alt="Radoslav Popov" />
        </div>

        <h1>Radoslav Popov</h1>

        <ul className={styles.subtitle}>
          <li>Front-end Architect</li>
          <li>Independent Software Engineer</li>
          <li>Co-founder, Investia.IO</li>
        </ul>

        <div className={styles.content}>
          Bachelor of Informatics, Master of General Psychology,
          14 years of software engineering experience working in different IT corporations (2007 - 2021),
          building large-scale applications that last,
          fond of UX and great products, backpacked S.E. Asia for 4 months at one point in life.
        </div>

        <ul className={styles.socialIcons}>
          <li>
            <SocialIcon url="https://www.linkedin.com/in/radoslav-popov-8092aa3b/" target="_blank" />
          </li>
          <li>
            <SocialIcon url="https://medium.com/@radoslav.popov" target="_blank" />
          </li>
        </ul>
      </div>

      <div className={styles.footer}>
        <Link href="/i">
          <a href="/i">
            <img src="/images/investia.png" alt="View Product" />
          </a>
        </Link>
        <Link href="/k">
          <a href="/k">
            <img src="/images/kredy.svg" alt="View Product" />
          </a>
        </Link>
      </div>
    </div>
  </Layout>
);

export default Home;
