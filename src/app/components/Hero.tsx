import { motion } from 'motion/react';
import { ArrowRight, FileCode, Briefcase, Sparkles, Code2, Database } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05070D]">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00E5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Multiple Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00E5FF]/5 to-transparent rounded-full blur-3xl" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00E5FF] rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 100],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <motion.path
          d="M 0,100 L 200,100 L 200,300 L 400,300"
          stroke="#00E5FF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.path
          d="M 800,50 L 600,50 L 600,250 L 400,250"
          stroke="#00E5FF"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0F1A]/80 backdrop-blur-sm border border-[#00E5FF]/30 mb-8 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#00E5FF]/10 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />
            <Sparkles className="w-4 h-4 text-[#00E5FF] relative z-10" />
            <span className="text-[#B0B3B8] text-sm relative z-10">Empresa e Comunidade de Tecnologia</span>
          </motion.div>

          {/* Main Title with Gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block"
            >
              Terminal
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-[#00E5FF] via-[#00B8D4] to-[#00E5FF] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]"
            >
              _404
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl text-white mb-4 max-w-4xl mx-auto font-light"
          >
            Onde <span className="text-[#00E5FF] font-semibold">tecnologia</span>, <span className="text-[#00E5FF] font-semibold">projetos</span> e <span className="text-[#00E5FF] font-semibold">profissionais</span> se conectam.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-[#B0B3B8] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Empresa e comunidade focada em desenvolvimento, colaboração técnica e soluções digitais modernas.
          </motion.p>

          {/* Tech Stack Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-6 mb-12"
          >
            {[
              { icon: Code2, label: 'Frontend' },
              { icon: Database, label: 'Backend' },
              { icon: FileCode, label: 'Full Stack' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#00E5FF] rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                  <div className="relative bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-lg p-3 group-hover:border-[#00E5FF] transition-colors">
                    <item.icon className="w-6 h-6 text-[#00E5FF]" />
                  </div>
                </div>
                <span className="text-xs text-[#B0B3B8]">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              to="/solicitacao"
              className="group relative px-8 py-4 bg-[#00E5FF] text-[#0B0F1A] rounded-lg font-semibold flex items-center gap-2 hover:bg-[#00E5FF]/90 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FileCode className="w-5 h-5" />
                Solicitar Projeto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </Link>

            <Link 
              to="/comunidade"
              className="group relative px-8 py-4 bg-transparent border-2 border-[#00E5FF] text-[#00E5FF] rounded-lg font-semibold flex items-center gap-2 hover:bg-[#00E5FF]/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Briefcase className="w-5 h-5" />
              Conhecer a Comunidade
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-opacity opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
          >
            {[
              { value: '50+', label: 'Projetos' },
              { value: '100+', label: 'Membros' },
              { value: '24/7', label: 'Suporte' }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-[#00E5FF]/5 rounded-lg blur-xl group-hover:bg-[#00E5FF]/10 transition-colors" />
                <div className="relative bg-[#0B0F1A]/50 backdrop-blur-sm border border-[#00E5FF]/20 rounded-lg p-4 group-hover:border-[#00E5FF]/50 transition-colors">
                  <div className="text-3xl md:text-4xl font-bold text-[#00E5FF] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#B0B3B8]">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#00E5FF]/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-[#00E5FF] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}