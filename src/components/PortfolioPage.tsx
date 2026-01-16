import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ExternalLink, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, useScroll, useTransform } from 'motion/react';
const soundClashImg1 = '/images/sound-clash-1.png';
const soundClashImg2 = '/images/sound-clash-2.png';
const soundClashImg3 = '/images/sound-clash-3.png';
const weddingImg1 = '/images/wedding-1.png';
const weddingImg2 = '/images/wedding-2.png';
const weddingImg3 = '/images/wedding-3.png';
const corporateImg1 = '/images/corporate-1.png';
const corporateImg2 = '/images/corporate-2.png';
const corporateImg3 = '/images/corporate-3.png';
const corporateImg4 = '/images/corporate-4.png';
const corporateImg5 = '/images/corporate-5.png';
const corporateImg6 = '/images/corporate-6.png';

interface PortfolioPageProps {
  onNavigate: (page: string) => void;
}

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  color: string;
  videoUrl?: string;
  images: string[];
  link?: string;
}

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const projects: Project[] = [
    {
      id: 'sound-clash',
      category: 'NIGHTLIFE & ENTERTAINMENT',
      title: 'Sound Clash OS',
      description: 'Turn the crowd into the judge. A real-time voting engine for DJ battles, rap battles, and dance-offs. Features: Live "Hype" Meter, Song Request Line, VIP Bottle Service Upgrades.',
      color: '#E91E63',
      images: [
        soundClashImg1,
        soundClashImg2,
        soundClashImg3,
      ],
    },
    {
      id: 'the-union',
      category: 'LIFESTYLE & EVENTS',
      title: 'The Union: Wedding OS',
      description: 'Modernize the reception. No more clinking glasses—guests complete challenges to unlock rewards. Features: Digital Guestbook, Buy the Couple a Round, Photo Scavenger Hunt.',
      color: '#FF7A00',
      images: [
        weddingImg1,
        weddingImg2,
        weddingImg3,
      ],
    },
    {
      id: 'corporate-clash',
      category: 'BUSINESS & TECH',
      title: 'Corporate Clash',
      description: 'Gamify the boardroom. Perfect for startup pitch competitions, town halls, and internal hackathons. Features: Real-time Investment Simulation, Networking "Who\'s Here" Grid, Audience Q&A Upvoting.',
      color: '#00D4FF',
      images: [
        corporateImg1,
        corporateImg2,
        corporateImg3,
        corporateImg4,
        corporateImg5,
        corporateImg6,
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
              Our Work
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6"
          >
            <span className="font-futuristic">Portfolio of</span><br />
            <span className="font-graffiti text-[#FF7A00]">Digital Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Explore our collection of projects where Hip-Hop culture meets cutting-edge design
          </motion.p>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="pb-20">
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} onNavigate={onNavigate} />
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Ready to Join Our</span><br />
            <span className="font-graffiti text-[#FF7A00]">Portfolio?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Let's create something legendary together
          </p>
          <button
            onClick={() => onNavigate('start-project')}
            className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            Start Your Project
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}

function ProjectSection({ project, index, onNavigate }: { project: Project; index: number; onNavigate: (page: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${index % 2 === 1 ? 'bg-[#0D0D0D]' : ''}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
            transition={{ duration: 0.8 }}
            className={isEven ? '' : 'lg:order-2'}
          >
            <div className="mb-4">
              <span className="text-[#FF7A00] text-sm tracking-wider uppercase">
                {project.category}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl text-white mb-6 font-futuristic">
              {project.title}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* Video Player Controls (if video exists) */}
            {project.videoUrl && (
              <div className="mb-8 p-4 bg-[#222222] rounded-lg border border-[#FF7A00]/20">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/90 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="text-[#1A1A1A]" size={24} />
                    ) : (
                      <Play className="text-[#1A1A1A]" size={24} />
                    )}
                  </button>
                  <div>
                    <p className="text-white text-sm">Project Walkthrough</p>
                    <p className="text-gray-400 text-xs">Click to play video demo</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => onNavigate('event-os-demo')}
              className="px-6 py-3 bg-transparent border-2 border-[#FF7A00] text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/10 transition-all inline-flex items-center gap-2"
            >
              Start Similar Project
              <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Images Grid with Scroll Animation */}
          <div className={`relative ${isEven ? '' : 'lg:order-1'}`}>
            <div className="relative min-h-[600px]">
              {project.images.map((image, imgIndex) => {
                const positions = getImagePositions(project.images.length, imgIndex);
                
                return (
                  <motion.div
                    key={imgIndex}
                    initial={{ 
                      opacity: 0, 
                      y: 50,
                      rotate: positions.rotate,
                      scale: 0.8
                    }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0,
                      rotate: positions.rotate,
                      scale: 1
                    } : { 
                      opacity: 0, 
                      y: 50,
                      rotate: positions.rotate,
                      scale: 0.8
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: imgIndex * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="absolute shadow-2xl"
                    style={{
                      top: positions.top,
                      left: positions.left,
                      zIndex: imgIndex,
                      width: '280px',
                    }}
                  >
                    <div 
                      className="rounded-lg overflow-hidden border-4 border-[#222222] shadow-lg hover:scale-105 transition-transform duration-300"
                      style={{
                        boxShadow: `0 10px 40px ${project.color}40`,
                      }}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to position images in an artistic layout
function getImagePositions(totalImages: number, index: number) {
  const layouts = [
    // 3 images layout (for mobile app mockups)
    [
      { top: '0%', left: '15%', rotate: -4 },
      { top: '25%', left: '35%', rotate: 2 },
      { top: '50%', left: '10%', rotate: -3 },
    ],
    // 4 images layout
    [
      { top: '0%', left: '0%', rotate: -5 },
      { top: '10%', left: '30%', rotate: 3 },
      { top: '40%', left: '5%', rotate: -3 },
      { top: '50%', left: '35%', rotate: 5 },
    ],
    // 5 images layout
    [
      { top: '0%', left: '10%', rotate: -8 },
      { top: '5%', left: '45%', rotate: 4 },
      { top: '35%', left: '0%', rotate: -4 },
      { top: '40%', left: '40%', rotate: 6 },
      { top: '70%', left: '15%', rotate: -3 },
    ],
    // 6 images layout
    [
      { top: '0%', left: '0%', rotate: -6 },
      { top: '0%', left: '35%', rotate: 3 },
      { top: '30%', left: '10%', rotate: -3 },
      { top: '35%', left: '45%', rotate: 5 },
      { top: '60%', left: '0%', rotate: -4 },
      { top: '65%', left: '40%', rotate: 4 },
    ],
  ];

  // Select layout based on total images
  let layout;
  if (totalImages === 3) {
    layout = layouts[0];
  } else if (totalImages === 4) {
    layout = layouts[1];
  } else if (totalImages === 5) {
    layout = layouts[2];
  } else {
    layout = layouts[3];
  }

  return layout[index] || { top: '0%', left: '0%', rotate: 0 };
}