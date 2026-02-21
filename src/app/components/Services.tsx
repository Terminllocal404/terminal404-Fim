import { motion, useMotionValue, useTransform } from 'motion/react';
import { Server, Palette, Database, GitBranch, ArrowRight, Code, Zap } from 'lucide-react';
import { useState } from 'react';

export function Services() {
  const services = [
    {
      icon: Server,
      title: 'Backend',
      description: 'Desenvolvimento de APIs, sistemas, regras de negócio e integrações.',
      features: ['APIs REST/GraphQL', 'Microserviços', 'Autenticação', 'Websockets'],
      color: '#00E5FF',
    },
    {
      icon: Palette,
      title: 'Frontend',
      description: 'Criação de interfaces modernas, responsivas e focadas na experiência do usuário.',
      features: ['React/Next.js', 'Design Responsivo', 'Animações', 'PWA'],
      color: '#00B8D4',
    },
    {
      icon: Database,
      title: 'Banco de Dados',
      description: 'Modelagem, otimização, segurança e gerenciamento de dados.',
      features: ['SQL/NoSQL', 'Otimização', 'Migrações', 'Backup'],
      color: '#0097A7',
    },
    {
      icon: GitBranch,
      title: 'Projetos Colaborativos',
      description: 'Ambiente organizado para desenvolvimento e evolução de projetos em equipe.',
      features: ['Git Flow', 'Code Review', 'CI/CD', 'Documentação'],
      color: '#00E5FF',
    },
  ];

  return (
    <section id="servicos" className="relative py-24 bg-[#05070D]">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00E5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF] rounded-full blur-[150px] opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-full px-4 py-2 mb-6">
            <Code className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Nossos Serviços</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Soluções <span className="text-[#00E5FF]">Tecnológicas</span> Completas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto mb-6" />
          <p className="text-[#B0B3B8] text-lg max-w-2xl mx-auto">
            Oferecemos serviços especializados em desenvolvimento de software, desde backend até frontend, com qualidade empresarial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-[#0B0F1A] to-[#05070D] border border-[#00E5FF]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF] rounded-full blur-[120px] opacity-5" />
            <div className="relative z-10">
              <Zap className="w-12 h-12 text-[#00E5FF] mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pronto para iniciar seu projeto?
              </h3>
              <p className="text-[#B0B3B8] mb-6 max-w-2xl mx-auto">
                Nossa equipe está preparada para desenvolver soluções personalizadas para o seu negócio
              </p>
              <a
                href="/solicitacao"
                className="inline-flex items-center gap-2 bg-[#00E5FF] text-[#0B0F1A] px-8 py-4 rounded-lg font-semibold hover:bg-[#00E5FF]/90 transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]"
              >
                Solicitar Orçamento
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group perspective-1000"
    >
      <div className="relative bg-[#0B0F1A]/80 backdrop-blur-sm border border-[#00E5FF]/20 rounded-2xl p-8 h-full overflow-hidden transition-all duration-300 hover:border-[#00E5FF]/50">
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${service.color}15, transparent 70%)`,
          }}
        />

        {/* Glow Effect */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ backgroundColor: service.color }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#05070D] border border-[#00E5FF]/30 rounded-xl mb-6 group-hover:border-[#00E5FF] transition-colors"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(50px)' }}
          >
            <service.icon className="w-8 h-8 text-[#00E5FF]" />
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00E5FF] transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#B0B3B8] mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {service.features.map((feature: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                <span className="text-[#B0B3B8]">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Hover Arrow */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-[#00E5FF] mt-6 font-medium"
          >
            <span>Saiba mais</span>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute top-0 right-0 w-1 h-16 rounded-full"
            style={{ backgroundColor: service.color }}
          />
          <div
            className="absolute top-0 right-0 w-16 h-1 rounded-full"
            style={{ backgroundColor: service.color }}
          />
        </div>
      </div>
    </motion.div>
  );
}
