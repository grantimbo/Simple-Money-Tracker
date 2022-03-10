import Image from "next/image";
import ButtonLink from "../components/ButtonLink";
import Title from "../components/Title";

export default function Home() {
  return (
    <>
      <Title title="Homepage" />

      <main className="flex items-center justify-center mt-60 p-4">
        <div className="grid grid-cols-2 max-w-screen-xl w-full">
          <div className="flex justify-center items-center">
            <div>
              <h1 className="text-6xl font-medium mb-1">
                Simple Money Tracker{" "}
              </h1>
              <p className="text-2xl font-light mb-6">
                Just a super simple money tracker.
              </p>
              <ButtonLink
                text="Get Started"
                href="/dash"
                icon="navigate_next"
                additionalClasses="text-2xl"
              />
            </div>
          </div>
          <Image
            src={"/wallet.svg"}
            width={380}
            height={380}
            alt={`Just a super simple money tracker.`}
          />
        </div>
      </main>

      <footer className=""></footer>
    </>
  );
}
