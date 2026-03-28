export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex items-center justify-between mix-blend-difference pointer-events-none">
            <div className="text-3xl font-orbitron font-black text-white tracking-tighter uppercase pointer-events-auto cursor-pointer">SPEED</div>
            <ul className="hidden md:flex items-center gap-10 font-inter text-sm tracking-[0.2em] text-white uppercase font-bold pointer-events-auto">
                <li className="hover:text-neon-blue transition-colors cursor-pointer nav-item relative group">
                    Models
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full"></span>
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer nav-item relative group">
                    Innovation
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full"></span>
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer nav-item relative group">
                    Specs
                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-neon-blue transition-all group-hover:w-full"></span>
                </li>
            </ul>
            <button className="px-8 py-3 border border-white/20 rounded-full text-white font-inter text-xs uppercase tracking-[0.1em] font-bold hover:bg-white hover:text-deep-dark transition-all pointer-events-auto">Pre-order</button>
        </nav>
    );
}
