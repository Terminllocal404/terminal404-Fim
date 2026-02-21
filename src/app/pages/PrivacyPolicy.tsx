import { motion } from 'motion/react';
import { Shield, Database, Lock, UserCheck, Mail, Phone, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PrivacyPolicy() {
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
            <Shield className="w-10 h-10 text-[#00E5FF]" />
            <div className="absolute inset-0 blur-xl bg-[#00E5FF] opacity-20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de <span className="text-[#00E5FF]">Privacidade</span>
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
              <p className="text-[#B0B3B8] text-base leading-relaxed">
                A <span className="text-white font-semibold">Terminal_404</span> respeita a privacidade dos usuários e está comprometida com a proteção dos dados pessoais, conforme a <span className="text-[#00E5FF]">Lei Geral de Proteção de Dados</span> (Lei nº 13.709/2018 – LGPD).
              </p>
            </div>
          </section>

          {/* Data Collection */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <Database className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Coleta de Dados</h2>
            </div>
            <p className="text-[#B0B3B8] text-base leading-relaxed mb-4">
              Podemos coletar as seguintes informações:
            </p>
            <ul className="space-y-3">
              {[
                'Nome',
                'Endereço de e-mail',
                'Telefone',
                'Informações fornecidas voluntariamente em formulários de contato',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#00E5FF] flex-shrink-0" />
                  <span className="text-[#B0B3B8] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Data Usage */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <UserCheck className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Uso dos Dados</h2>
            </div>
            <p className="text-[#B0B3B8] text-base leading-relaxed mb-4">
              Os dados coletados são utilizados para:
            </p>
            <ul className="space-y-3">
              {[
                'Comunicação com usuários',
                'Atendimento de solicitações',
                'Melhorar nossos serviços e conteúdos',
                'Contato para parcerias e projetos',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#00E5FF] flex-shrink-0" />
                  <span className="text-[#B0B3B8] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <Lock className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Compartilhamento</h2>
            </div>
            <p className="text-[#B0B3B8] text-base leading-relaxed">
              A Terminal_404 <span className="text-white font-semibold">não compartilha dados pessoais com terceiros</span>, exceto quando exigido por lei.
            </p>
          </section>

          {/* Security */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <Shield className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Armazenamento e Segurança</h2>
            </div>
            <p className="text-[#B0B3B8] text-base leading-relaxed">
              Adotamos <span className="text-[#00E5FF]">medidas técnicas e organizacionais</span> para proteger os dados contra acesso não autorizado, vazamentos ou usos indevidos.
            </p>
          </section>

          {/* User Rights */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#05070D] rounded-lg p-3 border border-[#00E5FF]/30">
                <UserCheck className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Direitos do Usuário</h2>
            </div>
            <p className="text-[#B0B3B8] text-base leading-relaxed mb-4">
              O usuário pode, a qualquer momento:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Solicitar acesso aos seus dados',
                'Solicitar correção ou exclusão',
                'Revogar consentimento',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#00E5FF] flex-shrink-0" />
                  <span className="text-[#B0B3B8] text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[#B0B3B8] text-base leading-relaxed">
              Solicitações podem ser feitas através do e-mail:{' '}
              <a href="mailto:terminallocal404@gmail.com" className="text-[#00E5FF] hover:underline font-semibold">
                terminallocal404@gmail.com
              </a>
            </p>
          </section>

          {/* Official Contact */}
          <section className="bg-gradient-to-br from-[#00E5FF]/10 to-transparent border border-[#00E5FF]/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Contato Oficial</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 bg-[#05070D]/60 rounded-xl p-4 border border-[#00E5FF]/20">
                <div className="bg-[#0B0F1A] rounded-lg p-3 border border-[#00E5FF]/30">
                  <Mail className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <p className="text-sm text-[#B0B3B8] mb-1">E-mail</p>
                  <a href="mailto:terminallocal404@gmail.com" className="text-white font-semibold hover:text-[#00E5FF] transition-colors">
                    terminallocal404@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#05070D]/60 rounded-xl p-4 border border-[#00E5FF]/20">
                <div className="bg-[#0B0F1A] rounded-lg p-3 border border-[#00E5FF]/30">
                  <Phone className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div>
                  <p className="text-sm text-[#B0B3B8] mb-1">Telefone</p>
                  <a href="tel:+5532991004523" className="text-white font-semibold hover:text-[#00E5FF] transition-colors">
                    (32) 99100-4523
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Final Provisions */}
          <section className="bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">Disposições Finais</h3>
            <p className="text-[#B0B3B8] text-base leading-relaxed">
              Esta política pode ser atualizada periodicamente. Recomenda-se que o usuário revise este documento regularmente.
            </p>
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