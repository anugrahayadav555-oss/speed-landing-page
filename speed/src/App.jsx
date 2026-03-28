import Hero from './components/Hero';
import BikeShowcase from './components/BikeShowcase';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <div className="w-full bg-deep-dark text-white font-inter selection:bg-neon-blue selection:text-deep-dark antialiased overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <BikeShowcase />
      </main>
    </div>
  );
}

export default App;
