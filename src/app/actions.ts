"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createListing(formData: FormData) {
  const title = formData.get("title") as string;
  const quantity = parseFloat(formData.get("quantity") as string);
  const expiry = formData.get("expiry") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  try {
    let business = await prisma.business.findFirst();
    if (!business) {
      business = await prisma.business.create({
        data: {
          userId: "mock-user-1",
          businessName: "Test Restaurant",
          address: "Riyadh, Saudi Arabia",
          latitude: 24.7136,
          longitude: 46.6753,
          verified: true,
        },
      });
      
      await prisma.user.create({
        data: {
          id: "mock-user-1",
          name: "Test Supplier",
          email: "supplier@qoutlog.com",
          role: "SUPPLIER",
        }
      });
    }

    await prisma.foodListing.create({
      data: {
        title,
        quantityKg: quantity,
        expiryDate: new Date(expiry),
        description,
        imageUrl: imageUrl || null,
        businessId: business.id,
        status: "AVAILABLE",
      },
    });

    revalidatePath("/supplier/dashboard");
    revalidatePath("/marketplace");
    return { success: true };
  } catch (error) {
    console.error("Failed to create listing:", error);
    return { success: false, error: "Something went wrong." };
  }
}