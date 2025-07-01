import React, { useState, useEffect, useRef } from 'react';
import FOG from 'vanta/dist/vanta.fog.min';
import * as THREE from 'three';

const VantaBackground = ({ mode }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const highlightColor = mode === 'light' ? 0x00796b : 0x48a999;
    const baseColor = mode === 'light' ? 0xf4f7f6 : 0x121212;

    if (vantaEffect) {
      // If an effect already exists, just update its options
      vantaEffect.setOptions({
        highlightColor: highlightColor,
        baseColor: baseColor
      })
    } else {
      // Otherwise, create a new one
      const newVantaEffect = FOG({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: highlightColor,
        midtoneColor: 0x1976d2,
        lowlightColor: 0x004ba0,
        baseColor: baseColor,
        blurFactor: 0.60,
        speed: 0.50,
        zoom: 0.60
      });
      setVantaEffect(newVantaEffect);
    }

    return () => {
      // We don't destroy it on mode change anymore, only when the component unmounts
      // This makes the theme switch smoother
    };
  }, [mode]); // Re-run only when mode changes

  return (
    // This div is now fixed to the background of the entire viewport
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // zIndex: -1 ensures it's always in the back
      }}
    />
  );
};

export default VantaBackground;