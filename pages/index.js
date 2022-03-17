import Image from "next/image";
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";
import Title from "../components/Title";

export default function Home() {
  return (
    <>
      <Title title="Homepage" />

      <Header />

      <main className="grid gap-6 grid-cols-1 md:grid-cols-2 p-10 max-w-screen-lg mx-auto md:my-10 lg:my-36">
        <div className="flex justify-center items-center text-center md:text-left">
          <div>
            <h1 className="text-5xl font-medium mb-1">
              A super simple money tracker
            </h1>
            <p className="text-2xl font-light mb-6">
              Track your spendings and earnings in the most simplier way.
            </p>
            <ButtonLink
              text="Get Started"
              href="/dash"
              icon="navigate_next"
              size="xl"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={"/wallet.svg"}
            width={380}
            height={380}
            alt={`Just a super simple money tracker.`}
          />
        </div>
      </main>
    </>
  );
}
