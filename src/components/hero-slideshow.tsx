
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const images = [
  { src: "https://picsum.photos/seed/slide1/1920/1080", hint: "javascript code" },
  { src: "https://picsum.photos/seed/slide2/1920/1080", hint: "react code" },
  { src: "https://picsum.photos/seed/slide3/1920/1080", hint: "node js" },
  { src: "https://picsum.photos/seed/slide4/1920/1080", hint: "developer conference" },
];

export default function HeroSlideshow() {
  const [isMounted, setIsMounted] = useState(false);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    
    const targetDate = new Date("2024-09-01T00:00:00+01:00");

    const checkCountdown = () => {
      if (new Date() >= targetDate) {
        setCountdownFinished(true);
      } else {
        setCountdownFinished(false);
      }
    };
    
    checkCountdown();
    const countdownInterval = setInterval(checkCountdown, 1000);

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(slideInterval);
    };
  }, []);

  if (!isMounted) {
    return <div className="absolute inset-0 w-full h-full bg-background/50"></div>;
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt="Hero background"
          fill
          priority={index === 0}
          className={cn(
            "object-cover transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0",
            countdownFinished ? "opacity-30" : "opacity-10"
          )}
          data-ai-hint={image.hint}
        />
      ))}
    </div>
  );
}
