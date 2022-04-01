import Image from "next/image";
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";
import Title from "../components/Title";

export default function Home() {
  return (
    <>
      <Title title="Homepage" />

      <Header />

      <main className="grid gap-10 grid-cols-1 md:grid-cols-2 p-10 max-w-screen-lg mx-auto md:gap-24 md:my-10 lg:my-36">
        <div className="flex justify-center items-center text-center md:text-left">
          <div>
            <h1 className="text-3xl font-medium mb-1 md:mb-4 md:text-5xl text-lime-500">
              {`A super simple money tracker`}
              {/* {`Easy to use..`} */}
            </h1>
            <p className="text-lg font-light mb-6 md:mb-10 md:text-2xl">
              {`Track your earnings and spendings in the most easy and efficient way.`}
            </p>
            <ButtonLink
              text="Create Account"
              href="/login"
              additionalClasses="md:hidden"
            />
            <ButtonLink
              text="Create Account"
              href="/login"
              size="xl"
              additionalClasses="hidden md:inline-flex"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="md:hidden">
            <Image
              src={"/wallet.svg"}
              width={300}
              height={300}
              alt={`Just a super simple money tracker.`}
            />
          </div>

          <div className="hidden md:block">
            <Image
              src={"/wallet.svg"}
              width={380}
              height={380}
              alt={`Just a super simple money tracker.`}
            />
          </div>
        </div>
      </main>

      <footer className="text-center bg-white p-10">© Grntx 2022</footer>
    </>
  );
}
