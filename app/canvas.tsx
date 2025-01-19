"use client";
import React, { useEffect, useRef } from "react";

let currentColorId = 1;

// NOTE: these 4 colours match gradients in page.tsx
const COLORS = ["#00FFFF", "#4444FF", "#FF00FF", "#FF8800"];

export function Canvas() {
  const blobRef = useRef<HTMLDivElement | null>(null);

  const starbgRef = useRef<HTMLDivElement | null>(null);
  const starcountRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const blob = document.getElementById("cursorthing") as HTMLDivElement;
    blobRef.current = blob;

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    window.requestAnimationFrame(render);

    // Adjust canvas size on window resize
    window.addEventListener("resize", () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    });

    // Blob follows mouse movement
    window.addEventListener("mousemove", (e) => {
      if (blob) {
        blob.style.translate = `${e.clientX - blob.clientWidth / 2}px ${
          e.clientY - blob.clientHeight / 2
        }px`;
      }
    });

    // Set initial canvas size
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Change `currentColorId` every 2 seconds
    const colorChangeInterval = setInterval(() => {
      currentColorId = (currentColorId + 1) % COLORS.length; // Loop between 0 and 3
    }, 2000);

    return () => {
      clearInterval(colorChangeInterval); // Cleanup interval on component unmount
    };
  }, []);

  const render = () => {
    const ctx = ctxRef.current;
    if (!ctx || !canvasRef.current) {
      return;
    }

    // Update blob color
    const blob = blobRef.current;
    if (blob) {
      blob.style.background = COLORS[currentColorId];
    }

    // Update subtitle (if it exists)

    const starbg = starbgRef.current;
    if (starbg) {
      starbg.style.background = COLORS[currentColorId];
    }

    const starcount = starcountRef.current;
    if (starcount) {
      starcount.style.background = COLORS[currentColorId];
    }

    window.requestAnimationFrame(render);
  };

  return (
    <div className="h-[400vh] w-screen absolute -z-10">
      <div
        id="cursorthing"
        className="transform-gpu pointer-events-none w-64 h-64 fixed opacity-40 blur-[12rem] rounded-full"
      />
      <canvas
        className="h-full w-full"
        id="canvas"
        style={{ background: "#000" }}
      />
    </div>
  );
}
