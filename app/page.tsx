import Link from "next/link";

export default async function Home() {
  return (
    <>
      Hello! Welcome to JobJourney!
      <br />
      There will be dashboard here
      <br />
      for now you can go to <Link href="/processes">Processes</Link>
    </>
  );
}
