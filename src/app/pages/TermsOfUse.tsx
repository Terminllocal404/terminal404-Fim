import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertCircle, Shield, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function TermsOfUse() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#05070D] pt-24 pb-16">
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

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0B0F1A] border-2 border-[#00E5FF]/30 rounded-2xl mb-6 relative">
            <FileText className="w-10 h-10 text-[#00E5FF]" />
            <div className="absolute inset-0 blur-xl bg-[#00E5FF] opacity-20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Termos de <span className="text-[#00E5FF]">Uso</span>
          </h1>
          <p className="text-[#B0B3B8] text-lg">Terminal_404</p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] rounded-full blur-[80px] opacity-10" />
            <div className="relative z-10">
              <p className="text-[#B0B3B8] text-base leading-relaxed mb-4">
                Ao acessar e utilizar o site da <span className="text-white font-semibold">Terminal_404</span>, o usuário concorda com os termos e condições descritos neste documento. Caso não concorde, recomenda-se não utilizar nossos serviços.
              </p>
              <p className="text-[#B0B3B8] text-base leading-relaxed">
                A Terminal_404 atua como <span className="text-[#00E5FF]">empresa de tecnologia e comunidade técnica</span>, oferecendo conteúdos, projetos, informações e canais de comunicação voltados ao desenvolvimento de software e colaboração profissional.
              </p>
            </div>
          </section>

          {/* User Commitments */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <CheckCircle className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">O usuário compromete-se a:</h2>
            </div>
            <ul className="space-y-4">
              {[
                'Utilizar o site de forma ética e legal',
                'Não praticar atividades ilícitas, ofensivas ou prejudiciais',
                'Respeitar outros usuários, colaboradores e a empresa',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#00E5FF] flex-shrink-0" />
                  <span className="text-[#B0B3B8] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Limitations of Liability */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <AlertCircle className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">A Terminal_404 não se responsabiliza por:</h2>
            </div>
            <ul className="space-y-4">
              {[
                'Uso indevido das informações disponibilizadas',
                'Interrupções temporárias do serviço',
                'Danos causados por terceiros ou por mau uso da plataforma',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#00E5FF] flex-shrink-0" />
                  <span className="text-[#B0B3B8] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Company Rights */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <Shield className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">A empresa reserva-se o direito de:</h2>
            </div>
            <ul className="space-y-4">
              {[
                'Atualizar conteúdos',
                'Modificar serviços',
                'Alterar estes termos a qualquer momento, sem aviso prévio',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#00E5FF] flex-shrink-0" />
                  <span className="text-[#B0B3B8] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Final Note */}
          <section className="bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 rounded-2xl p-8">
            <p className="text-white text-base leading-relaxed text-center font-semibold">
              O uso contínuo do site após alterações implica concordância com os novos termos.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Dúvidas sobre os Termos de Uso?</h3>
            <p className="text-[#B0B3B8] mb-6">Entre em contato conosco</p>
            <div className="space-y-2">
              <p className="text-[#00E5FF]">
                <a href="mailto:terminallocal404@gmail.com" className="hover:underline">
                  terminallocal404@gmail.com
                </a>
              </p>
              <p className="text-[#00E5FF]">
                <a href="tel:+5532991004523" className="hover:underline">
                  (32) 99100-4523
                </a>
              </p>
            </div>
          </section>
        </motion.div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#00E5FF] text-[#0B0F1A] rounded-full p-4 shadow-lg hover:bg-[#00E5FF]/90 transition-all duration-300 z-50 group"
          >
            <ArrowUp className="w-6 h-6" />
            <div className="absolute inset-0 rounded-full blur-lg bg-[#00E5FF] opacity-0 group-hover:opacity-50 transition-opacity" />
          </motion.button>
        )}
      </div>
    </div>
  );
}