import Head from 'next/head';

const siteTitle = 'Radoslav Popov';

const Layout = ({ children }) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.png" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <meta
        name="description"
        content="Radoslav Popov, independent software engineer"
      />
      <meta
        property="og:image"
        content={`https://og-image.now.sh/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <title>{siteTitle}</title>
    </Head>
    {children}
  </>
);

export default Layout;
