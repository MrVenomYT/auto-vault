"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ShieldCheck, ImageOff } from "lucide-react"

interface CarImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  isRepresentative?: boolean
  showVerifiedBadge?: boolean
  fallbackUrls?: string[]
}

export default function CarImage({
  src,
  alt,
  fill = true,
  width,
  height,
  priority = false,
  className = "",
  sizes,
  isRepresentative = false,
  showVerifiedBadge = false,
  fallbackUrls = []
}: CarImageProps) {
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0)
  const [hasError, setHasError] = useState<boolean>(false)

  // Candidate sources list: [primary src, ...fallbackUrls]
  const sources = [src, ...fallbackUrls].filter(Boolean)

  const handleImageError = () => {
    if (currentSrcIndex < sources.length - 1) {
      // Try next validated fallback source
      setCurrentSrcIndex((prev) => prev + 1)
    } else {
      // No more valid sources; fallback to clean Image Unavailable placeholder (No broken icon)
      setHasError(true)
    }
  }

  if (hasError || !sources[currentSrcIndex]) {
    return (
      <div className="w-full h-full min-h-[160px] flex flex-col items-center justify-center p-6 text-center bg-zinc-900/60 border border-zinc-800/80 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 mb-2">
          <ImageOff className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold text-zinc-300">Image unavailable</span>
        <span className="text-[11px] text-zinc-500 mt-0.5">No verified photograph available</span>
      </div>
    )
  }

  const activeSrc = sources[currentSrcIndex]

  return (
    <div className="relative w-full h-full">
      {fill ? (
        <Image
          src={activeSrc}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          className={className}
          sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />
      ) : (
        <Image
          src={activeSrc}
          alt={alt}
          width={width || 600}
          height={height || 400}
          priority={priority}
          unoptimized
          className={className}
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />
      )}

      {/* Representative or Verified Badge overlay */}
      {isRepresentative && (
        <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-amber-950/90 border border-amber-800/60 rounded text-[10px] font-semibold text-amber-300 shadow">
          Representative image
        </div>
      )}

      {showVerifiedBadge && !isRepresentative && (
        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 bg-emerald-950/90 border border-emerald-800/60 rounded text-[10px] font-semibold text-emerald-400 shadow">
          <ShieldCheck className="w-3 h-3" />
          <span>Verified Photograph</span>
        </div>
      )}
    </div>
  )
}
