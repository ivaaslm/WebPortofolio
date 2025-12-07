import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Code, Cpu, Brain, Terminal, Zap, Globe, Server, Wifi, 
  Github, Linkedin, Mail, ChevronDown, ExternalLink, Layers, MousePointer2, FileText, Send, Instagram
} from 'lucide-react';
import profileImg from './assets/pp.png';
import ivaImg from './assets/iva.jpg';
// --- Tambahan Impor Gambar Proyek ---
import aivaImg from './assets/aiva.png';
import spamImg from './assets/spam.png';
import sitbulImg from './assets/sitbul.png';
import sispakImg from './assets/sispak.png';
import mechiuImg from './assets/mechiu.jpg';
// ------------------------------------

// --- CSS Styles ---
const customStyles = `
  .animate-pulse-slow {
    animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .animate-bounce-slow {
     animation: bounce 3s infinite;
  }
  @keyframes scan {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// --- Komponen Role Rotator (Fade Effect) ---
const RoleRotator = () => {
  const roles = [
    "Student",
    "Software Engineer", 
    "Web Developer", 
    "AI Enthusiast"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 2500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 md:h-10 relative overflow-hidden flex justify-center md:justify-start"> 
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full text-center md:text-left text-xl md:text-2xl font-mono text-cyan-400 font-bold tracking-wide" 
        >
          {roles[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Komponen Typewriter Custom ---
const Typewriter = ({ words, wait = 2000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? wait : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, wait]);

  return (
    <span className="inline-block whitespace-nowrap">
      {words[index].substring(0, subIndex)}
      <span className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-middle ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
    </span>
  );
};

// --- Konfigurasi Animasi Framer Motion ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Port = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [scrolled, setScrolled] = useState(false);
	const [imgZoomed, setImgZoomed] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Handle scroll only
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Deteksi section saat mencapai setengah layar
          return rect.top >= 0 && rect.top <= window.innerHeight / 2; 
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Data untuk Skills Section 
  const skillCategories = [
    { title: "Front-End & Web", icon: <Globe size={28}/>, color: "cyan", 
      skills: [
        "HTML, CSS, JavaScript", 
        "ReactJS", 
        "Tailwind CSS", 
        "Next.js",
        "Framer Motion"
      ],
      cardClasses: "border-t border-l border-cyan-500/30",
      iconClasses: "p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 shadow-lg",
      blurClasses: "bg-cyan-500/5"
    },
    { title: "AI & ML", icon: <Brain size={28}/>, color: "purple", 
      skills: [
        "Python, OpenCV", 
        "Scikit-learn, Pandas", 
        "TensorFlow / PyTorch", 
        "NLP, Predictive Modeling"
      ],
      cardClasses: "border-t border-l border-purple-500/30",
      iconClasses: "p-4 bg-purple-500/10 rounded-2xl text-purple-400 shadow-lg",
      blurClasses: "bg-purple-500/5"
    },
    { title: "Mechatronics & IoT", icon: <Cpu size={28}/>, color: "pink", 
      skills: [
        "C++ / Embedded C", 
        "ESP32 / Arduino", 
        "Robotics",
        "3D Modeling"
      ],
      cardClasses: "border-t border-l border-pink-500/30",
      iconClasses: "p-4 bg-pink-500/10 rounded-2xl text-pink-400 shadow-lg",
      blurClasses: "bg-pink-500/5"
    }
  ];

  // Data untuk Project Section (5 Proyek) - DITAMBAH IMAGE
  const projects = [
    { 
      title: "Spam Detector App", 
      desc: "Developed a Python-based SMS Spam Detector app using Streamlit and Scikit-learn. Achieved 96.9% accuracy using Multinomial Naive Bayes algorithm on Indonesian text datasets.", 
      image: spamImg, // <-- TAMBAHAN IMAGE
      color: "purple", 
      tags: ["Python", "Streamlit", "Scikit-learn", "Naive Bayes", "NLP"],
      bgClasses: "bg-gradient-to-tr from-purple-900/40 via-transparent to-gray-900/40",
      hoverShadow: "hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]",
      hoverBorder: "group-hover:border-purple-500/50",
      hoverText: "group-hover:text-purple-400",
      tagBg: "bg-purple-500/10",
      tagText: "text-purple-300",
      tagBorder: "border-purple-500/20"
    },
    { 
      title: "Expert System for Cancer Detection", 
      desc: "Developed a Front-End Expert System using JavaScript, HTML, and Tailwind CSS. Implemented Forward Chaining and Certainity Factor for probability calculation and real-time diagnosis.", 
      image: sispakImg, // <-- TAMBAHAN IMAGE
      color: "pink", 
      tags: ["JavaScript", "Tailwind CSS", "Forward Chaining", "Certainity Factor","Expert System"],
      bgClasses: "bg-gradient-to-tr from-pink-900/40 via-transparent to-gray-900/40",
      hoverShadow: "hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]",
      hoverBorder: "group-hover:border-pink-500/50",
      hoverText: "group-hover:text-pink-400",
      tagBg: "bg-pink-500/10",
      tagText: "text-pink-300",
      tagBorder: "border-pink-500/20"
    },
    { 
      title: "Situ Buleud Food Market", 
      desc: "Digital directory for Situ Buleud Market using React.js and Tailwind CSS. Integrated Supabase as the backend for menu data and authentication, enabling secure CRUD operations.", 
      image: sitbulImg, // <-- TAMBAHAN IMAGE
      color: "cyan", 
      tags: ["ReactJS", "Tailwind CSS", "Supabase", "CRUD"],
      bgClasses: "bg-gradient-to-tr from-cyan-900/40 via-transparent to-gray-900/40",
      hoverShadow: "hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]",
      hoverBorder: "group-hover:border-cyan-500/50",
      hoverText: "group-hover:text-cyan-400",
      tagBg: "bg-cyan-500/10",
      tagText: "text-cyan-300",
      tagBorder: "border-cyan-500/20"
    },
    { 
      title: "AI-VA: Intelligent Personal Assistant", 
      desc: "Developed a CL-based personal assistant using Python for autonomous daily system tasks. Features a management system with timer (shutdown automation) and monitoring using psutil.", 
      image: aivaImg, // <-- TAMBAHAN IMAGE
      color: "purple", 
      tags: ["Python", "Command Line", "OS/System", "psutil"],
      bgClasses: "bg-gradient-to-tr from-purple-900/40 via-transparent to-gray-900/40",
      hoverShadow: "hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]",
      hoverBorder: "group-hover:border-purple-500/50",
      hoverText: "group-hover:text-purple-400",
      tagBg: "bg-purple-500/10",
      tagText: "text-purple-300",
      tagBorder: "border-purple-500/20"
    },
    { 
      title: "MeChIU (Desktop Typing Game)", 
      desc: "Developed a desktop typing game using Java and JavaFX. Designed a decoupled User Interface (UI) using FXML to separate presentation from logic. Implemented JSON parsing for efficient data management.", 
      image: mechiuImg, // <-- TAMBAHAN IMAGE
      color: "pink", 
      tags: ["Java", "JavaFX", "FXML", "JSON", "OOP"],
      bgClasses: "bg-gradient-to-tr from-pink-900/40 via-transparent to-gray-900/40",
      hoverShadow: "hover:shadow-[0_0_50px_rgba(236,72,153,0.3)]",
      hoverBorder: "group-hover:border-pink-500/50",
      hoverText: "group-hover:text-pink-400",
      tagBg: "bg-pink-500/10",
      tagText: "text-pink-300",
      tagBorder: "border-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050510] text-gray-200 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* Inject Custom Styles */}
      <style>{customStyles}</style>

      {/* --- Dynamic Backgrounds --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
          style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-soft-light"></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-purple-500/5 to-transparent bg-[length:100%_4px] animate-[scan_4s_linear_infinite] opacity-30"></div>
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20 -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-cyan-600 rounded-full blur-[150px] opacity-10 translate-x-1/2 translate-y-1/2 z-0"></div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tighter cursor-pointer group relative" onClick={() => scrollTo('home')}>
             <span className="relative z-10">&lt;DEV_MECHA /&gt;</span>
             <div className="absolute inset-0 bg-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </motion.div>
          
          {/* Daftar Menu Navigasi (Logika Active State Diperbaiki) */}
          <div className="hidden md:flex space-x-0 bg-[#292A3D] p-1.5 rounded-full border border-gray-700/50 shadow-xl">
            {['Home', 'About', 'Skills', 'Project', 'Contact'].map((item) => {
                 // Menentukan ID section yang benar untuk setiap tombol
                 const sectionId = (
                     item === 'Skiils' ? 'skills' : 
                     item === 'Project' ? 'projects' : 
                     item.toLowerCase()
                 );

                return (
              <button 
                key={item}
                onClick={() => scrollTo(sectionId)}
                className={`relative px-6 py-2 text-base font-medium transition-all rounded-full ${
                  // Logika penentuan tombol aktif
                  (activeSection === sectionId)
                  // Gaya Aktif (Gradient Ungu/Cyan)
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30' 
                  // Gaya Non-Aktif
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="relative z-10">{item}</span>
              </button>
            );
            })}
          </div>
          </div>
      </nav>

      {/* Hero Wrapper - Memegang ruang di flow dokumen */}
      <div className="relative h-screen" ref={heroRef}>
          {/* Hero Section - Konten utama di dalam wrapper */}
          {/* FIX: min-h-screen untuk memastikan konten terdisplay penuh sebelum about */}
          <section id="home" className="absolute inset-0 h-auto min-h-screen flex items-center pt-20 overflow-hidden"> 
              <motion.div 
                // ANIMASI HERO SUDAH DIAPLIKASIKAN MELALUI style={{ y: heroY, opacity }}
                style={{ y: heroY, opacity }} 
                className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-20"
              >
                
                {/* KOLOM KIRI (TEKS) - Rata tengah di Mobile, Rata kiri di Desktop */}
                <motion.div 
                  variants={staggerContainer} 
                  initial="hidden" 
                  animate="visible" 
                  className="space-y-6 relative z-50 pt-10 text-center md:text-left" 
                >
                  <motion.div variants={fadeInUp} className="inline-block px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono mb-2 relative overflow-hidden group mx-auto md:mx-0">
                    <span className="relative z-10 flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>Available for opportunities</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                  
                  <motion.h1 variants={fadeInUp} className="font-bold leading-tight mx-auto md:mx-0">
                    <span className="block text-2xl sm:text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] whitespace-nowrap">
                      <Typewriter words={['Iva Salma Tamima']} wait={5000} />
                    </span>
                  </motion.h1>
                  
                  {/* Komponen RoleRotator di tengah */}
                  <motion.div variants={fadeInUp} className="text-gray-400 text-lg md:text-xl max-w-lg leading-relaxed min-h-[40px] relative mx-auto md:mx-0">
                    <RoleRotator />
                  </motion.div>
                  
                  <motion.div variants={fadeInUp} className="flex gap-3 pt-4 justify-center md:justify-start"> 
                    {/* 1. CV Button dengan Ikon FileText */}
                    <a href="https://drive.google.com/file/d/18kRdcQJ7f0LARuVYk_AHz7ZjOfJy4R0B/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-400/50 text-cyan-300 font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                      <FileText size={16} /> 
                      <span>Curriculum Vitae</span>
                    </a>
                    {/* 3. Let's Connect Button ke LinkedIn */}
                    <a href="https://linkedin.com/in/ivasalmatamima" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-purple-400/50 text-purple-300 font-bold text-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(167,139,250,0.4)]">
                      <span className="text-lg">👋</span>
                      <span>Let's Connect</span>
                    </a>
                  </motion.div>
                </motion.div>

                {/* KOLOM KANAN (FOTO PROFIL + BULATAN) - FIX: SELALU TAMPIL DAN TIDAK LANGSUNG TERPOTONG */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="relative flex justify-center md:justify-end items-center z-0 translate-x-0 md:translate-x-10 mt-10 md:mt-0" 
                >
                  <div className="relative w-48 h-48 md:w-[20rem] md:h-[20rem]"> {/* FIX: Ukuran diperkecil di mobile (w-48 h-48) */}
                      {/* --- 1. BULATAN/CINCIN --- */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 blur-[60px] opacity-40 animate-pulse-slow"></div>
                      <div className="absolute -inset-4 border-2 border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                      <div className="absolute -inset-8 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

                      {/* --- 2. WADAH FOTO --- */}
                      <motion.div
                        initial={{ y: 200, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}   
                        transition={{ 
                            duration: 1, 
                            delay: 0.5, 
                            ease: "easeOut" 
                        }}
                        className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl z-10 group"
                      >
                          {/* Foto */}
                        <motion.div
                          onClick={() => setImgZoomed((p) => !p)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setImgZoomed((p) => !p); } }}
                          role="button"
                          tabIndex={0}
                          aria-pressed={imgZoomed}
                          className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
                          animate={{ scale: imgZoomed ? 2.5 : 2.0, y: imgZoomed ? 0 : -10 }}
                          whileHover={{ scale: imgZoomed ? 2.5 : 2.2, y: imgZoomed ? 0 : -5 }}
                          whileFocus={{ scale: imgZoomed ? 2.5 : 2.2, y: imgZoomed ? 0 : -5 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                        >
                              <img
                              src={profileImg}
                              alt="Profile"
                              className="max-w-full max-h-full object-contain transition-transform duration-300"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=clip";
                              }}
                              />
                              
                              {/* Efek Kilau */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-50 mix-blend-overlay"></div>
                          </motion.div>
                      </motion.div>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" } }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer text-gray-500 hover:text-purple-400" onClick={() => scrollTo('about')}>
                <ChevronDown size={32} />
              </motion.div>
          </section>
      </div>


      {/* About Section */}
      <section id="about" className="relative z-10 py-32 bg-[#080814]/50 backdrop-blur-sm">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            {/* Menggunakan variants={fadeInUp} di sub-motion.div */}
            <motion.div variants={fadeInUp} className="md:w-1/2 relative group">
               <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
               <div className="relative bg-[#0f0f1a] border border-purple-500/30 p-10 rounded-2xl shadow-2xl">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-t-2xl"></div>
                <h3 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">About Me</span>
                </h3>
                {/* About photo */}
                <div className="flex justify-center mb-6 mt-2 md:mt-4">
                  <img
                    src={ivaImg}
                    alt="Iva Salma Tamima"
                    className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover border-4 border-white/10 shadow-2xl"
                    onError={(e) => { e.target.onerror = null; e.target.src = profileImg; }}
                  />
                </div>
                <div className="space-y-4 text-gray-400 leading-relaxed text-base md:text-lg">
                  <p className="text-sm md:text-base">Undergraduate student in Mechatronics and Artificial Intelligence at Indonesia University of Education - Purwakarta. Proficient in Software Engineering, Web Development, and Machine Learning. Skilled in Front-End design, Back-End integration, and AI model deployment. Proven track record in organizational management, demonstrating the ability to collaborate effectively and lead projects. Passionate about building scalable applications and integrating intelligent systems to solve complex technical problems. Seeking roles as a Software Engineer, Web Developer, or AI Engineer.</p>
                </div>
           <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col gap-2">
             <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-cyan-400/50 text-cyan-300">Location: <strong className="ml-1 text-white">Purwakarta, West Java</strong></span>
             <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-purple-400/40 text-purple-300">Status: <strong className="ml-1 text-white">Open for Collab</strong></span>
           </div>
               </div>
            </motion.div>
            
            {/* Kartu Detail */}
            <motion.div variants={staggerContainer} className="md:w-1/2 grid grid-cols-2 gap-6">
              {[{ icon: <Cpu size={36} />, title: "Embedded Systems", desc: "IoT & Robotics Control Firmware" }, { icon: <Globe size={36} />, title: "Front-End", desc: "HTML, CSS, JavaScript, ReactJS, Tailwind CSS." }, { icon: <Brain size={36} />, title: "AI & ML", desc: "Image Classification, Object Detection, NLP, Predictive Modeling, Regression, Clustering." }, { icon: <Server size={36} />, title: "Back-End", desc: "Node.js, Python, SQL, Supabase, OpenCV." }].map((card, idx) => (
                <div key={idx} className="h-full">
                  <motion.div variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }} className="bg-[#0f0f1a] border border-gray-800 p-8 rounded-2xl hover:border-purple-500/50 hover:bg-purple-900/10 transition-all group relative overflow-hidden h-full flex flex-col cursor-pointer">
                    <div className="text-purple-500 mb-4 group-hover:text-cyan-400 transition-colors duration-300 relative z-10">{card.icon}</div>
                    <h4 className="text-white font-bold text-lg mb-2 relative z-10">{card.title}</h4>
                    <p className="text-sm text-gray-500 relative z-10">{card.desc}</p>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/20 blur-[50px] rounded-full group-hover:bg-cyan-600/30 transition-colors duration-500"></div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="container mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex justify-center items-center gap-3"><Layers className="text-purple-500 animate-bounce-slow" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-gray-400">Skills</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">My core technology stack, utilized to connect the digital realm and the physical environment.</p>
          </motion.div>
          {/* Grid Kategori Skill */}
          <div className="grid md:grid-cols-3 gap-10">
            {skillCategories.map((cat, idx) => (
              <motion.div key={idx} variants={fadeInUp} whileHover={{ rotate: 1, scale: 1.02 }} className={`bg-[#0a0a12]/80 backdrop-blur p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden ${cat.cardClasses}`}>
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none ${cat.blurClasses}`}></div>
                <div className="flex items-center gap-4 mb-8 relative z-10">
                  <div className={cat.iconClasses}>{cat.icon}</div>
                  <h3 className="text-2xl font-bold">{cat.title}</h3>
                </div>
                {/* LIST SKILL BARU SEBAGAI TAG INTERAKTIF */}
                <div className="flex flex-wrap gap-3 relative z-10">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      className={`inline-block px-4 py-1 rounded-full text-sm font-mono cursor-default 
                          border border-${cat.color}-500/40 text-${cat.color}-300 
                          bg-${cat.color}-500/10 
                          hover:border-${cat.color}-400 hover:text-white hover:bg-${cat.color}-500/20
                          transition-all duration-300 shadow-md`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 bg-[#080814]/50 backdrop-blur-sm">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
             <motion.div variants={fadeInUp} className="overflow-visible">
                  <h2 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-none pb-2">Featured Projects</h2>
                  <p className="text-gray-400 text-lg">Real integration between Digital Code and Physical Machines.</p>
              </motion.div>
              {/* 2. Tombol View All on Github Dihubungkan ke Repo Utama */}
             <a href="https://github.com/ivaaslm" target="_blank" rel="noopener noreferrer" className="hidden md:flex text-purple-400 items-center gap-3 hover:text-white transition-colors font-bold group px-6 py-3 border border-purple-500/30 rounded-lg hover:bg-purple-500/10">View All on Github <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform"/></a>
          </div>
          {/* Grid Kartu Proyek */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {projects.map((proj, idx) => (
               <motion.div key={idx} variants={fadeInUp} whileHover={{ y: -10, rotateX: 2, rotateY: 2 }} className={`group relative bg-[#0f0f1a] rounded-3xl overflow-hidden border border-gray-800/50 shadow-xl transition-all duration-500 h-full flex flex-col ${proj.hoverShadow}`}>
                  
                  {/* Container Gambar Proyek (H-64) */}
                  <div className="h-64 relative overflow-hidden border-b border-gray-800/50 bg-[#050510]">
                      {/* Gambar Proyek (Mengisi penuh ruang) */}
                      <img 
                          src={proj.image} 
                          alt={`${proj.title} Screenshot`}
                          className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80" 
                      />
                      
                      {/* Efek Gradien & Noise di atas gambar */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10"></div>
                    <div className={`absolute inset-0 z-0 ${proj.bgClasses}`}></div>
                      
                      {/* Tag Kategori (Di pojok kanan atas) */}
                    <div className="absolute top-5 right-5 z-30 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300 border border-cyan-500/50 flex items-center gap-2 shadow-lg">
                          <Zap size={12} className="animate-pulse"/> 
                          {proj.tags.includes('NLP') || proj.tags.includes('Naive Bayes') || proj.tags.includes('Python') && proj.tags.includes('psutil') ? 'AI/ML/OS' : proj.tags.includes('Expert System') ? 'Expert System' : 'Web Dev'}
                      </div>
                  </div>
                  
                  {/* Konten Utama Kartu Proyek */}
                  <div className="p-8 flex-grow flex flex-col justify-between relative z-20 bg-[#0f0f1a]">
                    <div><h3 className={`text-2xl font-bold text-white mb-3 transition-colors ${proj.hoverText}`}>{proj.title}</h3><p className="text-gray-400 text-sm leading-relaxed mb-6">{proj.desc}</p></div>
                    <div className="flex flex-wrap gap-2 text-xs font-mono font-medium">{proj.tags.map(t => <span key={t} className={`px-3 py-1 rounded-full ${proj.tagBg} ${proj.tagText} border ${proj.tagBorder}`}>{t}</span>)}</div>
                  </div>
                  <div className={`absolute inset-0 border-2 border-transparent transition-colors duration-500 pointer-events-none ${proj.hoverBorder}`}></div>
               </motion.div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section - Diperindah dan memiliki transisi fadeInUp + stagger */}
      <section id="contact" className="relative z-10 py-32 bg-[#080814]/50 backdrop-blur-sm">
        <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer} 
            className="container mx-auto px-6 max-w-2xl relative"
        >
          
          {/* Ikon Send Besar yang berputar di belakang */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-20"
          >
            <Send size={150} className="text-purple-600/50" />
          </motion.div>

          {/* Heading dan Deskripsi (muncul dari bawah) */}
          <motion.div variants={fadeInUp} className="text-center mb-12 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Let's Connect </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Do you have an innovative project? 
                Reach out to me through the channels below. Let's build the digital future together.
            </p>
          </motion.div>

          {/* Social Icons (muncul dari bawah dengan jeda setelah teks) */}
          <motion.div variants={fadeInUp} className="flex justify-center gap-8 mb-12 relative z-10">
            {[
              // 1. GITHUB (CYAN)
              { icon: <Github size={32} />, link: "https://github.com/ivaaslm", color: "text-cyan-400", hover: "hover:border-cyan-400/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]" },
              // 2. INSTAGRAM (PINK)
              { icon: <Instagram size={32} />, link: "https://instagram.com/ivaaslm", color: "text-pink-400", hover: "hover:border-pink-400/80 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]" },
              // 3. LINKEDIN (PURPLE)
              { icon: <Linkedin size={32} />, link: "https://linkedin.com/in/ivasalmatamima", color: "text-purple-400", hover: "hover:border-purple-400/80 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]" },
              // 4. MAIL (PEACH ORANGE) - Menggunakan Orange 300
              { icon: <Mail size={32} />, link: "mailto:ivasalma@upi.edu", color: "text-orange-300", hover: "hover:border-orange-300/80 hover:shadow-[0_0_20px_rgba(253,186,116,0.5)]" }
            ].map((social, idx) => (
              <motion.a 
                key={idx} 
                href={social.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -6, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`w-16 h-16 rounded-full border border-gray-700 flex items-center justify-center bg-[#1a1a2e] shadow-lg transition-all duration-300 ${social.color} ${social.hover}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          
        </motion.div>
      </section>
      
    </div>
  );
};

export default Port;