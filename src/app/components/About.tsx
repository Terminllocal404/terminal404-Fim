import { motion } from 'motion/react';
import { Building2, Code2, Users2, TrendingUp } from 'lucide-react';

export function About() {
  const stats = [
    { icon: Building2, label: 'Empresa de Tecnologia', value: 'Profissional' },
    { icon: Users2, label: 'Comunidade Técnica', value: 'Ativa' },
    { icon: Code2, label: 'Projetos', value: 'Colaborativos' },
    { icon: TrendingUp, label: 'Crescimento', value: 'Contínuo' },
  ];

  return (
    <section id="sobre" className="relative py-24 bg-[#0B0F1A]">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="#00E5FF" />
              <circle cx="90" cy="90" r="2" fill="#00E5FF" />
              <path d="M 10 10 L 50 10 L 50 50 L 90 50 L 90 90" stroke="#00E5FF" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre a <span className="text-[#00E5FF]">Terminal_404</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#05070D]/50 backdrop-blur-sm border border-[#00E5FF]/20 rounded-2xl p-8 relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] rounded-full blur-[80px] opacity-10" />
              
              <p className="text-[#B0B3B8] text-lg leading-relaxed mb-6 relative z-10">
                A Terminal_404 é uma <span className="text-white font-semibold">empresa de tecnologia e comunidade técnica</span> criada para unir desenvolvedores, profissionais e entusiastas da programação em um ambiente sério, organizado e colaborativo.
              </p>
              
              <p className="text-[#B0B3B8] text-lg leading-relaxed relative z-10">
                Atuamos no <span className="text-white font-semibold">desenvolvimento de projetos</span>, troca de conhecimento e construção de soluções digitais com foco em <span className="text-[#00E5FF]">qualidade</span>, <span className="text-[#00E5FF]">segurança</span> e <span className="text-[#00E5FF]">crescimento técnico</span>.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#05070D]/50 backdrop-blur-sm border border-[#00E5FF]/20 rounded-xl p-6 hover:border-[#00E5FF]/40 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="mb-4 relative">
                    <stat.icon className="w-8 h-8 text-[#00E5FF]" />
                    <div className="absolute inset-0 blur-lg bg-[#00E5FF] opacity-0 group-hover:opacity-30 transition-opacity" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[#B0B3B8]">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
