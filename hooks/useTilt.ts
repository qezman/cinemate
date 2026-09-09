"use client";

import { useRef } from "react";

const MAX_TILT_DEGREES = 8;

// CSS 3D tilt driven by mouse position within the element -
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  function onMouseMove(event: React.MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;

    const bounds = el.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    el.style.transform = `perspective(800px) rotateX(${-y * MAX_TILT_DEGREES}deg) rotateY(${x * MAX_TILT_DEGREES}deg)`;
  }

  function onMouseLeave() {
    const el = ref.current;
    if (el)
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  }

  return { ref, onMouseMove, onMouseLeave };
}
