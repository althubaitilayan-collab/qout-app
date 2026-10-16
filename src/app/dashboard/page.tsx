"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Wind, Award, ArrowLeft, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ImpactDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If not logged in, send to sign in page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- Header --- */}
      <header className="w-full bg-white p-4 flex justify-between items-center shadow-sm border-b border-gray-100">
        <Link href="/marketplace" className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium">
          <ArrowLeft className="w-5 h-5" /> Back to Marketplace
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-500">Welcome back,</p>
            <p className="font-bold text-gray-900">{session.user.name}</p>
          </div>
          
          {/* SIGN OUT BUTTON */}
          <Button 
            variant="outline" 
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>

          <Image
            src="/qoutlogo.jpg"
            alt="QoutLog Logo"
            width={50}
            height={50}
            className="rounded-lg object-contain"
          />
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Impact Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Leaf className="w-5 h-5 text-teal-600" />
                Food Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">0 kg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Wind className="w-5 h-5 text-teal-600" />
                CO2 Reduced
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">0 kg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Droplets className="w-5 h-5 text-teal-600" />
                Water Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">0 L</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Award className="w-5 h-5 text-amber-600" />
                Points Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600">0 pts</p>
            </CardContent>
          </Card>
        </div>

        {/* Claim History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Recent Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">You haven't claimed any food yet.</p>
              <Link href="/marketplace">
                <Button className="bg-teal-600 hover:bg-teal-700">Go to Marketplace</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}