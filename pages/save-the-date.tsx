import Head from "next/head";
import Envelope from "@/components/Envelope";

export default function SaveTheDate() {
  return (
    <>
      <Head>
        <title>Save the Date — John &amp; JieYing</title>
        <meta name="description" content="Save the date for the wedding of John Nguyen and JieYing Liao — December 6, 2026." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Envelope standalone />
    </>
  );
}
