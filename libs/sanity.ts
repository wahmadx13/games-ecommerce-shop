import SanityClient from "next-sanity-client";

const sanityClient = new SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  useCdn: process.env.NODE_ENV === process.env.NEXT_PUBLIC_SANITY_DATASET,
});

export default sanityClient;
