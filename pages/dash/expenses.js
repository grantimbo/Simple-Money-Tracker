import Head from "next/head";
import Link from "next/link";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";

export default function Expenses() {
  return (
    <div className="">
      <Head>
        <title>Expenses</title>
      </Head>

      <DashLayout>
        <Header />
        <main className="p-4">
          <Link href={`/dash`}>
            <a>Close</a>
          </Link>
        </main>
      </DashLayout>
    </div>
  );
}
