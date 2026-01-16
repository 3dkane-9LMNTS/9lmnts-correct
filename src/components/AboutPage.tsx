import { Brain, Zap, Target, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
const founderImage = '/images/founder.png';

interface AboutPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const aiFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Design',
      description: 'Leveraging machine learning to optimize layouts and user experiences',
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'AI-assisted wireframing and mockup generation for faster iterations',
    },
    {
      icon: Target,
      title: 'Smart Optimization',
      description: 'Automated testing and performance optimization powered by AI',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm">
              About Us
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            <span className="font-futuristic">Where Culture Meets</span><br />
            <span className="font-graffiti text-[#FF7A00]">Technology</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            9LMNTS Studio bridges the gap between Hip-Hop culture and cutting-edge 
            digital innovation, creating experiences that resonate and inspire
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border-2 border-[#FF7A00]/30">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1735497947638-a4516ae93a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldCUyMGFydCUyMGdyYWZmaXRpfGVufDF8fHx8MTc2NDI0NjM1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Hip-Hop Culture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FF7A00]/20 rounded-lg blur-2xl"></div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl text-white mb-6">
                <span className="font-futuristic">The</span> <span className="font-futuristic">9LMNTS</span> <span className="font-graffiti text-[#FF7A00]">Story</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Born from the vibrant energy of Hip-Hop culture, 9LMNTS Studio 
                  represents the convergence of artistic expression and technological 
                  innovation. Just as Hip-Hop consists of 9 foundational elements—
                  MCing, DJing, Graffiti, Breaking, Beatboxing, Knowledge, Fashion, 
                  Entrepreneurship, and Language—our approach to digital design draws 
                  from these diverse disciplines.
                </p>
                <p>
                  Each element influences how we craft digital experiences. The rhythm 
                  of a DJ's mix informs our UX flows. The bold statements of graffiti 
                  art inspire our visual designs. The entrepreneurial spirit drives our 
                  innovative solutions. The result? Websites and applications that don't 
                  just function—they perform.
                </p>
                <p>
                  We believe that great design, like great Hip-Hop, is about authentic 
                  expression, cultural awareness, and pushing boundaries. Every project 
                  we undertake is an opportunity to create something that resonates on 
                  a deeper level, connecting with audiences through both aesthetics and 
                  meaning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Element Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              <span className="font-futuristic">The</span> <span className="font-graffiti text-[#FF7A00]">AI Element</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We've added a 10th element to the traditional 9: Artificial Intelligence. 
              By integrating AI into our workflow, we deliver smarter, faster, and more 
              innovative solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="grid gap-6">
                {aiFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-[#222222] p-6 rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#FF7A00]/10 rounded-lg flex-shrink-0">
                          <Icon className="text-[#FF7A00]" size={24} />
                        </div>
                        <div>
                          <h3 className="text-white text-xl mb-2">{feature.title}</h3>
                          <p className="text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#FF7A00]/30 bg-[#0D0D0D]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1750365919971-7dd273e7b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2lyY3VpdCUyMG5ldHdvcmt8ZW58MXx8fHwxNzY0MjY4MjEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="AI Technology"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/20 to-transparent"></div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#FF7A00]/20 rounded-lg blur-2xl"></div>
            </div>
          </div>

          <div className="bg-[#222222] p-8 rounded-lg border border-[#FF7A00]/20">
            <h3 className="text-white text-2xl mb-4">Our AI Workflow</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              From initial concept to final deployment, AI enhances every stage of our 
              process. We use machine learning algorithms to analyze user behavior, 
              optimize designs, and predict trends. This allows us to create solutions 
              that are not just current, but future-ready.
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {['Analyze', 'Design', 'Optimize', 'Deploy'].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#FF7A00]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-[#FF7A00] text-xl">{index + 1}</span>
                  </div>
                  <span className="text-white">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              <span className="font-futuristic">Meet the</span> <span className="font-graffiti text-[#FF7A00]">Founder</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative max-w-md mx-auto">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#FF7A00]/30">
                <img
                  src={founderImage}
                  alt="Darnley Sanon - Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FF7A00]/20 rounded-lg blur-2xl"></div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-white text-3xl mb-2">Darnley Sanon</h3>
                <p className="text-[#FF7A00] text-xl">Founder & Creative Director</p>
              </div>

              <div className="space-y-4 text-gray-400 leading-relaxed mb-8">
                <p>
                  With over a decade of experience in graphic design and UI/UX, 
                  Darnley founded 9LMNTS Studio to merge his passion for Hip-Hop 
                  culture with cutting-edge digital design. His unique approach 
                  combines artistic authenticity with technical excellence.
                </p>
                <p>
                  As a freelance graphic designer and UI/UX specialist, he has 
                  worked with clients across Southeast Asia, bringing a fresh 
                  perspective that honors cultural roots while embracing innovation.
                </p>
                <p>
                  "Every project is an opportunity to tell a story, to create 
                  something that resonates beyond the screen. That's the power 
                  of combining art, culture, and technology."
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {['Graphic Design', 'UI/UX Design', 'Brand Strategy', 'Art Direction'].map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#222222] border border-[#FF7A00]/30 rounded-full text-[#FF7A00] text-sm"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-white mb-4">
              <span className="font-futuristic">Our</span> <span className="font-graffiti text-[#FF7A00]">Values</span>
            </h2>
            <p className="text-gray-400 text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authenticity',
                description:
                  'We create designs that are true to your brand and resonate with your audience',
              },
              {
                title: 'Innovation',
                description:
                  'We push boundaries and embrace new technologies to deliver cutting-edge solutions',
              },
              {
                title: 'Excellence',
                description:
                  'We are committed to the highest quality in every aspect of our work',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[#222222] p-8 rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all text-center"
              >
                <div className="w-16 h-16 bg-[#FF7A00]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#FF7A00] text-2xl">{index + 1}</span>
                </div>
                <h3 className="text-white text-xl mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-white mb-6">
            <span className="font-futuristic">Ready to Start</span><br />
            <span className="font-futuristic">Your</span> <span className="font-graffiti text-[#FF7A00]">Journey?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Let's create something extraordinary together
          </p>
          <button className="px-8 py-4 bg-[#FF7A00] text-[#1A1A1A] rounded-lg hover:bg-[#FF7A00]/90 transition-all transform hover:scale-105 inline-flex items-center gap-2">
            Get in Touch
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
