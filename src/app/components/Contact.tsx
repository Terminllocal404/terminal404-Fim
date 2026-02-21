import { motion } from 'motion/react';
import { Mail, Phone, Send, MessageCircle, Github, Linkedin, Instagram, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(data.error || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique se o servidor está rodando.');
      console.error('Erro:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'E-mail',
      value: 'terminallocal404@gmail.com',
      href: 'mailto:terminallocal404@gmail.com',
    },
    {
      icon: Phone,
      label: 'Telefone',
      value: '(32) 99100-4523',
      href: 'tel:+5532991004523',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '(32) 91547-944',
      href: 'https://wa.me/553291547944',
    },
    {
      icon: () => (
        <svg className="w-6 h-6" viewBox="0 0 127.14 96.36" fill="currentColor">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
      ),
      label: 'Discord',
      value: 'Comunidade Terminal_404',
      href: 'https://discord.gg/tFxpHsPW',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Terminllocal404', label: 'GitHub', color: 'hover:text-[#00E5FF]' },
    { icon: Linkedin, href: 'https://www.linkedin.com/posts/terminal-404_terminal404-linkedin-activity-7419888008151261184-qFpP', label: 'LinkedIn', color: 'hover:text-[#00E5FF]' },
    { icon: Instagram, href: 'https://www.instagram.com/terminal_4.0.4', label: 'Instagram', color: 'hover:text-[#00E5FF]' },
  ];

  return (
    <section id="contato" className="relative py-24 bg-[#0B0F1A]">
      {/* Circuit Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-contact" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="3" fill="#00E5FF" />
              <circle cx="130" cy="130" r="3" fill="#00E5FF" />
              <path d="M 20 20 L 75 20 L 75 75 L 130 75 L 130 130" stroke="#00E5FF" strokeWidth="1.5" fill="none" />
              <circle cx="75" cy="20" r="2" fill="#00E5FF" />
              <circle cx="75" cy="75" r="2" fill="#00E5FF" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-contact)" />
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
            Entre em <span className="text-[#00E5FF]">Contato</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto mb-6" />
          <p className="text-[#B0B3B8] text-lg max-w-2xl mx-auto">
            Entre em contato com a Terminal_404 para parcerias, projetos ou participação em nossa comunidade
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group block bg-[#05070D]/60 backdrop-blur-sm border border-[#00E5FF]/20 rounded-2xl p-6 hover:border-[#00E5FF]/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="relative">
                    <div className="bg-[#0B0F1A] rounded-xl p-4 border border-[#00E5FF]/30 group-hover:border-[#00E5FF] transition-colors">
                      <info.icon className="w-6 h-6 text-[#00E5FF]" />
                    </div>
                    <div className="absolute inset-0 blur-lg bg-[#00E5FF] opacity-0 group-hover:opacity-30 transition-opacity" />
                  </div>
                  <div>
                    <div className="text-sm text-[#B0B3B8] mb-1">{info.label}</div>
                    <div className="text-white font-semibold group-hover:text-[#00E5FF] transition-colors">
                      {info.value}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#05070D]/60 backdrop-blur-sm border border-[#00E5FF]/20 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] rounded-full blur-[80px] opacity-10" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">Horário de Atendimento</h3>
                <p className="text-[#B0B3B8]">Segunda a Sexta: 9h às 18h</p>
                <p className="text-[#B0B3B8] mb-4">Sábado: 9h às 13h</p>
                
                <h3 className="text-xl font-bold text-white mb-3 mt-6">Redes Sociais</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group relative bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-lg p-2.5 hover:border-[#00E5FF]/50 transition-all duration-300"
                    >
                      <social.icon className="w-5 h-5 text-[#00E5FF]" />
                      <div className="absolute inset-0 blur-lg bg-[#00E5FF] opacity-0 group-hover:opacity-30 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-[#05070D]/60 backdrop-blur-sm border border-[#00E5FF]/20 rounded-2xl p-8 relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00E5FF] rounded-full blur-[100px] opacity-10" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all resize-none"
                    placeholder="Descreva seu interesse ou dúvida..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-[#00E5FF] text-[#0B0F1A] rounded-lg px-6 py-4 font-semibold hover:bg-[#00E5FF]/90 transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isSubmitted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : error ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>

                {error && (
                  <div className="text-sm text-red-500 mt-2">
                    {error}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}