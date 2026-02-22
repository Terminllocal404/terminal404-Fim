import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Terminllocal404', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/posts/terminal-404_terminal404-linkedin-activity-7419888008151261184-qFpP', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/terminal_4.0.4', label: 'Instagram' },
    { 
      icon: () => (
        <svg className="w-5 h-5" viewBox="0 0 127.14 96.36" fill="currentColor">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
      ), 
      href: 'https://discord.gg/tFxpHsPW', 
      label: 'Discord' 
    },
  ];

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Serviços', path: '/servicos' },
    { label: 'Comunidade', path: '/comunidade' },
    { label: 'Equipe', path: '/equipe' },
    { label: 'Contato', path: '/contato' },
    { label: 'Solicitação', path: '/solicitacao' },
  ];

  return (
    <footer className="relative bg-[#05070D] border-t border-[#00E5FF]/20">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00E5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <img 
                  src="https://available-aquamarine-lziqbpkvhg.edgeone.app/Untitled_design_1.png" 
                  alt="Terminal_404" 
                  className="w-10 h-10 object-contain relative z-10"
                />
                <div className="absolute inset-0 blur-lg bg-[#00E5FF] opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Terminal<span className="text-[#00E5FF]">_404</span>
              </span>
            </div>
            <p className="text-[#B0B3B8] text-sm leading-relaxed">
              Empresa e comunidade técnica focada em desenvolvimento, colaboração e soluções digitais modernas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#B0B3B8] hover:text-[#00E5FF] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Conecte-se</h3>
            <div className="space-y-3 mb-6">
              <a 
                href="mailto:terminallocal404@gmail.com" 
                className="block text-[#B0B3B8] hover:text-[#00E5FF] transition-colors text-sm"
              >
                terminallocal404@gmail.com
              </a>
              
              <a 
                href="https://wa.me/553291547944" 
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#B0B3B8] hover:text-[#00E5FF] transition-colors text-sm"
              >
                WhatsApp: (32) 91547-944
              </a>
            </div>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group relative bg-[#0B0F1A] border border-[#00E5FF]/20 rounded-lg p-2 hover:border-[#00E5FF]/50 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-[#00E5FF]" />
                  <div className="absolute inset-0 blur-lg bg-[#00E5FF] opacity-0 group-hover:opacity-30 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#00E5FF]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#B0B3B8] text-sm text-center md:text-left">
              © {currentYear} Terminal_404 — Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/politica-de-privacidade" className="text-[#B0B3B8] hover:text-[#00E5FF] transition-colors text-sm">
                Privacidade
              </Link>
              <Link to="/termos-de-uso" className="text-[#B0B3B8] hover:text-[#00E5FF] transition-colors text-sm">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-50" />
    </footer>
  );
}