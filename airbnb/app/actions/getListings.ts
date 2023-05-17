//@ts-nocheck

import prisma from "../libs/prismadb";

export default async function getListings() {
  try {
    const listings =
      (await prisma.listing.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })) || null;

    if (listings.length > 0) {
      return listings;
    }
  } catch (error) {
    console.log(error);
  }
}
