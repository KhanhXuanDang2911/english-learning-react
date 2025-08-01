import { useEffect, useState } from "react";
import DotPattern from "./DotPattern";
import Particles from "./Particle";

export const BackgroundPattern = () => {
  const [particleCount, setParticleCount] = useState(100);

  useEffect(() => {
    const calculateParticles = () => {
      const width = window.innerWidth;

      if (width >= 1024) setParticleCount(100);
      else if (width >= 768) setParticleCount(60);
      else setParticleCount(30);
    };

    calculateParticles();
    window.addEventListener("resize", calculateParticles);

    return () => {
      window.removeEventListener("resize", calculateParticles);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-slate-200">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="[mask-image:radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)] fill-slate-300"
      />
      <Particles
        className="absolute inset-0"
        quantity={particleCount}
        ease={50}
        color="#000000"
        refresh
      />
    </div>
  );
};
