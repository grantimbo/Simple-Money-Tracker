import Head from "next/head";

const Title = ({ title }) => {
  return (
    <Head>
      <title>{title} | Simple Money Tracker</title>
    </Head>
  );
};

export default Title;
