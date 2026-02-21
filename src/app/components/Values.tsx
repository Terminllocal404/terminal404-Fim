import { motion } from 'motion/react';
import { Award, Layers, Users, Shield, TrendingUp, Heart } from 'lucide-react';

export function Values() {
  const values = [
    {
      icon: Award,
      title: 'Profissionalismo',
      description: 'Compromisso com excelência e qualidade em cada projeto',
    },
    {
      icon: Layers,
      title: 'Organização',
      description: 'Estrutura sólida e processos bem definidos',
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Trabalho em equipe e compartilhamento de conhecimento',
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Proteção de dados e melhores práticas de desenvolvimento',
    },
    {
      icon: TrendingUp,
      title: 'Crescimento Técnico',
      description: 'Evolução contínua e aprimoramento profissional',
    },
    {
      icon: Heart,
      title: 'Ética e Respeito',
      description: 'Ambiente inclusivo e profissional para todos',
    },
  ];

  return (
    <section id="valores" className="relative py-24 bg-[#05070D]">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00E5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Central Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF] rounded-full blur-[120px] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos <span className="text-[#00E5FF]">Valores</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto mb-6" />
          <p className="text-[#B0B3B8] text-lg max-w-2xl mx-auto">
            Os princípios que guiam nossa empresa e comunidade técnica
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-full bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8 hover:border-[#00E5FF]/50 transition-all duration-300 overflow-hidden">
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#00E5FF]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon Container */}
                <div className="mb-6 relative inline-block">
                  <div className="absolute inset-0 blur-xl bg-[#00E5FF] opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative bg-[#05070D] rounded-xl p-4 border border-[#00E5FF]/30 group-hover:border-[#00E5FF] transition-colors inline-block">
                    <value.icon className="w-7 h-7 text-[#00E5FF]" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-[#B0B3B8] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Animated Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00E5FF] to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
