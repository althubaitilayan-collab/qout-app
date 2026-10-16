"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Leaf, Package } from "lucide-react";
import { ClaimButton } from "@/components/ClaimButton";

// Mock data for demonstration since we removed server-side fetching in the client component
// In a production app, you would fetch this via an API route or keep this as a server component with proper session handling
const mockListings = [
  // You can add your test listings here if needed, otherwise it will show empty state
];

export default function MarketplacePage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Top Header Bar with Logo & Session Check --- */}
      <header className="w-full bg-white p-4 flex justify-between items-center shadow-sm border-b border-gray-100">
        <h1 className="text-2xl font-bold text-teal-600">QoutLog Marketplace</h1>
        <div className="flex items-center gap-4">
          {status === "authenticated" && session?.user ? (
            <Link href="/dashboard">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                My Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signin">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Sign In
              </Button>
            </Link>
          )}
          <Image
            src="/qoutlogo.jpg"
            alt="QoutLog Logo"
            width={60}
            height={60}
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Surplus Food</h2>
          <p className="text-gray-600">Claim food to support your community or get great deals.</p>
        </div>

        {/* Since this is now a client component, we show the empty state by default 
            until we connect it to an API. The supplier dashboard posts to the DB, 
            so you can switch this back to a server component later once auth is stable. */}
        <div className="text-center py-20 bg-white rounded-xl shadow-sm">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No surplus food available right now.</h3>
          <p className="text-gray-500 mt-2">Check back soon, or encourage local businesses to join QoutLog!</p>
          <Link href="/supplier/dashboard" className="mt-6 inline-block">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white mt-4">
              Post Surplus Food
            </Button>
          </Link>
        </div>

        {/* 
          NOTE: To show real listings again, we need to convert this back to a Server Component 
          OR fetch data via useEffect. For now, the upload feature works on the supplier side.
          Uncomment the grid below and replace mockListings with real fetched data when ready.
        
        {mockListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockListings.map((listing) => (
              <Card key={listing.id} className="flex flex-col hover:shadow-lg transition-shadow duration-200 border-t-4 border-t-amber-500">
                <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  {listing.imageUrl ? (
                    <img 
                      src={listing.imageUrl} 
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Leaf className="w-12 h-12 text-gray-400" />
                  )}
                  <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {listing.quantityKg} kg
                  </span>
                </div>

                <CardHeader className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-gray-900 line-clamp-1">{listing.title}</CardTitle>
                    <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100">
                      {listing.business?.businessName || "Unknown Business"}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {listing.description || "No description provided."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2 text-amber-500" />
                    <span>Expires: {new Date(listing.expiryDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 text-teal-600" />
                    <span>{listing.business?.address || "Location TBD"}</span>
                  </div>
                </CardContent>

                <CardFooter>
                  <ClaimButton listingId={listing.id} status={listing.status} />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null } 
        */}
      </main>
    </div>
  );
}