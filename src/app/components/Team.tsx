import { motion } from 'motion/react';
import { Users, Code, Database, Layout, GitBranch, Server } from 'lucide-react';

export function Team() {
  const founders = [
    {
      name: 'xuehe',
      role: 'CEO & Backend Lead',
      title: 'Fundador & Arquiteto de Sistemas',
      image: 'https://ancient-copper-6iysugv0ez.edgeone.app/1.jpg',
      responsibilities: [
        'Administração completa do projeto',
        'Gestão de clientes e reuniões estratégicas',
        'Desenvolvimento Backend e arquitetura',
        'Criação e configuração de servidores',
        'Administração de banco de dados',
        'Coordenação de demandas da equipe',
      ],
      icon: Database,
      color: '#00E5FF',
    },
    {
      name: 'Griffith',
      role: 'Frontend Lead',
      title: 'Fundador & Especialista Frontend',
      image: 'https://low-apricot-toxmvzecmd.edgeone.app/2.png',
      responsibilities: [
        'Desenvolvimento de interfaces modernas',
        'Arquitetura Frontend',
        'Experiência do usuário (UX/UI)',
        'Otimização de performance',
        'Implementação de design systems',
      ],
      icon: Layout,
      color: '#00E5FF',
    },
    {
      name: 'Lauferistor',
      role: 'Frontend Lead',
      title: 'Fundador & Especialista Frontend',
      image: 'https://voluminous-peach-243v1ioo1k.edgeone.app/3.jpg',
      responsibilities: [
        'Desenvolvimento de interfaces responsivas',
        'Implementação de componentes',
        'Integração com APIs',
        'Testes e qualidade de código',
        'Inovação em tecnologias web',
      ],
      icon: Code,
      color: '#00E5FF',
    },
  ];

  return (
    <section id="equipe" className="relative py-24 bg-[#05070D] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00E5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-full px-4 py-2 mb-6">
            <Users className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Nossos Fundadores</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Liderança <span className="text-[#00E5FF]">Técnica</span>
          </h2>
          <p className="text-[#B0B3B8] text-lg max-w-2xl mx-auto">
            Conheça os profissionais que lideram a Terminal_404 e transformam ideias em soluções tecnológicas de alto nível
          </p>
        </motion.div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 h-full">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Image */}
                  <div className="relative mb-6 overflow-hidden rounded-xl aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Icon Badge */}
                    <div className="absolute bottom-3 right-3 bg-[#05070D] border border-[#00E5FF]/30 rounded-lg p-2 z-20">
                      <founder.icon className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{founder.name}</h3>
                    <p className="text-[#00E5FF] font-semibold mb-1">{founder.role}</p>
                    <p className="text-[#B0B3B8] text-sm">{founder.title}</p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent mb-4" />

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-[#00E5FF]" />
                      Responsabilidades
                    </h4>
                    <ul className="space-y-2">
                      {founder.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#B0B3B8] text-sm">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00E5FF] flex-shrink-0" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#00E5FF] opacity-10 rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: Server, label: 'Backend & Infraestrutura', value: '1 Líder' },
            { icon: Layout, label: 'Frontend & Interface', value: '2 Especialistas' },
            { icon: Users, label: 'Gestão & Estratégia', value: '100% Dedicação' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border border-[#00E5FF]/20 rounded-xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#05070D] border border-[#00E5FF]/30 rounded-lg mb-4">
                <stat.icon className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-[#B0B3B8] text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}