import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 240;
const currentFrame = (index) => 
  `/assets/resource/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export default function Hero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images = [];
    const airpods = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    images[0].onload = render;

    function render() {
        if (!context || !images[airpods.frame]) return;
        
        const img = images[airpods.frame];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
        
        // Add a slight dark overlay to make text pop more
        context.fillStyle = "rgba(11, 15, 20, 0.4)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=400%", // 400vh scroll
            scrub: 0.5,
            pin: true,
        }
    });

    tl.to(airpods, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render
    });

    // Animate the text fading out slightly as we scroll
    gsap.to(textRef.current, {
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            scrub: true,
        },
        opacity: 0,
        y: -100,
        scale: 0.9,
    });

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        render();
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-deep-dark">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover"></canvas>
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center p-8 pointer-events-none z-10 mix-blend-screen text-center w-full">
        <h1 className="text-7xl md:text-[12rem] font-orbitron font-black text-white tracking-tighter leading-none" style={{ textShadow: "0 0 40px rgba(0, 240, 255, 0.5)"}}>SPEED</h1>
        <p className="mt-8 text-xl md:text-3xl text-neon-blue font-inter tracking-[0.3em] uppercase opacity-90 font-bold">Unleash the Future</p>
      </div>
    </div>
  );
}
