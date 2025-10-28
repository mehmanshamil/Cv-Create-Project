"use client";
import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const FireworkEffect = () => {
  useEffect(() => {
    const duration = 3 * 1000; 
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return null; // vizual element yaratmır, yalnız effekt
};

export default FireworkEffect;
