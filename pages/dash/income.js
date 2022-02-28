import Head from "next/head";
import Link from "next/link";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";

export default function Income() {
  return (
    <div className="">
      <Head>
        <title>Income</title>
      </Head>

      <DashLayout>
        <Header />
        <main className="p-4">
          <Link href={`/dash`}>
            <a className="bg-red-500 py-2 px-4 rounded-full text-white">{`< Back`}</a>
          </Link>

          <div>
            <div>Income lists</div>
          </div>
        </main>
      </DashLayout>
    </div>
  );
}
