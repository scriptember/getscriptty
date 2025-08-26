"use client";

import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import Confetti from "react-confetti";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
        if (typeof window !== 'undefined') {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const targetDate = new Date("2024-09-01T00:00:00+01:00");
    const confettiEndDate = new Date("2024-09-02T00:00:00+01:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (now < confettiEndDate) {
            setShowConfetti(true);
        } else {
            setShowConfetti(false);
            clearInterval(interval);
        }
      }
    }, 1000);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-primary">
          Event Starts In
        </h2>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {[...Array(4)].map((_, i) => (
             <Card key={i} className="p-4 md:p-6 bg-card/50">
               <div className="text-4xl md:text-6xl font-bold font-mono text-foreground">--</div>
               <div className="text-sm text-muted-foreground mt-2">&nbsp;</div>
             </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
        {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
        {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
            <>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-primary">
                    Event Starts In
                </h2>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                <Card className="p-4 md:p-6 bg-card/50">
                    <div className="text-4xl md:text-6xl font-bold font-mono text-foreground">
                    {String(timeLeft.days).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Days</div>
                </Card>
                <Card className="p-4 md:p-6 bg-card/50">
                    <div className="text-4xl md:text-6xl font-bold font-mono text-foreground">
                    {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Hours</div>
                </Card>
                <Card className="p-4 md:p-6 bg-card/50">
                    <div className="text-4xl md:text-6xl font-bold font-mono text-foreground">
                    {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Minutes</div>
                </Card>
                <Card className="p-4 md:p-6 bg-card/50">
                    <div className="text-4xl md:text-6xl font-bold font-mono text-foreground">
                    {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">Seconds</div>
                </Card>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                Timezone: Africa/Lagos (UTC+1)
                </p>
            </>
        ) : (
             <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-primary">
                Scriptember has started!
             </h2>
        )}
    </div>
  );
}
