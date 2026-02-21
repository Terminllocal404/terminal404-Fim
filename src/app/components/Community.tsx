import { motion } from 'motion/react';
import { Users, Code, Database, Layers, Coffee, Zap, MessageCircle, UserCheck, Shield, CheckCircle, ArrowRight, Clock } from 'lucide-react';

export function Community() {
  const areas = [
    { name: 'Backend', icon: Code },
    { name: 'Frontend', icon: Layers },
    { name: 'Database', icon: Database },
    { name: 'PHP', icon: Code },
    { name: 'Java', icon: Coffee },
    { name: 'Iniciante', icon: Zap },
    { name: 'Intermediário', icon: Zap },
    { name: 'Avançado', icon: Zap },
  ];

  const entrySteps = [
    {
      icon: MessageCircle,
      title: 'Solicite Acesso',
      description: 'Entre no Discord através do link oficial',
      color: '#00E5FF',
    },
    {
      icon: UserCheck,
      title: 'Entrevista com Xuehe',
      description: 'O fundador fará algumas perguntas técnicas e comportamentais',
      color: '#00B8D4',
    },
    {
      icon: CheckCircle,
      title: 'Aprovação',
      description: 'Aprovado, você terá acesso completo à comunidade',
      color: '#0097A7',
    },
  ];

  return (
    <section id="comunidade" className="relative py-24 bg-[#0B0F1A]">
      {/* Circuit Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-community" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="3" fill="#00E5FF" />
              <circle cx="105" cy="105" r="3" fill="#00E5FF" />
              <path d="M 15 15 L 60 15 L 60 60 L 105 60 L 105 105" stroke="#00E5FF" strokeWidth="1.5" fill="none" />
              <circle cx="60" cy="15" r="2" fill="#00E5FF" />
              <circle cx="60" cy="60" r="2" fill="#00E5FF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-community)" />
        </svg>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[150px] opacity-5" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[150px] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#05070D] border border-[#00E5FF]/30 rounded-full px-4 py-2 mb-6">
            <Users className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Comunidade Técnica</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossa <span className="text-[#00E5FF]">Comunidade</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto mb-6" />
          <p className="text-[#B0B3B8] text-lg max-w-2xl mx-auto">
            Uma comunidade exclusiva de desenvolvedores com processo seletivo e ambiente profissional
          </p>
        </motion.div>

        {/* Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-[#05070D]/60 backdrop-blur-sm border border-[#00E5FF]/30 rounded-2xl p-8 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#00E5FF] rounded-full blur-[100px] opacity-10" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#00E5FF] rounded-full blur-[100px] opacity-10" />
            
            <p className="text-[#B0B3B8] text-lg leading-relaxed text-center relative z-10">
              A comunidade Terminal_404 é <span className="text-white font-semibold">estruturada por áreas técnicas</span>, linguagens e níveis de conhecimento, mantendo sempre um padrão <span className="text-[#00E5FF]">profissional</span>, <span className="text-[#00E5FF]">ético</span> e <span className="text-[#00E5FF]">respeitoso</span>.
            </p>
          </div>
        </motion.div>

        {/* Processo de Entrada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-[#00E5FF]" />
              Processo de Entrada
            </h3>
            <p className="text-[#B0B3B8]">
              Garantimos qualidade através de um processo seletivo criterioso
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {entrySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Arrow */}
                {index < entrySteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 z-20">
                    <ArrowRight className="w-8 h-8 text-[#00E5FF]/30" />
                  </div>
                )}

                <div className="bg-[#05070D] border border-[#00E5FF]/30 rounded-2xl p-6 h-full relative overflow-hidden group hover:border-[#00E5FF]/60 transition-all duration-300">
                  {/* Background Glow */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: step.color }}
                  />

                  {/* Step Number */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-[#00E5FF]/20 border border-[#00E5FF]/30 rounded-full flex items-center justify-center">
                      <span className="text-[#00E5FF] font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-[#00E5FF]" />
                    </div>

                    {/* Content */}
                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-[#B0B3B8] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Important Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 rounded-xl p-6 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Clock className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Sobre a Entrevista</h4>
                <p className="text-[#B0B3B8] text-sm leading-relaxed">
                  A entrevista é conduzida por <span className="text-[#00E5FF] font-semibold">Xuehe</span>, fundador da Terminal_404. 
                  Serão feitas perguntas sobre suas habilidades técnicas, experiência e objetivos. 
                  O processo busca manter o padrão de qualidade e profissionalismo da comunidade.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">Áreas Técnicas</h3>
            <p className="text-[#B0B3B8]">Organizados por tecnologias e níveis de conhecimento</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {areas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-[#05070D] border border-[#00E5FF]/20 rounded-xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 relative overflow-hidden">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center gap-3">
                    <div className="relative">
                      <area.icon className="w-8 h-8 text-[#00E5FF] relative z-10" />
                      <div className="absolute inset-0 blur-lg bg-[#00E5FF] opacity-0 group-hover:opacity-50 transition-opacity" />
                    </div>
                    <span className="text-white font-semibold group-hover:text-[#00E5FF] transition-colors">
                      {area.name}
                    </span>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E5FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border-2 border-[#00E5FF]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-5" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-5" />
            
            <div className="relative z-10 text-center">
              {/* Discord Icon SVG */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#5865F2]/20 border border-[#5865F2]/30 rounded-2xl mb-6">
                <svg className="w-12 h-12" viewBox="0 0 127.14 96.36" fill="#5865F2">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para Participar?
              </h3>
              <p className="text-[#B0B3B8] text-lg mb-8 max-w-2xl mx-auto">
                Junte-se à nossa comunidade no Discord e inicie seu processo de entrada. 
                Estamos ansiosos para conhecer você!
              </p>

              <a
                href="https://discord.gg/tFxpHsPW"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] text-white rounded-xl font-semibold hover:bg-[#4752C4] transition-all duration-300 shadow-[0_0_30px_rgba(88,101,242,0.3)] hover:shadow-[0_0_50px_rgba(88,101,242,0.5)]"
              >
                <svg className="w-6 h-6" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
                <span>Entrar no Discord</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-[#B0B3B8] text-sm mt-6">
                Ao entrar, aguarde o contato para a entrevista com Xuehe
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
