import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import Layout from "../components/Layout";
import styles from "./index.module.scss";
import Image from "next/image";

const Home = () => (
  <Layout>
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.profileImage}>
          <img src="/images/me.png" alt="Radoslav Popov" />
          <p>
            You can contact me on{" "}
            <a
              href="https://www.linkedin.com/in/radoslav-popov-8092aa3b/"
              target="_blank"
            >
              LinkedIn
            </a>
          </p>
        </div>

        <div className={styles.content}>
          <p>
            Hi, my name is <strong>Radoslav Popov</strong>, but most people call
            me <strong>Rado</strong> (in 🇧🇬Bulgaria it is common to shorten
            names, so it's not just to make it easier for my international
            peers).
          </p>

          <p>
            I have spent most of my career building custom web applications,
            such as a video surveillance software, a drawing tool, a social
            network, and most recently, a ChatGPT-like interface for a Silicon
            Valley start-up.
          </p>

          <p>
            I was a big advocate of <strong>JavaScript</strong> long before
            people discovered it as a serious programming language and started
            to utilize frameworks to build interactive applications. I built my
            first Tetris-like browser game in 2007, intensively querying the DOM
            and using <code>setTimeout</code>s to achieve animation and
            interactivity.
          </p>

          <p>
            I thrive the most when given the freedom to utilize my skills and
            build quality products with amazing interfaces. I feel very
            fortunate that, through my job, I can connect with companies from
            all over the world and help them achieve their business goals.
          </p>

          <p>
            For a more professional resume, see{" "}
            <a
              href="https://reactivelabs.ltd/radoslav-popov/experience"
              target="_blank"
            >
              <Image
                src="./images/reactive-labs.svg"
                alt="Reactive Labs Ltd"
                width={100.8}
                height={36}
              />
            </a>
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default Home;
