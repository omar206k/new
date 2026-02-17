import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Twitter, 
  Youtube,
  ChefHat,
  Star,
  ArrowUp,
  Menu,
  X,
  Play,
  Quote,
  UtensilsCrossed,
  FireExtinguisher,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Sparkles,
  Zap,
  Award
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Marquee from 'react-fast-marquee';
import Lightbox from 'yet-another-react-lightbox';
import 'swiper/swiper-bundle.css';
import 'yet-another-react-lightbox/styles.css';

gsap.registerPlugin(ScrollTrigger);

// Menu Data
const menuItems = [
  {
    id: 1,
    name: 'شاورما "الخنفشارية"',
    description: 'لحم مدخن، طحينة بالثوم، مخلل، وبقدونس في خبز صاج طازج',
    price: 18,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
    badge: 'الأكثر مبيعاً'
  },
  {
    id: 2,
    name: 'كباب "زاد" الخاص',
    description: 'لحم غنم بلدي مفروم مع أعشابنا الجبلية المشوية على السيخ',
    price: 45,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1544025162-831518f97235?w=600',
    badge: null
  },
  {
    id: 3,
    name: 'مقبلات مشكلة',
    description: 'حمص، متبل، بابا غنوج، وتبولة بزيت الزيتون الأصلي',
    price: 30,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600',
    badge: null
  },
  {
    id: 4,
    name: 'شيش طاووق ملكي',
    description: 'دجاج متبل ببهاراتنا السرية مشوي على الفحم',
    price: 35,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600',
    badge: 'جديد'
  },
  {
    id: 5,
    name: 'شاورما دجاج',
    description: 'دجاج مشوي على العمود مع صوص الثومية الخاص',
    price: 15,
    category: 'shawarma',
    image: 'https://images.unsplash.com/photo-1561651823-34a0658ebc9d?w=600',
    badge: null
  },
  {
    id: 6,
    name: 'صحن مشكل',
    description: 'تشكيلة من الكباب والشيش والأوزي مع الأرز',
    price: 85,
    category: 'grills',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    badge: 'للعائلة'
  }
];

// Offers Data
const offers = [
  {
    id: 1,
    title: 'صندوق السعادة',
    description: '4 ساندوتش شاورما + بطاطس حجم عائلي + صوصاتنا الـ 5 السرية',
    price: 89,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600',
    badge: 'الأكثر مبيعاً'
  },
  {
    id: 2,
    title: 'وليمة الجمر',
    description: 'نص كيلو مشكل (كباب، أوصال، شيش طاووق) مع حمص ومقبلات',
    price: 115,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600',
    badge: 'خصم 20%'
  },
  {
    id: 3,
    title: 'عشاء العائلة',
    description: '1 كيلو مشكل + 4 صواني مقبلات + 4 مشروبات',
    price: 199,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
    badge: 'الأفضل قيمة'
  }
];

// Testimonials Data
const testimonials = [
  {
    id: 1,
    text: 'أفضل شاورما لحم ذقتها في العقبة طعم الفحم فيها يجعلك تدمن عليها!',
    author: 'تجربة',
    rating: 5
  },
  {
    id: 2,
    text: 'التتبيلة خرافية والمكان يفتح النفس، والموقع وتصميمه يجنن!',
    author: 'تجربة',
    rating: 5
  },
  {
    id: 3,
    text: 'جودة عالية ونظافة ممتازة، أنصح الجميع بتجربة الوليمة',
    author:  'تجربة',
    rating: 5
  },
  {
    id: 4,
    text: 'خدمة سريعة وطعم لا يُنسى، صرت زبون دائم من أول زيارة',
    author:  'تجربة',
    rating: 5
  }
];

// Gallery Images with descriptions
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200', title: 'مشويات على الفحم', desc: 'أجود أنواع اللحوم المشوية' },
  { src: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=1200', title: 'شاورما لحم', desc: 'النكهة الأصلية' },
  { src: 'https://images.unsplash.com/photo-1544025162-831518f97235?w=1200', title: 'كباب مشوي', desc: 'على أصوله' },
  { src: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1200', title: 'شاورما دجاج', desc: 'طازجة يومياً' },
  { src: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200', title: 'شيش طاووق', desc: 'متبل ببهاراتنا السرية' },
  { src: 'https://images.unsplash.com/photo-1561651823-34a0658ebc9d?w=1200', title: 'طبق مشكل', desc: 'للعائلة' },
  { src: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=1200', title: 'مقبلات', desc: 'حمص ومتبل' },
  { src: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1200', title: 'برياني', desc: 'باللحم المشوي' }
];

// Background Videos
const bgVideos = [
  'https://assets.mixkit.co/videos/preview/mixkit-fire-burning-slowly-in-a-dark-place-4015-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-frying-meat-in-a-pan-close-up-18656-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-preparing-a-salad-with-oil-42914-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-barbecue-grill-with-fire-and-smoke-4296-large.mp4'
];

// Sparkle Component
const Sparkle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{ 
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      boxShadow: '0 0 10px #FFD700, 0 0 20px #FF4D00'
    }}
  />
);

// Fire Particle Component
const FireParticle = ({ index }: { index: number }) => {
  const randomX = Math.random() * 100;
  const randomDelay = Math.random() * 3;
  const randomDuration = 2 + Math.random() * 2;
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        left: `${randomX}%`,
        bottom: 0,
        background: `linear-gradient(180deg, #FFD700, #FF4D00)`,
        boxShadow: '0 0 10px #FF4D00, 0 0 20px #FF6B00'
      }}
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={{ 
        y: -window.innerHeight,
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 0.8, 0.3],
        x: [0, Math.sin(index) * 50, Math.sin(index * 2) * -30, 0]
      }}
      transition={{ 
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
  );
};

// Animated Counter
const AnimatedCounter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Filter menu items
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  // Initialize animations
  useEffect(() => {
    // Particles.js initialization
    if (particlesRef.current && (window as any).particlesJS) {
      (window as any).particlesJS('particles-js', {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: ['#FF4D00', '#FF6B00', '#D4AF37', '#FFD700', '#FF2200'] },
          shape: { type: ['circle', 'triangle'] },
          opacity: { value: 0.7, random: true },
          size: { value: 4, random: true },
          line_linked: { enable: false },
          move: {
            enable: true,
            speed: 3,
            direction: 'top',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          }
        }
      });
    }

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: 'power4.out'
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out'
      });

      gsap.from('.hero-btn', {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 1,
        ease: 'back.out(1.7)'
      });

      // Scroll animations
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray<HTMLElement>('.gsap-fade-left').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: -100,
          duration: 1,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray<HTMLElement>('.gsap-fade-right').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: 100,
          duration: 1,
          ease: 'power3.out'
        });
      });

      gsap.utils.toArray<HTMLElement>('.gsap-scale').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
      });
    });

    // Scroll handler
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Video rotation
    const videoInterval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % bgVideos.length);
    }, 15000);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
      clearInterval(videoInterval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      {/* Particles Background */}
      <div id="particles-js" ref={particlesRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* Fire Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <FireParticle key={i} index={i} />
        ))}
      </div>

      {/* Ambient Glow Effects - Fixed Position */}
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-[#FF4D00]/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong"
      >
        <div className="px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a 
              href="#home" 
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Flame className="w-10 h-10 text-[#FF4D00] group-hover:scale-110 transition-transform" />
                <motion.div 
                  className="absolute inset-0 bg-[#FF4D00] blur-xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="font-arabic text-2xl font-bold text-white">
                زاد <span className="text-[#FF4D00]">وفحم</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {['الرئيسية', 'حكايتنا', 'العروض', 'المنيو', 'المعرض', 'الشهادات', 'تواصل معنا'].map((item, index) => (
                <motion.a
                  key={index}
                  href={`#${['home', 'about', 'offers', 'menu', 'gallery', 'testimonials', 'contact'][index]}`}
                  className="text-white/80 hover:text-[#FF4D00] transition-colors font-medium text-sm relative group"
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.span 
                    className="absolute -bottom-1 right-0 h-0.5 bg-[#FF4D00]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button 
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass-strong border-t border-[#FF4D00]/20"
            >
              <div className="px-4 py-6 space-y-4">
                {['الرئيسية', 'حكايتنا', 'العروض', 'المنيو', 'المعرض', 'الشهادات', 'تواصل معنا'].map((item, index) => (
                  <motion.a
                    key={index}
                    href={`#${['home', 'about', 'offers', 'menu', 'gallery', 'testimonials', 'contact'][index]}`}
                    className="block text-white/80 hover:text-[#FF4D00] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section with Multiple Videos */}
      <section 
        id="home" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Videos - Crossfade */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.video
              key={currentVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <source src={bgVideos[currentVideo]} type="video/mp4" />
            </motion.video>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/30 to-[#050505]" />
        </div>

        {/* Floating Sparks */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <Sparkle key={i} delay={i * 0.3} />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-20">
          <motion.div 
            className="hero-title"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <h1 className="font-arabic text-6xl sm:text-8xl lg:text-9xl font-black fire-text mb-4">
              زاد وفحم
            </h1>
          </motion.div>
          
          <motion.div 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <p className="text-xl sm:text-2xl lg:text-3xl text-[#D4AF37] font-bold mb-2 text-glow">
              تجربة اللهب الأصيل
            </p>
            <p className="text-lg text-white/70 mb-8">
              أصل الشاورما على الجمر | ملك المشويات البلدية
            </p>
          </motion.div>

          <motion.div 
            className="hero-btn flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, type: 'spring' }}
          >
            <motion.a 
              href="#menu" 
              className="btn-fire flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UtensilsCrossed className="w-5 h-5" />
              اكتشف المذاق
            </motion.a>
            <motion.a 
              href="#about" 
              className="px-8 py-4 border-2 border-[#FF4D00]/50 rounded-full text-white hover:bg-[#FF4D00]/10 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              شاهد قصتنا
            </motion.a>
          </motion.div>

          {/* Video Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {bgVideos.map((_, i) => (
              <motion.button
                key={i}
                className={`w-2 h-2 rounded-full ${i === currentVideo ? 'bg-[#FF4D00]' : 'bg-white/30'}`}
                onClick={() => setCurrentVideo(i)}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>

          {/* Floating Elements */}
          <motion.div 
            className="absolute top-20 left-10 opacity-30"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Flame className="w-16 h-16 text-[#FF4D00]" />
          </motion.div>
          <motion.div 
            className="absolute bottom-40 right-10 opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <FireExtinguisher className="w-12 h-12 text-[#D4AF37]" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-[#FF4D00]/50 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-3 bg-[#FF4D00] rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-gradient-to-r from-[#FF4D00] via-[#FF6B00] to-[#FF4D00] py-3 overflow-hidden">
        <Marquee speed={50} gradient={false}>
          <span className="text-white font-bold mx-8 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> توصيل مجاني للطلبات فوق 100 دينار
          </span>
          <span className="text-white font-bold mx-8 flex items-center gap-2">
            <Zap className="w-5 h-5" /> خصم 20% على أول طلب
          </span>
          <span className="text-white font-bold mx-8 flex items-center gap-2">
            <Award className="w-5 h-5" /> جائزة أفضل مطعم مشويات 2024
          </span>
          <span className="text-white font-bold mx-8 flex items-center gap-2">
            <Star className="w-5 h-5" /> تقييم 4.9 من 5 نجوم
          </span>
        </Marquee>
      </div>

      {/* About Section */}
      <section id="about" className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image with Tilt Effect */}
            <div className="gsap-fade-left relative">
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" 
                    alt="About Us"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>
              </Tilt>
              
              {/* Floating Badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#FF4D00] to-[#FF2200] text-white px-6 py-4 rounded-2xl shadow-2xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
              >
                <p className="font-arabic text-3xl font-bold">15+</p>
                <p className="text-sm">سنة خبرة</p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="gsap-fade-right">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChefHat className="w-8 h-8 text-[#FF4D00]" />
                </motion.div>
                <span className="text-[#FF4D00] font-bold">من نحن</span>
              </div>
              
              <h2 className="font-arabic text-4xl lg:text-5xl font-bold text-white mb-6">
                حكاية <span className="text-[#D4AF37]">النار</span> والحطب
              </h2>
              
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                في "زاد وفحم"، نحن لا نطهو الطعام فحسب، نحن نحيي إرثاً قديماً. 
                بدأت قصتنا من عشقنا لرائحة الحطب المشتعل ونكهة الشواء الأصيلة 
                التي تذكرنا بجلسات البادية العريقة.
              </p>
              
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                نستخدم أجود أنواع اللحوم المحلية التي تُختار بعناية، ونتبلها 
                بخلطاتنا السرية التي تناقلناها عبر الأجيال، ثم نتركها تنضج 
                ببطء فوق جمر السمر الطبيعي لتعطيك تلك النكهة "الخنفشارية" التي لا تُنسى.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { number: 50000, suffix: '+', label: 'عميل سعيد' },
                  { number: 100, suffix: '%', label: 'لحم طازج' },
                  { number: 24, suffix: '/7', label: 'خدمة ممتازة' }
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-4 rounded-xl bg-white/5"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 77, 0, 0.1)' }}
                  >
                    <p className="font-arabic text-3xl font-bold text-[#FF4D00]">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </p>
                    <p className="text-white/60 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="section-padding bg-gradient-fire relative">
        <div className="absolute inset-0 bg-gradient-radial" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 gsap-fade-up">
            <span className="text-[#FF4D00] font-bold mb-4 block">عروض خاصة</span>
            <h2 className="font-arabic text-4xl lg:text-5xl font-bold text-white">
              ولائم <span className="text-[#D4AF37]">اللهب</span>
            </h2>
          </div>

          <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            className="pb-16"
          >
            {offers.map((offer) => (
              <SwiperSlide key={offer.id} className="max-w-md">
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                  <div className="card-fire overflow-hidden">
                    {offer.badge && (
                      <div className="absolute top-4 right-4 badge-fire z-10">
                        {offer.badge}
                      </div>
                    )}
                    
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={offer.image} 
                        alt={offer.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-arabic text-2xl font-bold text-white mb-3">
                        {offer.title}
                      </h3>
                      <p className="text-white/60 mb-4">{offer.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="price-tag">
                          <span className="text-2xl font-bold">{offer.price}</span>
                          <span className="text-sm">دينار</span>
                        </div>
                        <motion.button 
                          className="btn-fire py-2 px-4 text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          اطلب الآن
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="section-padding relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 gsap-fade-up">
            <span className="text-[#FF4D00] font-bold mb-4 block">قائمة الطعام</span>
            <h2 className="font-arabic text-4xl lg:text-5xl font-bold text-white mb-8">
              القائمة <span className="text-[#D4AF37]">الإمبراطورية</span>
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { key: 'all', label: 'الكل' },
                { key: 'shawarma', label: 'شاورما' },
                { key: 'grills', label: 'مشويات' },
                { key: 'sides', label: 'مقبلات' }
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key)}
                  className={`tab-btn ${activeCategory === tab.key ? 'active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                    <div className="card-fire">
                      {item.badge && (
                        <div className="absolute top-4 right-4 badge-fire z-10">
                          {item.badge}
                        </div>
                      )}
                      
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-arabic text-xl font-bold text-[#D4AF37] mb-2">
                          {item.name}
                        </h3>
                        <p className="text-white/60 text-sm mb-4">{item.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="price-tag">
                            <span className="text-xl font-bold">{item.price}</span>
                            <span className="text-sm">دينار</span>
                          </div>
                          <motion.button 
                            className="w-10 h-10 rounded-full bg-[#FF4D00]/20 border border-[#FF4D00]/50 flex items-center justify-center text-[#FF4D00] hover:bg-[#FF4D00] hover:text-white transition-all"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <span className="text-xl">+</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section id="gallery" className="section-padding bg-gradient-fire relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        
        {/* Background Video for Gallery */}
        <div className="absolute inset-0 z-0 opacity-20">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-barbecue-grill-with-fire-and-smoke-4296-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 gsap-fade-up">
            <span className="text-[#FF4D00] font-bold mb-4 block">معرض الصور</span>
            <h2 className="font-arabic text-4xl lg:text-5xl font-bold text-white">
              لقطات من <span className="text-[#D4AF37]">قلب الحدث</span>
            </h2>
          </div>

          {/* Masonry Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-arabic text-xl font-bold text-white mb-1">{image.title}</h3>
                  <p className="text-white/70 text-sm">{image.desc}</p>
                </motion.div>
                
                {/* Zoom Icon */}
                <motion.div
                  className="absolute top-4 right-4 w-10 h-10 bg-[#FF4D00]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </motion.div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FF4D00]/50 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={galleryImages.map(img => ({ src: img.src }))}
          render={{ 
            buttonPrev: () => (
              <button className="w-12 h-12 bg-[#FF4D00]/80 rounded-full flex items-center justify-center text-white hover:bg-[#FF4D00]">
                <ChevronRight className="w-6 h-6" />
              </button>
            ),
            buttonNext: () => (
              <button className="w-12 h-12 bg-[#FF4D00]/80 rounded-full flex items-center justify-center text-white hover:bg-[#FF4D00]">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )
          }}
        />
      </section>

      {/* Video Section with Multiple Videos */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 gsap-fade-up">
            <span className="text-[#FF4D00] font-bold mb-4 block">شاهد بنفسك</span>
            <h2 className="font-arabic text-4xl lg:text-5xl font-bold text-white">
              استمتع <span className="text-[#D4AF37]">بصوت القرمشة</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { src: 'https://assets.mixkit.co/videos/preview/mixkit-frying-meat-in-a-pan-close-up-18656-large.mp4', title: 'فن الشواء' },
              { src: 'https://assets.mixkit.co/videos/preview/mixkit-preparing-a-salad-with-oil-42914-large.mp4', title: 'تحضير المقبلات' },
              { src: 'https://assets.mixkit.co/videos/preview/mixkit-barbecue-grill-with-fire-and-smoke-4296-large.mp4', title: 'الشواية الحية' },
              { src: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-salad-42962-large.mp4', title: 'أطباقنا المميزة' }
            ].map((video, index) => (
              <motion.div 
                key={index}
                className="video-container gsap-scale"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[300px] object-cover"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <motion.div 
                  className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg z-10"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white font-bold flex items-center gap-2">
                    <Play className="w-4 h-4 text-[#FF4D00]" />
                    {video.title}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section-padding bg-gradient-fire relative">
        <div className="absolute inset-0 bg-gradient-radial" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 gsap-fade-up">
            <span className="text-[#FF4D00] font-bold mb-4 block">آراء العملاء</span>
            <h2 className="font-arabic text-4xl lg:text-5xl font-bold text-white">
              قالوا عن <span className="text-[#D4AF37]">لهبنا</span>
            </h2>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div 
                  className="glass rounded-3xl p-8 md:p-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Quote className="w-12 h-12 text-[#FF4D00] mx-auto mb-6" />
                  </motion.div>
                  
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1, type: 'spring' }}
                      >
                        <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <p className="text-[#FF4D00] font-bold text-lg">
                    - {testimonial.author}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative bg-[#020202] pt-20 pb-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-16">
            <motion.div 
              className="flex items-center justify-center gap-3 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-12 h-12 text-[#FF4D00]" />
              <span className="font-arabic text-4xl font-bold text-white">
                زاد <span className="text-[#FF4D00]">وفحم</span>
              </span>
            </motion.div>
            <p className="text-white/60 text-lg">حيث يلتقي الجمر بالأصالة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Location */}
            <motion.div 
              className="text-center md:text-right"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#FF4D00]" />
                <h3 className="text-white font-bold text-lg">زورونا</h3>
              </div>
              <p className="text-white/60">العقبة</p>
              <p className="text-white/60">العقبة  </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-[#D4AF37]">
                <Phone className="w-4 h-4" />
                <span>920001234</span>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#FF4D00]" />
                <h3 className="text-white font-bold text-lg">ساعات السعادة</h3>
              </div>
              <p className="text-white/60">الأحد - الخميس: 1م - 2ص</p>
              <p className="text-white/60">الجمعة - السبت: 4م - 4ص</p>
            </motion.div>

            {/* Social */}
            <motion.div 
              className="text-center md:text-left"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-white font-bold text-lg mb-4">تابعوا دخاننا</h3>
              <div className="flex justify-center md:justify-start gap-4">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    className="social-icon"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="fire-divider" />

          <div className="text-center">
            <p className="text-white/40">
              &copy; 2026 جميع الحقوق محفوظة لمطعم زاد وفحم | صُنع بشغف ولهب
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-[#FF4D00] rounded-full flex items-center justify-center shadow-lg hover:bg-[#FF6B00] glow-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
