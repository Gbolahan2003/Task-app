import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

// import logo from "./logo.svg";
// import "./App.css";

declare global {
  interface Window {
    particlesContainer: any;
  }
}

interface ComponentProps {
  children: React.ReactNode;
}

const ParticleContainer: FC<ComponentProps> = ({ children }) => {
  const containerRef = useRef<any>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (init) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  const particlesLoaded: any = useCallback(
    (container: any) => {
      containerRef.current = container;
      window.particlesContainer = container;
    },
    [containerRef]
  );

  const options: any = useMemo(
    () => ({
      fullScreen: {
        zIndex: -1,
      },
      particles: {
        number: {
          value: 50,
        },
        links: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 3,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          outMode: "out",
          bounce: false,
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 10,
            duration: 2,
            opacity: 0.8,
            speed: 3,
          },
          repulse: {
            distance: 200,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
      background: {
        color: {
          value: "#3F5BF6",
        },
      },
      themes: [
        {
          name: "light",
          default: {
            value: true,
            auto: true,
            mode: "light",
          },
          options: {
            background: {
              color: "#ffffff",
            },
            particles: {
              color: {
                value: "#000000",
              },
              links: {
                color: "#000000",
              },
            },
          },
        },
        {
          name: "dark",
          default: {
            value: true,
            auto: true,
            mode: "dark",
          },
          options: {
            background: {
              color: "#3F5BF6",
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
              },
            },
          },
        },
      ],
    }),
    []
  );

  const lightTheme = () => {
    containerRef.current?.loadTheme("light");
  };

  const darkTheme = () => {
    containerRef.current?.loadTheme("dark");
  };

  return (
    <div className="ParticleContainer">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
      <div className="content">{children}</div>
    </div>
  );
};

export default ParticleContainer;
