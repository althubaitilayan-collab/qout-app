"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

export async function claimListing(listingId: string) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return { success: false, error: "Please sign in first" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  try {
    await prisma.claim.create({
      data: {
        userId: user.id,
        listingId,
        status: "PENDING",
      },
    });

    await prisma.foodListing.update({
      where: { id: listingId },
      data: { status: "CLAIMED" },
    });

    const listing = await prisma.foodListing.findUnique({
      where: { id: listingId },
    });

    if (listing) {
      await prisma.impactLog.create({
        data: {
          userId: user.id,
          kgSaved: listing.quantityKg,
          co2Reduced: listing.quantityKg * 2.5,
          waterSaved: listing.quantityKg * 1000,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          pointsBalance: {
            increment: Math.floor(listing.quantityKg * 10),
          },
        },
      });
    }

    revalidatePath("/marketplace");
    return { success: true };
  } catch (error) {
    console.error("Claim failed:", error);
    return { success: false, error: "Failed to claim listing" };
  }
}