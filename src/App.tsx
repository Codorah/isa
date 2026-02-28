/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { 
  Heart, 
  Code, 
  Sparkles, 
  ChevronRight, 
  Star,
  Terminal,
  Cpu,
  Zap,
  Calendar,
  Rocket,
  MessageCircle,
  Clock,
  Check,
  Lock,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import img1 from "./assets/img1.jpeg";
import img2 from "./assets/img2.jpeg";
import img3 from "./assets/img3.jpeg";
import img4 from "./assets/img4.jpeg";


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants & Data ---

const BIRTH_DATE = new Date('2006-02-27T00:00:00');

const ENCOURAGEMENT_MESSAGES = [
  "Tu es plus forte que tu ne le penses.",
  "Continue d’écrire ton histoire.",
  "Le monde a besoin de ton esprit.",
  "Ta lumière est réelle.",
  "Tu inspires sans t’en rendre compte.",
  "20 ans… et ce n’est que le début.",
  "Tu es une preuve vivante que la persévérance existe.",
  "Ne doute jamais de ta valeur.",
  "Tu es belle dans ton authenticité.",
  "Ton futur est en train de te remercier.",
  "Chaque ligne de code que tu écris est un pas vers ton rêve.",
  "Ton courage est ta plus grande force.",
  "Reste fidèle à toi-même, c'est là que réside ta magie.",
  "Le succès n'est pas une destination, c'est ton voyage.",
  "Tu as le pouvoir de transformer tes rêves en réalité.",
  "Ta curiosité est une boussole précieuse.",
  "N'aie pas peur de briller, le monde a besoin de ta clarté.",
  "Tu es une développeuse de destinées.",
  "20 ans de style, de grâce et d'intelligence.",
  "Le meilleur reste à venir, et il sera brillant.",
  "Ta détermination est contagieuse.",
  "Tu es une étoile qui ne cesse de grandir.",
  "Ton intelligence n'a d'égale que ta gentillesse.",
  "Le code est ton art, et tu es une grande artiste.",
  "N'oublie jamais d'où tu viens, mais regarde toujours où tu vas.",
  "Ta résilience est ton super-pouvoir.",
  "Tu es l'héroïne de ta propre épopée.",
  "Le monde est plus beau parce que tu y es.",
  "Ta vision change les choses, petit à petit.",
  "Tu es capable de l'impossible.",
  "Ta force intérieure est inépuisable.",
  "Chaque défi est une opportunité déguisée.",
  "Tu es une source d'inspiration pour nous tous.",
  "Ton sourire est une ligne de code parfaite.",
  "Tu es la version 2.0 de la perfection.",
  "Ton potentiel est infini, comme l'univers.",
  "Tu es une créatrice de mondes.",
  "Ta passion est ton moteur le plus puissant.",
  "Tu es une lumière dans l'obscurité.",
  "Le futur appartient à ceux qui croient en leurs rêves, comme toi."
];

const WISHES = [
  "Que ton code compile toujours du premier coup !",
  "Une année remplie de nouveaux projets passionnants.",
  "Que ta beauté continue d'illuminer nos journées.",
  "Moins de bugs, plus de café (et de champagne) !",
  "Le succès dans tout ce que tu entreprends.",
  "Des moments inoubliables avec ceux que tu aimes.",
  "Que ton terminal soit toujours vert.",
  "Une santé de fer et une énergie débordante.",
  "Que chaque jour soit une nouvelle aventure.",
  "Un GPU qui ne chauffe jamais.",
  "Des pull requests validées instantanément.",
  "Une créativité sans limites.",
  "Des voyages aux quatre coins du monde.",
  "La paix intérieure et la joie constante.",
  "Une connexion fibre ultra-rapide partout.",
  "Des algorithmes qui s'optimisent tout seuls.",
  "Une inspiration infinie pour chaque ligne de code.",
  "La maîtrise totale de chaque nouveau framework.",
  "Des rencontres qui changent la donne.",
  "Une année 2026 absolument légendaire."
];

const TIMELINE_EVENTS = [
  { year: '2006', title: 'Naissance', desc: 'Le début d\'une aventure lumineuse.' },
  { year: '2015', title: 'Découverte du numérique', desc: 'Les premiers pas dans un monde de possibilités.' },
  { year: '2021', title: 'Début amitié', desc: 'Le début d\'une connexion précieuse et durable.' },
  { year: '2026', title: '20 ans', desc: 'Une étape puissante, un futur brillant.' }
];

const SPECIAL_CARDS = [
  { 
    icon: Heart, 
    title: 'Elle reste elle-même', 
    desc: 'Une authenticité rare et précieuse.', 
    longDesc: "Isabella possède cette force rare de rester fidèle à son essence. Avec son teint noir marron magnifique, elle célèbre sa beauté naturelle sans jamais chercher à se conformer aux standards des autres. Elle ne change pour personne, car elle sait que sa véritable valeur réside dans son authenticité inébranlable.",
    color: 'text-pink-400' 
  },
  { 
    icon: Code, 
    title: 'Elle est développeuse', 
    desc: 'Elle construit le futur, ligne par ligne.', 
    longDesc: "En tant que développeuse, elle ne se contente pas d'écrire du code ; elle façonne des mondes. Sa logique rigoureuse et sa créativité lui permettent de transformer des idées complexes en réalités numériques. Elle prouve chaque jour que la technologie est un art où elle excelle avec brio.",
    color: 'text-blue-400' 
  },
  { 
    icon: Sparkles, 
    title: 'Un style incroyable', 
    desc: 'Une élégance naturelle qui inspire.', 
    longDesc: "Son élégance n'est pas seulement vestimentaire, elle est une manière d'être. Isabella porte chaque tenue avec une assurance qui force l'admiration. Son style est le reflet de sa personnalité : audacieux, raffiné et toujours parfaitement en accord avec qui elle est.",
    color: 'text-purple-400' 
  },
  { 
    icon: MessageCircle, 
    title: 'Elle soutient les autres', 
    desc: 'Une présence constante et bienveillante.', 
    longDesc: "Sa bienveillance est un pilier pour son entourage. Elle possède cette capacité unique d'écouter sans juger et d'offrir un soutien indéfectible. Dans les moments de doute comme dans les moments de joie, sa présence est une lumière rassurante pour tous ceux qui ont la chance de la côtoyer.",
    color: 'text-emerald-400' 
  },
  { 
    icon: Zap, 
    title: 'Elle n’abandonne pas', 
    desc: 'Une persévérance à toute épreuve.', 
    longDesc: "La résilience est inscrite dans son ADN. Face aux défis, elle ne recule jamais. Chaque obstacle est pour elle une opportunité d'apprendre et de se renforcer. Sa détermination est une source d'inspiration constante, montrant que rien n'est impossible à celui qui refuse de baisser les bras.",
    color: 'text-yellow-400' 
  },
  { 
    icon: Rocket, 
    title: 'Elle évolue chaque jour', 
    desc: 'Une croissance continue et inspirante.', 
    longDesc: "Isabella est dans une quête perpétuelle d'excellence. Elle ne se repose jamais sur ses acquis et cherche toujours à devenir une meilleure version d'elle-même. Cette soif de croissance, tant personnelle que professionnelle, est le moteur d'un futur qui s'annonce déjà exceptionnel.",
    color: 'text-orange-400' 
  }
];

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%' 
          }}
          animate={{ 
            opacity: [0.1, 0.4, 0.1],
            y: [null, '-=150', '+=150'],
            x: [null, '+=30', '-=30']
          }}
          transition={{ 
            duration: 8 + Math.random() * 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={cn(
            "absolute w-1 h-1 rounded-full",
            i % 2 === 0 ? "bg-tech-pink shadow-[0_0_15px_#FF00FF]" : "bg-tech-cyan shadow-[0_0_15px_#00FFFF]"
          )}
        />
      ))}
    </div>
  );
};

// --- Sub-components ---

const AgeCounter = () => {
  const [age, setAge] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - BIRTH_DATE.getTime();
      
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setAge({ years, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-8">
      <div className="flex flex-col items-center">
        <span className="text-white text-lg md:text-xl font-bold">{age.years}</span>
        <span>Ans</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-white text-lg md:text-xl font-bold">{age.days}</span>
        <span>Jours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-white text-lg md:text-xl font-bold">{age.hours}</span>
        <span>Heures</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-white text-lg md:text-xl font-bold">{age.minutes}</span>
        <span>Min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-white text-lg md:text-xl font-bold">{age.seconds}</span>
        <span>Sec</span>
      </div>
    </div>
  );
};

const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
};

const InteractiveTerminal = () => {
  const [output, setOutput] = useState<string[]>([
    '> Initializing life.exe...', 
    '> Loading Isabella_Universe...',
    '> Type "help" for available commands.'
  ]);
  const [input, setInput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const runLife = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setOutput(prev => [...prev, '> run life.exe', '> Compiling courage...', '> Compiling style...', '> Compiling dreams...']);
    
    setTimeout(() => {
      setIsCompiling(false);
      setOutput(prev => [...prev, '> Compilation successful!', '> Status: Brilliant Future Guaranteed.']);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.8 },
        colors: ['#FF00FF', '#00FFFF', '#ffffff']
      });
    }, 2000);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isCompiling) return;

    const cmd = input.toLowerCase().trim();
    const newOutput = [...output, `> ${input}`];

    switch (cmd) {
      case 'help':
        setOutput([...newOutput, 'Available commands:', '  help - Show this help message', '  ls - List files and directories', '  clear - Clear terminal output', '  run life.exe - Execute life simulation', '  whoami - Display user profile']);
        break;
      case 'ls':
        setOutput([...newOutput, 'drwxr-xr-x  memories/', 'drwxr-xr-x  dreams/', 'drwxr-xr-x  projects/', '-rw-r--r--  life.exe', '-rw-r--r--  vision.log', '-rw-r--r--  isabella_v20.config']);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'run life.exe':
        runLife();
        break;
      case 'whoami':
        setOutput([...newOutput, 'User: Isabella', 'Role: Developer / Visionary', 'Status: Level 20 Unlocked']);
        break;
      default:
        setOutput([...newOutput, `Command not found: ${cmd}. Type "help" for assistance.`]);
    }
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl bg-tech-bg/90 border border-tech-cyan/20 rounded-none overflow-hidden shadow-2xl tech-border">
      <div className="bg-tech-bg/80 px-4 py-2 flex items-center gap-2 border-b border-white/10">
        <div className="w-3 h-3 rounded-none bg-tech-pink/50" />
        <div className="w-3 h-3 rounded-none bg-tech-cyan/50" />
        <div className="w-3 h-3 rounded-none bg-tech-purple/50" />
        <span className="ml-2 text-[10px] font-mono text-tech-cyan/40 uppercase tracking-widest">terminal — life.exe</span>
      </div>
      <div 
        ref={scrollRef}
        className="p-6 font-mono text-sm space-y-2 h-[300px] overflow-y-auto scrollbar-hide bg-tech-bg/40"
      >
        {output.map((line, i) => (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className={cn(line.startsWith('>') ? "text-tech-cyan" : "text-white/60", line.includes('successful') && "text-tech-pink font-bold text-glow-pink")}>
            {line}
          </motion.div>
        ))}
        {isCompiling && (
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-tech-cyan"
          >
            _
          </motion.div>
        )}
        {!isCompiling && (
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-tech-cyan font-bold">{'>'}</span>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none text-white w-full font-mono"
              autoFocus
            />
          </form>
        )}
      </div>
      <div className="p-4 bg-tech-bg/60 border-t border-white/10 flex justify-between items-center">
        <div className="text-[10px] font-mono text-tech-cyan/40 uppercase tracking-widest">
          if (courage && persévérance) return "brillant";
        </div>
        <button 
          onClick={runLife}
          disabled={isCompiling}
          className="px-4 py-2 bg-tech-cyan/10 hover:bg-tech-cyan/20 border border-tech-cyan/30 text-tech-cyan text-xs font-bold rounded-none transition-all flex items-center gap-2 uppercase tracking-widest"
        >
          <Terminal className="w-3 h-3" />
          RUN LIFE.EXE
        </button>
      </div>
    </div>
  );
};

const WishesBuff = () => {
  const [activeWishes, setActiveWishes] = useState<number[]>([]);

  const triggerBuff = (index: number) => {
    if (activeWishes.includes(index)) return;
    setActiveWishes(prev => [...prev, index]);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF00FF', '#00FFFF']
    });
  };

  return (
    <section id="wishes" className="py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-block p-3 bg-tech-purple/20 rounded-none mb-4 border border-tech-purple/30">
          <Zap className="w-6 h-6 text-tech-pink" />
        </div>
        <h2 className="font-display text-6xl font-bold uppercase tracking-tighter text-glow-cyan text-tech-cyan">Buff_Selector</h2>
        <p className="font-mono text-xs text-tech-pink/40 uppercase tracking-[0.5em]">Activate temporary power-ups for Isabella.v20</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WISHES.map((wish, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            viewport={{ once: true }}
            onClick={() => triggerBuff(i)}
            className={cn(
              "group cursor-pointer p-6 rounded-none border transition-all duration-500 relative overflow-hidden",
              activeWishes.includes(i) 
                ? "bg-tech-purple/20 border-tech-purple/50 shadow-[0_0_30px_rgba(112,0,255,0.2)]" 
                : "bg-tech-bg border-white/10 hover:border-tech-cyan/30"
            )}
          >
            {activeWishes.includes(i) && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -right-2 -top-2 text-tech-cyan/20"
              >
                <Sparkles size={60} />
              </motion.div>
            )}
            <div className="flex items-start gap-4 relative z-10">
              <div className={cn(
                "mt-1 w-2 h-2 rounded-none transition-all duration-500 shrink-0",
                activeWishes.includes(i) ? "bg-tech-cyan scale-150 shadow-[0_0_10px_#00FFFF]" : "bg-white/20"
              )} />
              <div>
                <p className={cn(
                  "font-mono transition-all duration-500 text-sm uppercase tracking-tight",
                  activeWishes.includes(i) ? "text-white text-glow-cyan" : "text-white/40 group-hover:text-white/60"
                )}>
                  {activeWishes.includes(i) ? wish : `[LOCKED_BUFF_${i+1}]`}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SurpriseModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState(ENCOURAGEMENT_MESSAGES[0]);
  const [isCycling, setIsCycling] = useState(true);
  const [finalMessage, setFinalMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsCycling(true);
      setFinalMessage(null);
      return;
    }

    let count = 0;
    const maxCycles = 40; // Number of rapid changes
    const interval = setInterval(() => {
      setCurrentMessage(ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)]);
      count++;
      
      if (count >= maxCycles) {
        clearInterval(interval);
        const final = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
        setFinalMessage(final);
        setIsCycling(false);
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FF00FF', '#00FFFF', '#ffffff']
        });
      }
    }, 60); // Speed of cycling

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-tech-bg/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass p-12 rounded-none max-w-xl w-full text-center space-y-10 relative overflow-hidden tech-border"
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-tech-cyan/20 via-transparent to-transparent" />
            </div>

            <div className="absolute -top-10 left-1/2 -translate-x-1/2 p-6 bg-tech-cyan text-tech-bg rounded-none shadow-[0_0_50px_rgba(0,255,255,0.4)]">
              <Sparkles size={40} />
            </div>

            <div className="pt-8 space-y-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.5em] text-tech-cyan/60">
                {isCycling ? "Searching_Perfect_Message..." : "Transmission_Received"}
              </h3>
              
              <div className="min-h-[120px] flex items-center justify-center">
                <motion.p 
                  key={currentMessage}
                  initial={isCycling ? { opacity: 0.5, y: 10, filter: 'blur(4px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  className={cn(
                    "font-display uppercase tracking-tighter leading-tight transition-all duration-300",
                    isCycling ? "text-3xl text-white/20" : "text-4xl md:text-5xl text-white font-bold text-glow-cyan"
                  )}
                >
                  "{isCycling ? currentMessage : finalMessage}"
                </motion.p>
              </div>
            </div>

            {!isCycling && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="h-px w-20 bg-tech-cyan/20 mx-auto" />
                <button 
                  onClick={onClose}
                  className="cyber-button w-full"
                >
                  <span className="relative z-10 text-xs uppercase tracking-widest">Close_&_Save_Wish</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Components ---

const Hero = ({ onSurprise }: { onSurprise: () => void }) => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-tech-bg">
      {/* Tech Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-tech-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-tech-pink/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <span className="px-6 py-2 rounded-none border border-tech-cyan/30 bg-tech-cyan/5 text-[10px] font-mono uppercase tracking-[0.5em] text-tech-cyan text-glow-cyan">
            System.Initialize(Isabella_v20.0)
          </span>
        </motion.div>
        
        <h1 className="font-display text-7xl md:text-9xl font-bold mb-8 tracking-tighter leading-[0.85] uppercase">
          <span className="text-white text-glow-purple">Isabella</span><br/>
          <span className="text-tech-pink text-glow-pink">Level 20</span>
        </h1>
        
        <p className="font-mono text-xs md:text-sm text-tech-cyan/60 mb-12 tracking-[0.4em] uppercase max-w-2xl mx-auto">
          <Typewriter text="> Accessing core_memories... > Loading future_vision... > Level 20 Initialization Complete." />
        </p>

        <div className="flex flex-col items-center gap-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSurprise}
            className="cyber-button"
          >
            <span className="relative z-10 flex items-center gap-4">
              Execute Surprise.exe
              <Sparkles className="w-5 h-5 animate-pulse" />
            </span>
          </motion.button>

          <AgeCounter />
        </div>
      </motion.div>

      {/* Decorative HUD elements */}
      <div className="absolute top-10 left-10 hidden lg:block opacity-30">
        <div className="w-40 h-40 border border-tech-cyan/20 rounded-full flex items-center justify-center">
          <div className="w-32 h-32 border border-tech-pink/20 rounded-full border-dashed animate-spin" />
          <Cpu className="absolute text-tech-cyan" size={24} />
        </div>
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:block opacity-30">
        <div className="font-mono text-[10px] text-tech-pink space-y-1">
          <p>LAT: 27.02.2006</p>
          <p>LNG: 27.02.2026</p>
          <p>STATUS: OPTIMAL</p>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto relative">
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-tech-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h2 className="font-display text-6xl font-bold uppercase tracking-tighter text-glow-cyan text-tech-cyan">User_Profile</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-tech-cyan to-transparent" />
          </div>

          <div className="glass p-10 rounded-none tech-border shadow-2xl">
            <div className="grid grid-cols-2 gap-8 font-mono text-[10px]">
              <div className="space-y-2">
                <span className="text-tech-cyan/40 uppercase tracking-[0.4em]">Identifier</span>
                <p className="text-white text-lg font-bold tracking-tight">ISABELLA</p>
              </div>
              <div className="space-y-2">
                <span className="text-tech-cyan/40 uppercase tracking-[0.4em]">Origin_Date</span>
                <p className="text-white text-lg font-bold tracking-tight">2006.02.27</p>
              </div>
              <div className="space-y-2">
                <span className="text-tech-cyan/40 uppercase tracking-[0.4em]">Current_Level</span>
                <p className="text-white text-lg font-bold tracking-tight">20.0</p>
              </div>
              <div className="space-y-2">
                <span className="text-tech-cyan/40 uppercase tracking-[0.4em]">Class</span>
                <p className="text-white text-lg font-bold tracking-tight">DEVELOPER</p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <span className="text-tech-cyan/40 font-mono text-[10px] uppercase tracking-[0.4em] block mb-6">Core_Traits</span>
              <div className="flex flex-wrap gap-3">
                {['Resilient', 'Visionary', 'Loyal', 'Authentic'].map(q => (
                  <span key={q} className="px-4 py-1.5 bg-tech-cyan/5 border border-tech-cyan/20 rounded-none text-[10px] font-mono text-tech-cyan hover:bg-tech-cyan/10 transition-colors">
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-16 -left-16 text-tech-pink/10">
            <Terminal size={160} />
          </div>
          <div className="relative z-10 space-y-10">
            <p className="font-display text-4xl md:text-5xl leading-[1.1] text-white font-bold uppercase tracking-tighter text-glow-pink">
              "She moves with courage, never compromising her essence. She keeps her identity, her style, her light."
            </p>
            <p className="font-mono text-lg text-tech-cyan/50 leading-relaxed">
              {'>'} Isabella is not just a software developer; she is the architect of her own reality. She codes, she learns, she evolves. Being both powerful and graceful — that's her signature.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SpecialSection = () => {
  const [selectedCard, setSelectedCard] = useState<typeof SPECIAL_CARDS[0] | null>(null);

  return (
    <section className="py-32 px-6 bg-tech-bg relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-tech-cyan/30 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-display text-6xl font-bold uppercase tracking-tighter text-glow-cyan text-tech-cyan">Special_Attributes</h2>
          <p className="font-mono text-xs text-tech-pink/40 uppercase tracking-[0.5em]">Unique traits of Isabella.v20</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIAL_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedCard(card)}
              className="glass p-10 rounded-none tech-border group transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] cursor-pointer"
            >
              <div className={cn("p-5 rounded-none bg-tech-bg border border-white/5 w-fit mb-8 group-hover:scale-110 transition-transform", card.color)}>
                <card.icon size={28} />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-tech-cyan transition-colors uppercase tracking-tighter">{card.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-mono">{card.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-tech-cyan/40 group-hover:text-tech-cyan transition-colors">
                <span>View_Data</span>
                <ChevronRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-tech-bg/95 backdrop-blur-xl"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass p-10 md:p-16 rounded-none tech-border max-w-2xl w-full relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-8 right-8 p-2 text-tech-cyan/40 hover:text-tech-cyan transition-all"
              >
                <X size={24} />
              </button>

              <div className={cn("p-6 rounded-none bg-tech-bg border border-white/10 w-fit mb-10", selectedCard.color)}>
                <selectedCard.icon size={48} />
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-glow-cyan text-tech-cyan uppercase tracking-tighter">{selectedCard.title}</h3>
                  <div className="h-1 w-20 bg-tech-cyan/30 rounded-full" />
                </div>
                
                <p className="font-mono text-xl md:text-2xl text-white/80 leading-relaxed italic">
                  "{selectedCard.longDesc}"
                </p>

                <div className="pt-10 border-t border-white/10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-tech-pink/40">
                    System_Log: Isabella_Attributes_Verified
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TimelineSection = () => {
  return (
    <section className="py-32 px-6 max-w-4xl mx-auto relative">
      <div className="absolute -right-20 top-0 w-64 h-64 bg-tech-pink/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="text-center mb-24 space-y-4">
        <h2 className="font-display text-6xl font-bold uppercase tracking-tighter text-glow-pink text-tech-pink">Life_Log</h2>
        <p className="font-mono text-xs text-tech-cyan/40 uppercase tracking-[0.5em]">Chronological data of Isabella.v20</p>
      </div>

      <div className="relative space-y-16">
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-tech-pink via-tech-purple to-transparent" />
        
        {TIMELINE_EVENTS.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-16 group"
          >
            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-none bg-tech-bg border border-tech-pink/30 flex items-center justify-center z-10 group-hover:border-tech-pink transition-colors duration-500">
              <div className="w-2 h-2 bg-tech-pink group-hover:scale-150 transition-transform duration-500" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-tech-pink font-bold text-xl tracking-tighter">{event.year}</span>
              <h3 className="font-display text-3xl font-bold text-white group-hover:text-glow-pink transition-all uppercase tracking-tighter">{event.title}</h3>
              <p className="font-mono text-white/40 text-lg leading-relaxed max-w-xl">{'>'} {event.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const GallerySection = () => {
  const images = [
    { url: img1, title: 'Style & Grâce' },
    { url: img2, title: 'Moment de Vie' },
    { url: img3, title: 'Inspiration' },
    { url: img4, title: 'Lumière' },
  ];

  return (
    <section id="gallery" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24 space-y-4">
        <h2 className="font-display text-6xl font-bold uppercase tracking-tighter text-glow-cyan text-tech-cyan">Visual_Data</h2>
        <p className="font-mono text-xs text-tech-pink/40 uppercase tracking-[0.5em]">Captured moments of Isabella.v20</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-none overflow-hidden bg-tech-bg border border-white/10 break-inside-avoid tech-border"
          >
            <img 
              src={img.url} 
              alt={img.title}
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tech-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <p className="font-mono text-xl uppercase tracking-tighter text-white text-glow-cyan">{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PersonalMessage = () => {
  return (
    <section className="py-32 px-6 max-w-4xl mx-auto">
      <div className="glass p-12 md:p-20 rounded-none relative overflow-hidden tech-border shadow-[0_0_100px_rgba(112,0,255,0.05)]">
        <div className="absolute top-0 right-0 p-8 text-tech-cyan/5">
          <Terminal size={300} />
        </div>
        
        <div className="relative z-10 space-y-12">
          <div className="space-y-4">
            <h2 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tighter text-glow-cyan text-tech-cyan">Secure_Transmission</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-tech-cyan to-transparent" />
          </div>

          <div className="space-y-10 font-mono text-2xl md:text-3xl text-white/90 leading-relaxed italic">
            <p className="text-glow-purple">
              {'>'} "Thank you for being this constant person. Thank you for the support you give without noise."
            </p>
            <p>
              {'>'} "You deserve the success you pursue. 20 years is not just an age — it's a powerful beginning."
            </p>
            <p className="not-italic text-tech-pink font-black text-4xl md:text-5xl tracking-tighter mt-12 uppercase text-glow-pink">
              Keep Coding, Isabella.
            </p>
          </div>

          <div className="pt-12 border-t border-white/10 flex items-center gap-6">
            <div className="w-16 h-16 rounded-none bg-tech-bg border border-tech-cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] flex items-center justify-center">
              <Cpu className="text-tech-cyan" size={32} />
            </div>
            <div>
              <p className="font-bold text-white text-lg">With all my admiration,</p>
              <p className="text-tech-cyan/60 text-xs font-mono uppercase tracking-[0.3em]">System_Admin & Friend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FutureLetter = () => {
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('✨');
  const [signature, setSignature] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSealing, setIsSealing] = useState(false);
  const whatsappNumber = "+228 98 32 18 28";

  const moods = ['✨', '💖', '🚀', '👩‍💻', '🔥', '🌈'];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSealing(true);
    
    // Simulate sealing process
    setTimeout(() => {
      setIsSealing(false);
      setIsSent(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.8 },
        colors: ['#FF00FF', '#00FFFF', '#ffffff']
      });
    }, 2500);
  };

  return (
    <section id="future-letter" className="py-32 px-6 max-w-5xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-tech-purple/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="text-center mb-20 space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="inline-block p-6 rounded-none bg-tech-pink/10 text-tech-pink mb-4 border border-tech-pink/20 shadow-[0_0_30px_rgba(255,0,255,0.2)]"
        >
          <Clock size={40} className="animate-pulse" />
        </motion.div>
        <h2 className="font-display text-6xl md:text-7xl font-bold uppercase tracking-tighter text-glow-pink text-tech-pink">Future_Upload (2031)</h2>
        <p className="font-mono text-xs text-tech-cyan/40 uppercase tracking-[0.5em]">Scheduling a data packet for Isabella.v25</p>
      </div>

      <div className="glass p-10 md:p-16 rounded-none border border-white/10 relative overflow-hidden tech-border shadow-2xl">
        <div className="absolute top-0 right-0 p-12 text-tech-cyan/5 pointer-events-none">
          <Rocket size={250} />
        </div>

        <div className="relative z-10 space-y-12">
          <div className="space-y-6 text-center">
            <p className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white/90 leading-relaxed max-w-3xl mx-auto text-glow-cyan">
              "The future version of you is proud of you today."
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-tech-cyan/40 to-transparent mx-auto" />
          </div>

          <AnimatePresence mode="wait">
            {isSealing ? (
              <motion.div
                key="sealing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20 flex flex-col items-center justify-center space-y-8"
              >
                <div className="relative w-32 h-32">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-tech-cyan/20 border-t-tech-cyan rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="text-tech-cyan" size={40} />
                  </div>
                </div>
                <div className="space-y-2 text-center">
                  <p className="font-mono text-tech-cyan text-sm uppercase tracking-[0.3em] animate-pulse">Encrypting Data Packet...</p>
                  <p className="text-white/40 text-xs font-mono">Preparing temporal transmission to 2031.02.27</p>
                </div>
              </motion.div>
            ) : !isSent ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSend}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-tech-cyan/60">Select_Mood_State</label>
                    <div className="flex gap-4">
                      {moods.map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMood(m)}
                          className={cn(
                            "w-12 h-12 rounded-none flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110",
                            mood === m ? "bg-tech-cyan/20 border border-tech-cyan/50 shadow-[0_0_15px_rgba(0,255,255,0.3)]" : "bg-white/5 border border-white/10 grayscale hover:grayscale-0"
                          )}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-tech-cyan/60 ml-4">Message_Content</label>
                    <textarea 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Dear Future Isabella, I hope you kept your spark... Don't forget to check your 20th birthday gallery!"
                      className="w-full h-56 bg-tech-bg border border-white/10 rounded-none p-8 font-mono text-xl text-white placeholder:text-white/10 focus:outline-none focus:border-tech-cyan/30 transition-all resize-none shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-tech-cyan/60 ml-4">Digital_Signature</label>
                      <input 
                        type="text"
                        required
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="Your name or a sweet word"
                        className="w-full bg-tech-bg border border-white/10 rounded-none p-5 font-mono italic text-white placeholder:text-white/10 focus:outline-none focus:border-tech-cyan/30 transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-tech-cyan/60 ml-4">Target_WhatsApp</label>
                      <div className="w-full bg-tech-bg border border-white/10 rounded-none p-5 font-mono text-tech-cyan/60 flex items-center gap-4">
                        <MessageCircle size={20} className="text-tech-cyan" />
                        {whatsappNumber}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-none bg-tech-purple/5 border border-tech-purple/20 flex items-center gap-4">
                    <div className="p-3 rounded-none bg-tech-purple/10 text-tech-purple">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-tech-purple/60">Scheduled_Delivery</p>
                      <p className="text-white font-bold font-mono">2031.02.27 (T+5 Years)</p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="cyber-button w-full"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Seal & Upload to Future
                    <Rocket className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </span>
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-10"
              >
                <div className="w-24 h-24 bg-tech-cyan/20 rounded-none flex items-center justify-center mx-auto border border-tech-cyan/40 shadow-[0_0_50px_rgba(0,255,255,0.2)]">
                  <Check className="text-tech-cyan" size={48} />
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-4xl font-bold text-glow-cyan text-tech-cyan uppercase tracking-tighter">Upload_Complete!</h3>
                  <p className="font-mono text-white/60 max-w-md mx-auto leading-relaxed">
                    Your letter has been encrypted and stored in Isabella's temporal vault. It will be delivered via WhatsApp on February 27, 2031.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSent(false)}
                  className="text-tech-cyan/40 hover:text-tech-cyan font-mono text-[10px] uppercase tracking-widest transition-colors"
                >
                  Edit_Data_Packet
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// --- 3D Components ---

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#7000ff"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          emissive="#7000ff"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const CyberBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-tech-bg">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#00ffff" intensity={1} />
          
          <group position={[2, 1, 0]}>
            <AnimatedSphere />
          </group>
          
          <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[-3, -2, -2]}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#00ffff" wireframe />
            </mesh>
          </Float>

          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[4, -3, -1]}>
              <torusGeometry args={[0.8, 0.2, 16, 100]} />
              <meshStandardMaterial color="#ff00ff" wireframe />
            </mesh>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main className="bg-tech-bg/50 text-white selection:bg-tech-cyan/30 relative">
      <CyberBackground />
      <div className="noise" />
      <div className="scanlines" />
      <FloatingElements />
      
      <Hero onSurprise={() => setIsSurpriseOpen(true)} />
      
      <AboutSection />
      
      <SpecialSection />

      <section className="py-32 px-6 flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
          <h2 className="font-display text-5xl font-bold italic">Touche Geek</h2>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest">Parce qu'elle code le futur</p>
        </div>
        <InteractiveTerminal />
      </section>

      <WishesBuff />

      <TimelineSection />

      <GallerySection />

      <PersonalMessage />

      <FutureLetter />

      <SurpriseModal isOpen={isSurpriseOpen} onClose={() => setIsSurpriseOpen(false)} />

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center space-y-6">
        <div className="font-display text-3xl font-black italic">I.</div>
        <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">
          Fait avec toute mon amour et affection!
        </p>
        <div className="flex justify-center gap-6 text-white/20">
          <Heart size={16} />
          <Code size={16} />
          <Star size={16} />
        </div>
      </footer>
    </main>
  );
}