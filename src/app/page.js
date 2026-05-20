"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Undo2,
  Camera,
  Compass,
  Heart,
  Sparkles,
  Move,
  ArrowRight,
  Maximize2,
  Calendar,
  MapPin,
  Sliders,
  Film,
  Users,
  Globe,
  Award,
  MessageSquare,
  CheckCircle,
  Menu
} from "lucide-react";

// Portfolio images configuration
// Sourced from /public directory & custom tailored for Harshit Sharma
const INITIAL_IMAGES = [
  {
    id: 1,
    src: "/HEERAMANDI CODED.mp4",
    alt: "Heeramandi Coded",
    title: "Heeramandi Coded",
    category: "Cinematic Showcase",
    year: "2026",
    location: "Jhansi, India",
    metadata: "RED V-Raptor • 50mm T1.5 Cine",
    description: "An elegant, richly textured cinematic production inspired by classic royal Indian aesthetics.",
    aspect: "aspect-[3/4]",
    sizeClass: "w-80 md:w-96 lg:w-[28rem]",
    top: "8%",
    left: "5%",
    rotation: "-3deg",
    zIndex: 10,
  },
  {
    id: 2,
    src: "/INSTA.mp4",
    alt: "Raag Festival",
    title: "Raag Festival",
    category: "Festival Cinematography",
    year: "2025",
    location: "Jhansi, India",
    metadata: "Sony A7IV • 85mm f/1.4 GM",
    description: "Romantic portraits framed against royal architecture and golden-hour light to celebrate the beginning of a lifelong journey.",
    aspect: "aspect-[3/4]",
    sizeClass: "w-80 md:w-96 lg:w-[28rem]",
    top: "18%",
    left: "48%",
    rotation: "2deg",
    zIndex: 12,
  },
  {
    id: 3,
    src: "/Sequence 01_4.mp4",
    alt: "The Editorial Frame",
    title: "The Editorial Frame",
    category: "Fashion Campaign",
    year: "2025",
    location: "Jhansi, UttarPradesh, India",
    metadata: "ARRI Alexa Mini LF • Signature Primes",
    description: "A premium fashion editorial focused on texture, movement, and refined visual aesthetics.",
    aspect: "aspect-[3/4]",
    sizeClass: "w-80 md:w-96 lg:w-[28rem]",
    top: "58%",
    left: "10%",
    rotation: "4deg",
    zIndex: 11,
  },
  {
    id: 4,
    src: "/video1.mp4",
    alt: "Crafted to Inspire",
    title: "Crafted to Inspire",
    category: "Commercial Videography",
    year: "2026",
    location: "Jhansi, India",
    metadata: "Sony FX6 • Sigma Cine Lenses",
    description: "A cinematic brand film designed to showcase product craftsmanship and create a memorable customer experience.",
    aspect: "aspect-[3/4]",
    sizeClass: "w-80 md:w-96 lg:w-[28rem]",
    top: "54%",
    left: "70%",
    rotation: "-4deg",
    zIndex: 14,
  },
  {
    id: 5,
    src: "/video2.mp4",
    alt: "Echoes of the Himalayas",
    title: "Echoes of the Himalayas",
    category: "Travel Documentary",
    year: "2025",
    location: "Jhansi, India",
    metadata: "DJI Mavic 3 Pro • Sony FX3",
    description: "A visually immersive exploration of landscapes, culture, and spirituality in the mountains of northern India.",
    aspect: "aspect-[3/4]",
    sizeClass: "w-80 md:w-96 lg:w-[28rem]",
    top: "5%",
    left: "73%",
    rotation: "3deg",
    zIndex: 13,
  },
  {
    id: 6,
    src: "/video3.mp4",
    alt: "Faces & Stories",
    title: "Faces & Stories",
    category: "Portrait Cinematography",
    year: "2026",
    location: "Jhansi, Uttar Pradesh, India",
    metadata: "Sony A7SIII • 50mm f/1.2 GM",
    description: "Authentic cinematic portraiture that captures personality, expression, and genuine emotion.",
    aspect: "aspect-[3/4]",
    sizeClass: "w-80 md:w-96 lg:w-[28rem]",
    top: "76%",
    left: "44%",
    rotation: "-6deg",
    zIndex: 15,
  }
];

export default function Home() {
  const [images, setImages] = useState(INITIAL_IMAGES);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isResetting, setIsResetting] = useState(false);
  const [likes, setLikes] = useState({});
  const [draggedId, setDraggedId] = useState(null);
  const canvasRef = useRef(null);

  // HARSHIT HERO CARD DECK SHOWCASE
  const [deck, setDeck] = useState([
    { id: 'h1', src: "/harshit1.png", alt: "Harshit Portrait 1", title: "THE VISION", subtitle: "CINEMATOGRAPHY" },
    { id: 'h2', src: "/harshit2.png", alt: "Harshit Portrait 2", title: "THE MOMENT", subtitle: "CREATIVE DIRECTING" },
    { id: 'h3', src: "/harshit3.png", alt: "Harshit Portrait 3", title: "THE FRAME", subtitle: "PHOTOGRAPHY" }
  ]);
  const [shufflingId, setShufflingId] = useState(null);

  // Auto-shuffle timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (deck.length === 0) return;
      const topCard = deck[deck.length - 1];
      setShufflingId(topCard.id);

      setTimeout(() => {
        setDeck(prevDeck => {
          const newDeck = [...prevDeck];
          const popped = newDeck.pop();
          newDeck.unshift(popped);
          return newDeck;
        });
        setShufflingId(null);
      }, 600); // 600ms matches the slide-out duration
    }, 4500); // Shuffle every 4.5 seconds

    return () => clearInterval(interval);
  }, [deck]);

  // Vibe toggle (purely visual for custom premium aesthetic)
  const [isAtmosphericMode, setIsAtmosphericMode] = useState(true);

  // Responsiveness and mobile navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Resize listener for dynamic layout configuration
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Testimonials slide state & auto-advance effect (6 seconds)
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonialsCount = 3; // Length of testimonials array

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonialsCount);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Contact form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "wedding", message: "" });

  // Differentiate between click and drag
  const dragStartCoords = useRef({ x: 0, y: 0 });

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    dragStartCoords.current = { x: clientX, y: clientY };
  };

  const handleDragEnd = (e, id) => {
    setDraggedId(null);
  };

  const handleCardClick = (image, e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    // Calculate drag distance
    const dist = Math.hypot(
      clientX - dragStartCoords.current.x,
      clientY - dragStartCoords.current.y
    );

    // If moved less than 5px, it is considered a click rather than a drag
    if (dist < 5 || isNaN(dist)) {
      setSelectedImage(image);
    }
  };

  const handleResetCanvas = () => {
    setIsResetting(true);
    // Deep copy to trigger animation
    setImages(INITIAL_IMAGES.map((img, idx) => ({
      ...img,
      rotation: `${(Math.random() * 8 - 4).toFixed(1)}deg` // add slight organic variety on reset
    })));
    setTimeout(() => setIsResetting(false), 800);
  };

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "wedding", message: "" });
    }, 4000);
  };

  const testimonials = [
    {
      quote: "Harshit transformed our wedding into a beautiful cinematic story. Every moment feels alive.",
      client: "Rohan & Riya",
      project: "Destination Wedding, Jaipur"
    },
    {
      quote: "The brand film exceeded our expectations and elevated our marketing completely. Incredible attention to detail.",
      client: "Siddharth Malhotra",
      project: "Brand Director, Crafted India"
    },
    {
      quote: "Professional, creative, and incredibly easy to work with. The frames captured are absolute masterpieces.",
      client: "Aisha Sen",
      project: "Fashion Campaign Stylist"
    }
  ];

  return (
    <div id="top" className="min-h-screen relative flex flex-col justify-between selection:bg-brand-accent selection:text-white">
      {/* Editorial Navigation */}
      <header className="w-full py-6 px-6 md:px-12 flex justify-between items-center border-b border-zinc-900/60 sticky top-0 bg-brand-bg/85 backdrop-blur-md z-40 transition-all duration-300">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-brand-accent animate-pulse" />
          <span className="font-display font-bold text-lg md:text-xl tracking-[0.2em] text-brand-text">
            HARSHIT SHARMA
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] font-medium text-zinc-400">
          <a href="#canvas" className="hover:text-brand-text transition-colors duration-200 uppercase relative py-1 group">
            Portfolio
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#about" className="hover:text-brand-text transition-colors duration-200 uppercase relative py-1 group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#services" className="hover:text-brand-text transition-colors duration-200 uppercase relative py-1 group">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#workflow" className="hover:text-brand-text transition-colors duration-200 uppercase relative py-1 group">
            Workflow
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#testimonials" className="hover:text-brand-text transition-colors duration-200 uppercase relative py-1 group">
            Testimonials
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-accent transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAtmosphericMode(!isAtmosphericMode)}
            className={`p-2 rounded-full border transition-all duration-300 ${isAtmosphericMode
              ? "border-brand-accent/50 text-brand-accent bg-brand-accent/5"
              : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            title="Toggle Atmospheric Mode"
          >
            <Sliders className="w-4 h-4" />
          </button>
          <a
            href="#contact"
            className="px-5 py-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 rounded-sm"
          >
            Book Shoot
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">

        {/* Poetic Editorial Hero Section */}
        <section className="pt-16 pb-10 px-6 md:px-12 max-w-7xl mx-auto z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-brand-accent font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>India-Based Photographer & Filmmaker</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] uppercase">
              Capturing Stories <br />
              <span className="text-outline transition-all duration-500 hover:text-brand-text">That Live Beyond Time</span>
            </h1>

            <p className="mt-6 text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-xl">
              From weddings and pre-weddings to fashion films, travel documentaries, and brand campaigns, I create cinematic visuals that preserve emotions, culture, and authenticity in every frame.
            </p>

            <div className="pt-6 flex items-center space-x-4">
              <a
                href="#canvas"
                className="px-6 py-3 bg-brand-accent hover:bg-white text-white hover:text-brand-bg text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
              >
                Book a Shoot
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end text-left md:text-right text-xs text-zinc-500 space-y-2 border-l md:border-l-0 md:border-r border-zinc-800/80 pl-4 md:pl-0 md:pr-4">
            <span className="font-semibold text-brand-accent uppercase tracking-widest">Photography • Cinematography • Editing</span>
            <span>Available Across India & Worldwide</span>
            <span className="font-display italic text-zinc-600">Visual Storyteller</span>
          </div>

          {/* HARSHIT CARD DECK */}
          <div className="relative block w-[280px] sm:w-[320px] h-[390px] sm:h-[450px] flex-shrink-0 z-10 mx-auto lg:mx-0 lg:mr-12 mt-12 lg:mt-0 select-none overflow-visible">
            <AnimatePresence mode="popLayout">
              {deck.map((card, i) => {
                const isShuffling = shufflingId === card.id;

                // Position calculations based on array index (stack position)
                // index 0: bottom of stack, index 1: middle, index 2: top
                let xOffset = 0;
                let yOffset = 0;
                let rotateDeg = 0;
                let scaleVal = 1;
                let zIndexVal = i * 10;

                if (i === 0) {
                  xOffset = isMobile ? -14 : -22;
                  yOffset = isMobile ? 12 : 18;
                  rotateDeg = -8;
                  scaleVal = 0.92;
                } else if (i === 1) {
                  xOffset = isMobile ? 8 : 12;
                  yOffset = isMobile ? -6 : -8;
                  rotateDeg = 4;
                  scaleVal = 0.96;
                } else if (i === 2) {
                  xOffset = 0;
                  yOffset = 0;
                  rotateDeg = -2;
                  scaleVal = 1;
                }

                // If the card is the top one shuffling out, animate it sliding away
                const animateProps = isShuffling
                  ? {
                    x: isMobile ? 170 : 290, // Slide out less on mobile to prevent clipping
                    y: isMobile ? -55 : -25, // Slide up more on mobile to give a neat arc
                    rotate: isMobile ? 12 : 18,
                    scale: 1.04,
                    zIndex: 40,
                  }
                  : {
                    x: xOffset,
                    y: yOffset,
                    rotate: rotateDeg,
                    scale: scaleVal,
                    zIndex: zIndexVal,
                  };

                return (
                  <motion.div
                    key={card.id}
                    animate={animateProps}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 18,
                      mass: 1
                    }}
                    className="absolute top-0 left-0 w-[260px] sm:w-[290px] cursor-pointer"
                    style={{ transformOrigin: "center bottom" }}
                    onClick={() => {
                      // Manual shuffle trigger on click! This makes it extremely interactive.
                      if (!shufflingId && i === deck.length - 1) {
                        setShufflingId(card.id);
                        setTimeout(() => {
                          setDeck(prevDeck => {
                            const newDeck = [...prevDeck];
                            const popped = newDeck.pop();
                            newDeck.unshift(popped);
                            return newDeck;
                          });
                          setShufflingId(null);
                        }, 600);
                      }
                    }}
                  >
                    {/* Polaroid Frame */}
                    <div className="bg-[#090d1a]/95 border border-zinc-800/80 p-3.5 pb-9 shadow-2xl rounded-sm backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/40 hover:bg-[#0d1527] group">
                      {/* Image Wrapper */}
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-zinc-900 bg-zinc-950">
                        <img
                          src={card.src}
                          alt={card.alt}
                          className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Overlay shadow / glare reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Subtle glass reflection sheet */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Premium Bottom Caption Info */}
                      <div className="mt-3.5 flex justify-between items-end px-1">
                        <div className="flex flex-col">
                          <span className="font-display font-bold text-[11px] tracking-[0.15em] text-brand-text group-hover:text-brand-accent transition-colors duration-200 uppercase">
                            {card.title}
                          </span>
                          <span className="text-[7.5px] uppercase tracking-widest text-zinc-500 mt-1 font-semibold">
                            {card.subtitle}
                          </span>
                        </div>
                        <span className="text-[8.5px] font-mono text-zinc-600 group-hover:text-brand-accent/50 transition-colors duration-200">
                          0{3 - i} / 03
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Decorative Ambient Glow */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-accent/15 blur-3xl rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
          </div>
        </section>


        {/* Gallery Control Bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-center items-center border-t border-zinc-900">
          <div className="flex items-center space-x-3 text-xs text-zinc-500">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span className="uppercase tracking-[0.15em] font-medium text-center">
              Hover to play audio • Click to expand cinematic details
            </span>
          </div>
        </div>

        {/* The Interactive Scattered Moodboard Canvas */}
        <section
          id="canvas"
          ref={canvasRef}
          className="relative w-full min-h-[125vh] md:min-h-[145vh] lg:min-h-[165vh] bg-[#020617] border-y border-zinc-900/60 overflow-hidden select-none"
          style={{
            backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        >
          {/* Subtle instructions watermark behind images */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
            <span className="font-display font-extrabold text-[10vw] tracking-widest select-none uppercase">
              HARSHIT
            </span>
          </div>

          {/* Table-like aligned grid container */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-6 md:p-10">
            <AnimatePresence>
              {images.map((image) => {
                const isDragged = draggedId === image.id;
                const hasLiked = likes[image.id];

                return (
                  <motion.div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    onMouseEnter={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      if (video) {
                        video.muted = false;
                        video.volume = 0.3;
                        video.play().catch(() => { });
                      }
                    }}
                    onMouseLeave={(e) => {
                      const video = e.currentTarget.querySelector("video");
                      if (video) {
                        video.muted = true;
                      }
                    }}
                    style={{
                      position: "relative",
                      top: "auto",
                      left: "auto",
                      zIndex: image.zIndex,
                      rotate: image.rotation,
                      touchAction: "auto"
                    }}
                    whileHover={{
                      scale: 1.04,
                      rotate: 0,
                      zIndex: 90,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    whileTap={{
                      scale: 0.98
                    }}
                    className={`cursor-pointer group ${image.sizeClass} select-none w-full`}
                  >
                    {/* Polaroid/Mat Frame */}
                    <div className="bg-[#090d1a]/95 border border-zinc-800/80 p-3 pb-8 md:p-4 md:pb-12 shadow-2xl rounded-sm backdrop-blur-sm transition-colors duration-300 group-hover:border-brand-accent/30 group-hover:bg-[#0d1527]">
                      <div
                        className={`relative ${image.aspect} overflow-hidden bg-zinc-950 rounded-sm mb-3 md:mb-4 border border-zinc-900`}
                      >
                        {/* Atmospheric low-saturation effect that goes colorful on hover */}
                        <video
                          src={image.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className={`w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ease-out ${isAtmosphericMode
                            ? "grayscale contrast-[1.05] brightness-[0.95] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105"
                            : "group-hover:scale-105"
                            }`}
                        />

                        {/* Overlay gradient shadow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Heart & Maximize quick triggers */}
                        <div className="absolute top-2.5 right-2.5 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                          <button
                            onClick={(e) => handleLike(image.id, e)}
                            className={`p-1.5 rounded-full backdrop-blur-md border text-xs transition-colors duration-200 ${hasLiked
                              ? "bg-brand-accent border-brand-accent text-white"
                              : "bg-black/50 border-white/10 text-white hover:bg-black/80"
                              }`}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${hasLiked ? "fill-current text-white" : ""
                                }`}
                            />
                          </button>
                          <div className="p-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Handwritten Style Caption */}
                      <div className="flex justify-between items-end px-0.5">
                        <div className="flex flex-col">
                          <span className="font-display italic text-xs tracking-wider text-zinc-300 group-hover:text-brand-accent transition-colors duration-200">
                            {image.title}
                          </span>
                          <span className="text-[9px] uppercase tracking-widest text-zinc-500 mt-1 font-medium">
                            {image.category}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-600">
                          /{image.id.toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-zinc-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold block">
                  About Me
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase leading-tight tracking-tight">
                  I Don't Just Take Photos — <br />
                  <span className="text-brand-accent">I Preserve Emotions</span>
                </h2>
              </div>

              <div className="w-12 h-[1px] bg-brand-accent" />

              {/* Core Values List */}
              <div className="space-y-4 pt-2">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono">Core Values</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Story-Driven Visuals",
                    "Cinematic Editing",
                    "Authentic Emotions",
                    "Premium Client Experience"
                  ].map((value, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      <span className="text-xs tracking-wider font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              <p>
                I’m <strong>Harshit Sharma</strong>, a professional photographer and videographer based in India. My work blends technical precision with artistic storytelling to create visuals that feel honest, cinematic, and emotionally powerful.
              </p>
              <p>
                Whether documenting destination weddings, producing corporate brand films, directing fashion campaigns, or capturing raw portrait sessions, my ultimate goal is to turn real, passing moments into beautiful, timeless memories.
              </p>
              <p className="border-l border-brand-accent/40 pl-4 italic text-zinc-200 font-serif text-base py-1">
                "Every frame should make you feel something."
              </p>
            </div>
          </div>
        </section>

        {/* Statistics Banner */}
        <section className="py-16 bg-[#090d1a]/60 border-t border-b border-zinc-900/60">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: "150+", label: "Projects Completed", icon: CheckCircle },
                { number: "80+", label: "Happy Clients", icon: Users },
                { number: "20+", label: "Cities Covered", icon: Globe },
                { number: "5+", label: "Years of Experience", icon: Award }
              ].map((stat, idx) => {
                const StatIcon = stat.icon;
                return (
                  <div key={idx} className="space-y-2 group">
                    <div className="mx-auto w-8 h-8 rounded-full bg-brand-accent/5 flex items-center justify-center text-brand-accent group-hover:scale-110 transition-transform duration-300">
                      <StatIcon className="w-4 h-4" />
                    </div>
                    <div className="font-display text-2xl md:text-4xl font-black text-white">{stat.number}</div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 md:px-12 bg-zinc-950/40">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold">
                Professional Services Across India
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
                Our Services
              </h2>
              <div className="w-12 h-[1px] bg-brand-accent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Wedding Photography & Films",
                  description: "Complete, beautiful coverage of weddings, engagements, and grand destination celebrations with cinematic highlights and premium printed keepsake albums.",
                  icon: Film,
                },
                {
                  title: "Pre-Wedding Shoots",
                  description: "Concept-driven, romantic photographic journeys at iconic royal locations and scenic heritage grounds with guided posing and cinematic narrative integration.",
                  icon: Compass,
                },
                {
                  title: "Commercial & Brand Films",
                  description: "High-quality corporate promotional reels, advertisements, and product films tailored to showcase brand craftsmanship and elevate customer outreach.",
                  icon: Sparkles,
                },
                {
                  title: "Fashion Photography",
                  description: "High-concept editorial styling, designer lookbooks, and high-fashion modeling portfolio shoots focused on clean aesthetics and textures.",
                  icon: Camera,
                },
                {
                  title: "Portrait Sessions",
                  description: "Professional, high-impact headshots and artistic close-up portraits for personal branding, corporate executive profiles, and creative social portfolios.",
                  icon: Users,
                },
                {
                  title: "Travel & Documentary Films",
                  description: "Story-focused documentary production capturing remote landscapes, visual anthropology, local cultures, and real human experiences.",
                  icon: Globe,
                }
              ].map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="p-8 bg-[#090d1a] border border-zinc-900/60 hover:border-brand-accent/20 rounded-sm hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-6">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/5 flex items-center justify-center text-brand-accent">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-display text-base font-bold uppercase tracking-wider text-brand-text">
                        {service.title}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="workflow" className="py-24 px-6 md:px-12 border-t border-b border-zinc-900/60 bg-[#090d1a]/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold">
                Our Creative Process
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
                How We Work
              </h2>
              <div className="w-12 h-[1px] bg-brand-accent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
              {[
                { step: "01", title: "Consultation", desc: "Discuss your creative vision, guidelines, timelines, and custom shoot requirements." },
                { step: "02", title: "Planning", desc: "Finalize visual concepts, location schedules, mood boards, and aesthetic shot lists." },
                { step: "03", title: "Production", desc: "Professional capture using high-end cinema gears and raw camera systems." },
                { step: "04", title: "Editing", desc: "Detailed post-production containing color grading, retouching, and musical scoring." },
                { step: "05", title: "Delivery", desc: "Receive final handcrafted print books and digital links in full high-resolution." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-[#090d1a] border border-zinc-900 rounded-sm relative group hover:border-brand-accent/20 transition-all duration-300">
                  <span className="font-mono text-3xl font-black text-brand-accent/15 group-hover:text-brand-accent/30 transition-colors block mb-2">
                    {item.step}
                  </span>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-2">{item.title}</h3>
                  <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
          <div className="space-y-4 mb-12">
            <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold block">
              Words from Clients
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
              Client Testimonials
            </h2>
            <div className="w-12 h-[1px] bg-brand-accent mx-auto" />
          </div>

          <div className="relative overflow-hidden min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 max-w-2xl"
              >
                <MessageSquare className="w-8 h-8 text-brand-accent/30 mx-auto" />
                <p className="text-sm md:text-lg text-zinc-300 font-light leading-relaxed italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="space-y-1">
                  <div className="font-display text-xs uppercase tracking-widest text-white font-bold">
                    {testimonials[currentTestimonial].client}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                    {testimonials[currentTestimonial].project}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Nav dots */}
          <div className="flex justify-center space-x-2.5 pt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentTestimonial === idx
                  ? "bg-brand-accent w-6"
                  : "bg-zinc-800 hover:bg-zinc-600"
                  }`}
              />
            ))}
          </div>
        </section>

        {/* Contact CTA Section */}
        <section id="contact" className="py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-semibold block">
                  Get In Touch
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  Let's Create <br />
                  <span className="text-outline hover:text-brand-text transition-colors duration-300">Something</span> <br />
                  <span>Memorable</span>
                </h2>
              </div>
              <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                Available for weddings, pre-weddings, commercial brand projects, and creative filmmaking collaborations across India and internationally.
              </p>

              <div className="w-10 h-[1px] bg-brand-accent" />

              {/* Indian Local Contact details */}
              <div className="space-y-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span>Prayagraj, Uttar Pradesh, India</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-brand-accent" />
                  <a href="mailto:hello@harshitsharma.in" className="hover:text-brand-accent transition-colors">hello@harshitsharma.in</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Film className="w-4 h-4 text-brand-accent" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
              </div>
            </div>

            {/* Interactive Form Column */}
            <div className="lg:col-span-7 p-6 pr-400 md:p-8 bg-[#090d1a] border border-zinc-900 rounded-sm">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12"
                  >
                    <CheckCircle className="w-12 h-12 text-brand-accent animate-bounce" />
                    <h3 className="font-display text-lg font-bold uppercase tracking-widest text-white">Inquiry Received</h3>
                    <p className="text-xs text-zinc-400 max-w-sm font-light leading-relaxed">
                      Thank you for reaching out. Harshit Sharma will review your requirements and connect with you shortly via phone/email.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Harshit Sharma"
                          className="w-full bg-[#020617] border border-zinc-900 rounded-sm p-3 text-xs text-white placeholder-zinc-700 focus:border-brand-accent/50 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="hello@harshitsharma.in"
                          className="w-full bg-[#020617] border border-zinc-900 rounded-sm p-3 text-xs text-white placeholder-zinc-700 focus:border-brand-accent/50 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#020617] border border-zinc-900 rounded-sm p-3 text-xs text-white placeholder-zinc-700 focus:border-brand-accent/50 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">Interested Service</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#020617] border border-zinc-900 rounded-sm p-3 text-xs text-white focus:border-brand-accent/50 outline-none transition-colors"
                        >
                          <option value="wedding">Wedding Cinematography</option>
                          <option value="pre-wedding">Pre-Wedding Shoot</option>
                          <option value="commercial">Commercial Film</option>
                          <option value="fashion">Fashion Campaign</option>
                          <option value="portrait">Portrait Sessions</option>
                          <option value="travel">Travel Documentary</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest font-mono text-zinc-500">Message / Visual Requirements</label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your special location, timeline, shoot requirements, and creative ideas..."
                        className="w-full bg-[#020617] border border-zinc-900 rounded-sm p-3 text-xs text-white placeholder-zinc-700 focus:border-brand-accent/50 outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-brand-accent text-white font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-brand-bg transition-colors duration-300 rounded-sm flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>Book Your Shoot</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t border-zinc-900 bg-black/40 text-xs text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <span className="font-display font-bold text-brand-text tracking-[0.2em]">HARSHIT SHARMA</span>
          <span>© {new Date().getFullYear()} Harshit Sharma. All Rights Reserved.</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] uppercase tracking-widest">
          <a href="#canvas" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center space-x-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 flex items-center space-x-1 group">
            <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-brand-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            <span className="hidden sm:inline text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">Instagram</span>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 flex items-center space-x-1 group">
            <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-brand-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
            <span className="hidden sm:inline text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">YouTube</span>
          </a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 flex items-center space-x-1 group">
            <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-brand-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /><path d="M18 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /><path d="M6 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /><circle cx="12" cy="12" r="3" /><circle cx="18" cy="12" r="3" /><circle cx="6" cy="12" r="3" /></svg>
            <span className="hidden sm:inline text-[9px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">Behance</span>
          </a>
        </div>
      </footer>

      {/* High-End Draggable Lightbox Portal (AnimatePresence) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#01030a]/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 transition-colors duration-200 z-50 cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-6xl w-full bg-[#090d1a] border border-zinc-800/80 rounded-sm shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] lg:max-h-[85vh] relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
              {/* Image Frame Panel */}
              <div className="lg:col-span-7 bg-black flex items-center justify-center p-4 min-h-[40vh] lg:min-h-0 relative overflow-hidden">
                <video
                  src={selectedImage.src}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="max-w-full max-h-[50vh] lg:max-h-[75vh] object-contain select-none shadow-2xl rounded-sm"
                />

                {/* Image details watermark inside panel */}
                <div className="absolute bottom-3 left-4 text-[9px] uppercase tracking-widest font-mono text-zinc-600">
                  {selectedImage.metadata.split(" • ")[0]}
                </div>
              </div>

              {/* Information Panel */}
              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#090d1a] border-t lg:border-t-0 lg:border-l border-zinc-900">
                <div className="space-y-6">
                  {/* Category and Index */}
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-1 text-[9px] font-semibold bg-brand-accent/5 border border-brand-accent/20 text-brand-accent uppercase tracking-widest rounded-sm">
                      {selectedImage.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Archive File No. /{selectedImage.id.toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title & Location details */}
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white">
                      {selectedImage.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-xs text-zinc-400 font-light">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-accent/70" />
                        <span>{selectedImage.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-accent/70" />
                        <span>{selectedImage.year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-10 h-[1px] bg-brand-accent/40" />

                  {/* Description */}
                  <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                    {selectedImage.description}
                  </p>

                  {/* Metadata Specs Box */}
                  <div className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-sm">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-2 flex items-center space-x-1">
                      <Camera className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Technical Specifications</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-300">
                      {selectedImage.metadata}
                    </span>
                  </div>
                </div>

                {/* Interaction Footer in Lightbox */}
                <div className="pt-6 border-t border-zinc-900 flex justify-between items-center gap-4 mt-6">
                  <button
                    onClick={(e) => handleLike(selectedImage.id, e)}
                    className={`flex-grow py-3 px-6 text-xs uppercase tracking-widest font-semibold border rounded-sm flex items-center justify-center space-x-2 transition-all duration-200 ${likes[selectedImage.id]
                      ? "bg-brand-accent border-brand-accent text-white"
                      : "border-zinc-800 hover:border-zinc-500 text-zinc-300 hover:text-white"
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${likes[selectedImage.id] ? "fill-current text-white" : ""}`} />
                    <span>{likes[selectedImage.id] ? "Loved" : "Appreciate"}</span>
                  </button>

                  <a
                    href={selectedImage.src}
                    download={`harshit-${selectedImage.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="p-3 border border-zinc-800 hover:border-zinc-500 text-zinc-400 hover:text-white rounded-sm transition-colors duration-200"
                    title="Download Frame"
                  >
                    <Maximize2 className="w-4 h-4 rotate-45" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
