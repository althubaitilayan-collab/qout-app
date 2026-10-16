import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Users, TrendingUp, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* --- Navigation Header --- */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-teal-600" />
            <span className="text-2xl font-bold text-gray-900">QoutLog</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <Link href="/marketplace" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
              Marketplace
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/supplier/dashboard">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                Supplier Login
              </Button>
            </Link>
            <Image
              src="/qoutlogo.jpg"
              alt="QoutLog Logo"
              width={45}
              height={45}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-semibold">Turning Waste into Value</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            From <span className="text-teal-600">Surplus</span> to <br />
            <span className="text-amber-600">Sustenance</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            QoutLog connects restaurants, factories, and warehouses with charities and consumers. 
            Track every kilogram saved and transform food waste into measurable community impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                Browse Food Deals <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/supplier/dashboard">
              <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-6 text-lg">
                Post Surplus Food
              </Button>
            </Link>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="bg-gray-50 py-16 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <Leaf className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900">1,000+</h3>
                <p className="text-gray-600 mt-1">Meals Saved</p>
              </div>
              <div className="p-6">
                <Heart className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900">50+</h3>
                <p className="text-gray-600 mt-1">Charities Supported</p>
              </div>
              <div className="p-6">
                <Users className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900">200+</h3>
                <p className="text-gray-600 mt-1">Partner Businesses</p>
              </div>
              <div className="p-6">
                <TrendingUp className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900">2.5T</h3>
                <p className="text-gray-600 mt-1">CO2 Reduced (kg)</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- How It Works --- */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How <span className="text-teal-600">QoutLog</span> Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Log Surplus</h3>
              <p className="text-gray-600">
                Businesses list their excess food with quantity and expiry details in seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Connect & Claim</h3>
              <p className="text-gray-600">
                Charities claim for free, while consumers get access to heavily discounted deals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Track Impact</h3>
              <p className="text-gray-600">
                Earn points, track your CO2 savings, and build your sustainability story.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-teal-500" />
            <span className="text-xl font-bold">QoutLog</span>
          </div>
          <p className="text-gray-400 mb-6">Turning food waste into community value.</p>
          <p className="text-gray-500 text-sm">© 2026 QoutLog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}