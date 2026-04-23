import Head from "next/head";
import Envelope from "@/components/Envelope";

export default function Home() {
  return (
    <>
      <Head>
        <title>Save the Date — Jieying &amp; John</title>
        <meta name="description" content="Save the date for the wedding of Jieying Liao and John Nguyen — December 6, 2026." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Envelope standalone />
    </>
  );
}
