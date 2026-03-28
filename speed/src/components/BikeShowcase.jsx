import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const bikes = [
    {
        name: "SPEED X1",
        description: "Aerodynamic perfection honed in the wind tunnel. Carbon fiber unibody with integrated neo-drive system.",
        price: "$12,400",
        specs: ["Carbon Fiber", "15kg", "Neo-Drive"],
        color: "from-neon-blue/20 to-transparent",
        accent: "text-neon-blue"
    },
    {
        name: "SPEED RZ7",
        description: "The street predator. Aggressive geometry combined with hyper-responsive handling for the ultimate urban assault.",
        price: "$8,900",
        specs: ["Titanium Alloy", "18kg", "Urban-Drive"],
        color: "from-electric-red/20 to-transparent",
        accent: "text-electric-red"
    }
];

function InteractiveCard({ bike }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const tiltX = useTransform(springY, [-300, 300], [10, -10]);
    const tiltY = useTransform(springX, [-300, 300], [-10, 10]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full cursor-pointer relative block"
        >
            <motion.div 
                style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
                className={`relative w-full h-full p-8 md:p-12 rounded-3xl border border-white/5 bg-gradient-to-br ${bike.color} backdrop-blur-md transition-colors duration-500 hover:border-white/20 shadow-2xl overflow-hidden`}
            >
                {/* Glowing background blob */}
                <div className={`absolute -top-32 -right-32 w-64 h-64 bg-current opacity-30 blur-[100px] rounded-full pointer-events-none ${bike.accent}`}></div>

                <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
                    <h3 className={`text-4xl md:text-5xl font-black font-orbitron ${bike.accent} mb-6 tracking-tight`}>{bike.name}</h3>
                    <p className="text-gray-300 font-inter mb-8 leading-relaxed text-lg">{bike.description}</p>
                    <div className="flex flex-wrap gap-4 mb-12">
                        {bike.specs.map(spec => (
                            <span key={spec} className="px-4 py-1.5 rounded-full text-xs uppercase font-inter font-bold tracking-widest bg-white/5 text-gray-200 border border-white/10 shadow-inner backdrop-blur-sm">{spec}</span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-3xl font-bold text-white font-orbitron tracking-wider">{bike.price}</span>
                        <button className={`px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-inter hover:bg-white hover:text-deep-dark transition-all duration-300 uppercase tracking-widest text-sm font-bold`}>
                            Configure
                        </button>
                    </div>
                </div>
                
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none mix-blend-overlay"></div>
            </motion.div>
        </div>
    );
}

export default function BikeShowcase() {
    return (
        <section className="py-32 px-4 md:px-12 xl:px-24 bg-deep-dark min-h-screen relative z-10">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 text-center md:text-left">
                    <h2 className="text-5xl md:text-8xl font-orbitron font-black text-white mb-6 uppercase tracking-tighter"><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-electric-red">NEXT-GEN</span> HARDWARE</h2>
                    <p className="text-gray-400 max-w-3xl text-xl font-inter md:mx-0 mx-auto">Engineered for absolute performance. Every curve, every component is designed to defy physical limits and shatter expectations.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 perspective-[1200px]">
                    {bikes.map(bike => (
                        <InteractiveCard key={bike.name} bike={bike} />
                    ))}
                </div>
            </div>
        </section>
    );
}
