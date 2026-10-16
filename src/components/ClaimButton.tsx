"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { claimListing } from "@/app/marketplace/actions";

interface ClaimButtonProps {
  listingId: string;
  status: string;
}

export function ClaimButton({ listingId, status }: ClaimButtonProps) {
  const [isClaimed, setIsClaimed] = useState(status !== "AVAILABLE");
  const [isLoading, setIsLoading] = useState(false);

  const handleClaim = async () => {
    setIsLoading(true);
    const result = await claimListing(listingId);
    
    if (result.success) {
      setIsClaimed(true);
      window.location.reload();
    } else {
      alert(result.error || "Failed to claim");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClaim}
      disabled={isClaimed || isLoading}
      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-6"
    >
      {isLoading ? "Claiming..." : isClaimed ? "Already Claimed" : "Claim This Listing"}
    </Button>
  );
}