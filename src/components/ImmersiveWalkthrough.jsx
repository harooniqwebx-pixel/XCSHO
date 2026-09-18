import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const rooms = [
  {
    name: "ARRIVAL",
    title: "Your next address.",
    description:
      "A calm architectural arrival designed to make the first few steps feel unmistakably different.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=92",
  },
  {
    name: "ENTRY",
    title: "Come inside.",
    description:
      "Natural light, warm materials, and generous proportions create an effortless transition from the city.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=92",
  },
  {
    name: "LIVING ROOM",
    title: "Light becomes the architecture.",
    description:
      "A generous living space framed by expansive glazing, natural textures, and views toward Toronto.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=92",
  },
  {
    name: "KITCHEN",
    title: "The heart of the residence.",
    description:
      "Custom cabinetry, stone surfaces, and a generous island create a kitchen made for both quiet mornings and entertaining.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=92",
  },
  {
    name: "DINING",
    title: "Made for gathering.",
    description:
      "An intimate dining setting connects the kitchen and living spaces while keeping the architecture open and fluid.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=92",
  },
  {
    name: "STAIRCASE",
    title: "Upward, naturally.",
    description:
      "A sculptural transition connects the entertaining spaces below with the more private rooms above.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=92",
  },
  {
    name: "BEDROOM",
    title: "A quieter side of the city.",
    description:
      "Soft daylight and restrained materials create a private retreat above the energy of Toronto.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=92",
  },
  {
    name: "THE VIEW",
    title: "Toronto, framed.",
    description:
      "The city becomes part of the residence through expansive glazing and carefully considered sightlines.",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2400&q=92",
  },
];

export default function ImmersiveWalkthrough() {
  const root = useRef(null);
  const imageRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const images = imageRefs.current;

    images.forEach((image, index) => {
      gsap.set(image, {
        opacity: index === 0 ? 1 : 0,
        scale: index === 0 ? 1 : 1.08,
        x: 0,
      });
    });

    let current = 0;

    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = max > 0 ? window.scrollY / max : 0;
      const position = progress * (rooms.length - 1);

      const index = Math.floor(position);
      const amount = position - index;

      const next = Math.min(index + 1, rooms.length - 1);

      if (index !== current) {
        current = index;
        setActive(index);
      }

      images.forEach((image, i) => {
        if (!image) return;

        if (i === index) {
          gsap.set(image, {
            opacity: 1 - amount,
            scale: 1 + amount * 0.035,
            x: -amount * 12,
          });
        } else if (i === next) {
          gsap.set(image, {
            opacity: amount,
            scale: 1.035 - amount * 0.035,
            x: (1 - amount) * 12,
          });
        } else {
          gsap.set(image, {
            opacity: 0,
            scale: 1.035,
            x: 0,
          });
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  const room = rooms[active];

  return (
    <main
      ref={root}
      style={{
        height: `${rooms.length * 120}vh`,
        background: "#111",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {rooms.map((item, index) => (
          <img
            key={item.name}
            ref={(element) => {
              imageRefs.current[index] = element;
            }}
            src={item.image}
            alt={item.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              willChange: "transform, opacity",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(0,0,0,.48), rgba(0,0,0,.04) 65%), linear-gradient(0deg, rgba(0,0,0,.42), transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 30,
            left: 40,
            right: 40,
            display: "flex",
            justifyContent: "space-between",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: 10,
            letterSpacing: ".18em",
          }}
        >
          <span>ATELIER TORONTO</span>
          <span>PRIVATE RESIDENCE · 2026</span>
        </div>

        <div
          style={{
            position: "absolute",
            left: "6vw",
            bottom: "9vh",
            color: "white",
            maxWidth: 650,
          }}
        >
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 10,
              letterSpacing: ".2em",
              marginBottom: 18,
              opacity: 0.72,
            }}
          >
            {room.name}
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: "Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(42px, 6vw, 88px)",
              lineHeight: 0.95,
              letterSpacing: "-.045em",
            }}
          >
            {room.title}
          </h1>

          <p
            style={{
              margin: "24px 0 0",
              maxWidth: 520,
              fontFamily: "Arial, sans-serif",
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(255,255,255,.78)",
            }}
          >
            {room.description}
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            right: 40,
            bottom: "9vh",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: 10,
            letterSpacing: ".16em",
            writingMode: "vertical-rl",
            opacity: 0.7,
          }}
        >
          SCROLL TO EXPLORE
        </div>

        <div
          style={{
            position: "absolute",
            right: 40,
            top: 30,
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: 10,
            letterSpacing: ".15em",
          }}
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(rooms.length).padStart(2, "0")}
        </div>
      </div>
    </main>
  );
}
