import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ShoppingBag, 
  Zap, 
  ArrowRight, 
  X, 
  Shield, 
  Check, 
  Music, 
  Crown 
} from 'lucide-react';
import { SOUND_CLASH_DATA, CORPORATE_CLASH_DATA, RECEPTION_OS_DATA, EventOSData } from './EventOSData';

interface EventOSDemoProps {
  onNavigate: (page: string) => void;
}

// Map IDs to Data Objects
const THEMES: Record<string, EventOSData> = {
  nightlife: SOUND_CLASH_DATA,
  corporate: CORPORATE_CLASH_DATA,
  wedding: RECEPTION_OS_DATA
};

// Generate fake chart data
const generateChartData = () => Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: 40 + Math.random() * 40 + (i > 15 ? 20 : 0) // Spike at the end
}));

export function EventOSDemo({ onNavigate }: EventOSDemoProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>('nightlife');
  const activeData = THEMES[activeThemeId];
  const { theme, labels, contestants, liveStats, storeItems, requests, vipUsers } = activeData;

  const [votes, setVotes] = useState({ [contestants[0].id]: activeData.contestants[0].initialVotes, [contestants[1].id]: activeData.contestants[1].initialVotes });
  const [hypeData, setHypeData] = useState(generateChartData());
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Reset votes when theme changes
  useEffect(() => {
    setVotes({ 
      [contestants[0].id]: contestants[0].initialVotes, 
      [contestants[1].id]: contestants[1].initialVotes 
    });
  }, [activeThemeId, contestants]);

  // Measure chart container
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setChartWidth(entry.contentRect.width);
        }
      }
    });
    resizeObserver.observe(chartContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Live simulation effects
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate votes slightly
      setVotes(prev => {
        const change = Math.random() > 0.5 ? 0.1 : -0.1;
        // Ensure keys exist before updating
        const id1 = contestants[0].id;
        const id2 = contestants[1].id;
        return {
          ...prev,
          [id1]: Math.min(90, Math.max(10, (prev[id1] || 50) + change)),
          [id2]: Math.min(90, Math.max(10, (prev[id2] || 50) - change))
        };
      });

      // Update chart
      setHypeData(prev => {
        const newData = [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: 50 + Math.random() * 40 }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [contestants]); // Add contestants dependency

  const handleAction = (action: string) => {
    setNotification(action);
    setTimeout(() => setNotification(null), 3000);
  };

  const openStore = () => {
    setShowStoreModal(true);
  };

  return (
    <div className={`min-h-screen font-sans text-white overflow-x-hidden relative transition-colors duration-500 ${theme.background}`}>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen" />
      <div className={`fixed inset-0 bg-gradient-to-b ${theme.background} pointer-events-none`} />

      {/* Navigation */}
      <nav className={`sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl transition-colors duration-500 bg-black/80`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('portfolio')}
            className="flex items-center text-white/60 hover:text-white transition-colors text-sm font-medium"
          >
            <ChevronLeft size={18} className="mr-1" />
            Exit
          </button>
          
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-wider text-lg hidden sm:block">
              {labels.appName} <span style={{ color: theme.primary }}>{labels.appSubtitle}</span>
            </span>
             {/* Theme Selector (Mobile Friendly) */}
             <div className="flex bg-white/10 rounded-lg p-1 ml-2">
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveThemeId(key)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    activeThemeId === key 
                      ? 'bg-white text-black shadow-lg' 
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {THEMES[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {labels.liveBadge}
            </div>
            <button 
              onClick={openStore}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border"
              style={{ 
                borderColor: `${theme.primary}33`, // 20% opacity
                backgroundColor: `${theme.primary}1A`, // 10% opacity
                color: theme.primary 
              }}
            >
              <ShoppingBag size={14} />
              <span className="hidden sm:inline">Store</span>
            </button>
          </div>
        </div>
        
        {/* Ticker */}
        <div className="border-y border-white/5 overflow-hidden py-2" style={{ backgroundColor: `${theme.primary}0D` }}>
          <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs font-medium" style={{ color: `${theme.primary}CC` }}>
            {labels.ticker.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
             {/* Repeat for seamless loop */}
             {labels.ticker.map((item, i) => (
              <span key={`dup-${i}`}>{item}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content - Bento Grid */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
          
          {/* 1. Main Battle Stage (Large) */}
          <div className={`md:col-span-8 md:row-span-2 relative group rounded-3xl overflow-hidden border border-white/10 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="absolute inset-0 opacity-50 transition-colors duration-500" 
                 style={{ background: `linear-gradient(135deg, ${theme.primary}1A, transparent)` }} />
            
            {/* Battle Content */}
            <div className="relative p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-sm font-bold tracking-widest uppercase mb-1" style={{ color: theme.primary }}>
                    {labels.battleSubtitle}
                  </h2>
                  <h1 className="text-3xl font-black italic">{labels.battleTitle}</h1>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                  12:45 REMAINING
                </div>
              </div>

              {/* Contestants */}
              <div className="flex-1 grid grid-cols-2 gap-4 sm:gap-8 items-end pb-8">
                {contestants.map((contestant, idx) => (
                  <div key={contestant.id} className="text-center relative">
                    <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-full p-1 transition-all duration-500" 
                         style={{ background: `linear-gradient(135deg, ${contestant.color}, transparent)` }}>
                      <img src={contestant.image} alt={contestant.name} className={`w-full h-full rounded-full object-cover border-4 transition-colors duration-500 ${theme.cardBg === 'bg-[#1a2236]' ? 'border-[#1a2236]' : 'border-[#111]'}`} />
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 transition-colors duration-500 ${theme.cardBg}`}>
                        <span className="text-xs font-bold" style={{ color: contestant.color }}>#{idx + 1}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-black uppercase mb-1">{contestant.name}</h3>
                    <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-4">{contestant.role}</p>
                    
                    <div className="relative h-12 bg-white/5 rounded-xl overflow-hidden mb-4 group cursor-pointer hover:bg-white/10 transition-colors"
                         onClick={() => handleAction(`Voted for ${contestant.name}`)}>
                      <div 
                        className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out opacity-20"
                        style={{ width: `${Math.round(votes[contestant.id] || 50)}%`, background: contestant.color }}
                      />
                      <div className="relative flex items-center justify-between px-4 h-full">
                        <span className="font-bold text-sm">{labels.voteButton || 'VOTE'}</span>
                        <span className="font-mono font-bold" style={{ color: contestant.color }}>
                          {Math.round(votes[contestant.id] || 50)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* VS Divider */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black italic text-white/5 pointer-events-none">
                VS
              </div>
            </div>
          </div>

          {/* 2. Live Stats (Top Right) */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Live Activity</h3>
            <div ref={chartContainerRef} className="w-full h-32 mb-4 relative min-w-0 overflow-hidden">
              {chartWidth > 0 && (
                <AreaChart width={chartWidth} height={128} data={hypeData}>
                  <defs>
                    <linearGradient id="colorHype" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={theme.primary} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={theme.primary} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={theme.primary} 
                    fillOpacity={1} 
                    fill="url(#colorHype)" 
                    strokeWidth={2}
                  />
                  <YAxis hide domain={['dataMin', 'dataMax']} />
                </AreaChart>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {liveStats.slice(0, 2).map((stat) => (
                <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 mb-1 text-white/60">
                    <stat.icon size={12} />
                    <span className="text-[10px] font-bold uppercase">{stat.label}</span>
                  </div>
                  <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Enhanced Store Section (Middle Right) */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.storeTitle}</h3>
              <button onClick={openStore} className="text-xs font-bold hover:text-white transition-colors" style={{ color: theme.primary }}>
                VIEW ALL
              </button>
            </div>
            <div className="space-y-3">
              {storeItems.slice(0, 3).map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    if (item.popular) openStore();
                    else handleAction(`Selected: ${item.name}`);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group text-left relative overflow-hidden hover:border-white/20"
                >
                  {item.popular && (
                    <div className="absolute top-0 right-0 px-2 py-0.5 text-black text-[8px] font-bold rounded-bl-lg" style={{ backgroundColor: theme.primary }}>
                      HOT
                    </div>
                  )}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                       style={{ backgroundColor: `${item.color}1A`, color: item.color }}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-[10px] text-white/40">{item.desc}</div>
                  </div>
                  <div className="text-sm font-bold text-white/90">${item.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Request Line (Bottom Left) */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 overflow-hidden transition-colors duration-500 ${theme.cardBg}`}>
             <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.requestTitle}</h3>
              <Music size={14} className="text-white/40" />
            </div>
            <div className="space-y-3 mb-4">
              {requests.map((req) => (
                <div key={req.id} className="flex items-center justify-between group cursor-pointer" onClick={() => handleAction(`Upvoted ${req.song}`)}>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono text-white/30 group-hover:text-white transition-colors">0{req.id}</div>
                    <div>
                      <div className="text-sm font-medium leading-tight group-hover:text-white transition-colors" style={{ color: req.votes > 50 ? theme.secondary : 'white' }}>{req.song}</div>
                      <div className="text-xs text-white/40">{req.artist}</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-md bg-white/5 text-xs font-mono text-white/60 transition-colors group-hover:bg-white/10">
                    {req.votes}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleAction('Request Modal Opened')}
              className="w-full py-2 rounded-lg border border-dashed border-white/20 text-xs font-bold text-white/40 hover:text-white hover:border-white/40 transition-all"
            >
              + ADD ITEM
            </button>
          </div>

          {/* 5. VIP Lounge (Bottom Middle) */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.vipTitle}</h3>
              <Crown size={14} className="text-[#FFD700]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {vipUsers.map((user, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="relative">
                    <img src={user.img} alt={user.name} className="w-8 h-8 rounded-full border border-white/10" />
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black" />
                  </div>
                  <div>
                    <div className="text-xs font-bold transition-colors group-hover:text-white">{user.name}</div>
                    <div className="text-[10px] text-white/40">{user.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Brand Promo (Bottom Right) */}
          <div className="md:col-span-4 rounded-3xl border border-white/10 p-6 text-black flex flex-col justify-between relative overflow-hidden"
               style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={120} />
            </div>
            
            <div className="relative z-10">
               <h3 className="text-2xl font-black italic uppercase leading-none mb-2">UNLOCK<br/>FULL ACCESS</h3>
               <p className="text-sm font-medium opacity-80">Get the full Event OS experience for your next production.</p>
            </div>
            
            <button 
              onClick={() => onNavigate('start-project')}
              className="relative z-10 mt-6 w-full py-3 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              Start Your Project
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </main>

      {/* --- MODALS --- */}
      
      {/* Store Modal */}
      <AnimatePresence>
        {showStoreModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowStoreModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative ${theme.cardBg}`}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowStoreModal(false)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-20"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 h-full min-h-[600px]">
                {/* Left Side: Hero */}
                <div className="md:col-span-4 bg-[#0A0A0A] p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${theme.primary}, transparent)` }} />
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black italic text-white mb-2 uppercase">{labels.storeTitle}</h2>
                    <p className="text-white/60 text-sm mb-8">
                      Boost your influence in the room. Get noticed. Unlock exclusive rewards.
                    </p>
                    
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield style={{ color: theme.primary }} size={20} />
                        <span className="font-bold text-sm">Instant Delivery</span>
                      </div>
                      <p className="text-[10px] text-white/40">
                        Purchases are applied to your account immediately. Valid for this event only.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto relative z-10">
                    <div className="text-xs font-bold text-white/40 mb-2">ACCEPTED PAYMENTS</div>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 rounded bg-white/10" />
                      <div className="w-8 h-5 rounded bg-white/10" />
                      <div className="w-8 h-5 rounded bg-white/10" />
                    </div>
                  </div>
                </div>

                {/* Right Side: Items (Simulated Tiers from Store Items) */}
                <div className={`md:col-span-8 p-8 ${theme.cardBg}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full items-center">
                    {storeItems.slice(0, 3).map((item) => (
                      <div 
                        key={item.id}
                        className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 group ${
                          item.popular 
                            ? 'bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)] z-10 scale-105' 
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                        }`}
                        style={{ borderColor: item.popular ? theme.primary : undefined }}
                      >
                        {item.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-black text-[10px] font-black uppercase tracking-wider rounded-full"
                               style={{ backgroundColor: theme.primary }}>
                            Most Popular
                          </div>
                        )}

                        <div className="flex justify-center mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center`}
                               style={{ backgroundColor: item.popular ? theme.primary : 'rgba(255,255,255,0.1)', color: item.popular ? 'black' : 'white' }}>
                            <item.icon size={24} />
                          </div>
                        </div>

                        <div className="text-center mb-6">
                          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-sm opacity-60">$</span>
                            <span className="text-3xl font-black">{item.price}</span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-8">
                           <div className="flex items-center gap-2 text-xs text-white/80 justify-center">
                              {item.desc}
                           </div>
                        </div>

                        <button 
                          onClick={() => {
                            setShowStoreModal(false);
                            handleAction(`Purchased ${item.name}`);
                          }}
                          className={`w-full py-3 rounded-xl text-xs font-bold transition-all`}
                          style={{ 
                            backgroundColor: item.popular ? theme.primary : 'rgba(255,255,255,0.1)',
                            color: item.popular ? 'black' : 'white'
                          }}
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-full bg-[#1A1A1A] border text-white shadow-2xl flex items-center gap-3"
            style={{ borderColor: theme.primary, boxShadow: `0 0 30px ${theme.primary}4D` }}
          >
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-black" style={{ backgroundColor: theme.primary }}>
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="font-medium text-sm">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
