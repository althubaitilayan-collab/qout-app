"use client";

import { useState } from "react";
import { createListing } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";

export default function SupplierDashboard() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("foodImage");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await startUpload([file]);
      if (res?.[0]?.url) {
        setImageUrl(res[0].url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- Top Header Bar with Logo --- */}
      <header className="w-full bg-white p-4 flex justify-between items-center shadow-sm border-b border-gray-100">
        <div></div>
        <img
          src="/qoutlogo.jpg"
          alt="QoutLog Logo"
          width={60}
          height={60}
          className="rounded-lg object-contain"
        />
      </header>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex justify-center items-start p-4 md:p-8">
        <Card className="w-full max-w-2xl shadow-xl border-t-4 border-t-teal-600">
          <CardHeader className="text-center space-y-2 pt-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Post Surplus Food
            </CardTitle>
            <CardDescription className="text-gray-500 text-lg">
              Turn your food waste into community value.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-8">
<form action={createListing as any} className="space-y-6">
                  <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium text-gray-700">Food Name</Label>
                <Input 
                  id="title" 
                  name="title" 
                  placeholder="e.g., Fresh Croissants, Grilled Chicken" 
                  required 
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-base font-medium text-gray-700">Quantity (kg)</Label>
                  <Input 
                    id="quantity" 
                    name="quantity" 
                    type="number" 
                    step="0.1" 
                    placeholder="5.5" 
                    required 
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry" className="text-base font-medium text-gray-700">Expiry Date & Time</Label>
                  <Input 
                    id="expiry" 
                    name="expiry" 
                    type="datetime-local" 
                    required 
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium text-gray-700">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Briefly describe the condition of the food..." 
                  rows={3} 
                  className="resize-none"
                />
              </div>

              {/* PHOTO UPLOAD SECTION */}
              <div className="space-y-2">
                <Label className="text-base font-medium text-gray-700">Upload Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative">
                  {imageUrl ? (
                    <div className="relative">
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg object-contain" 
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <input type="hidden" name="imageUrl" value={imageUrl} />
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="photo-upload"
                        disabled={isUploading}
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer block">
                        {isUploading ? (
                          <div className="animate-pulse">
                            <Upload className="w-10 h-10 mx-auto text-teal-600 mb-2" />
                            <p className="text-sm text-teal-600">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Click to upload photo</p>
                          </>
                        )}
                      </label>
                    </>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-7 text-lg font-semibold shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Post Surplus Food"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}