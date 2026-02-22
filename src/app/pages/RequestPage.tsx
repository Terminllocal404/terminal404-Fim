import { motion } from 'motion/react';
import { Send, FileCode, Database, Layout, CheckCircle, Clock, AlertCircle, Loader2, Code, Zap } from 'lucide-react';
import { useState } from 'react';

export function RequestPage() {
  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Dados do Projeto
    project_type: '',
    project_title: '',
    project_description: '',
    
    // Especificações Técnicas
    tech_stack: [] as string[],
    deadline: '',
    budget: '',
    
    // Detalhes Adicionais
    has_design: false,
    needs_hosting: false,
    additional_info: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validações do frontend antes de enviar
    if (!formData.project_type) {
      setError('Por favor, selecione um tipo de projeto.');
      setIsSubmitting(false);
      return;
    }

    if (formData.project_title.length < 5) {
      setError('O título do projeto deve ter no mínimo 5 caracteres.');
      setIsSubmitting(false);
      return;
    }

    if (formData.project_description.length < 20) {
      setError('A descrição do projeto deve ter no mínimo 20 caracteres.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/project-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          project_type: '',
          project_title: '',
          project_description: '',
          tech_stack: [],
          deadline: '',
          budget: '',
          has_design: false,
          needs_hosting: false,
          additional_info: '',
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 6000);
      } else {
        // Melhor tratamento de erros de validação
        if (response.status === 422) {
          const errorDetails = data.detail || [];
          if (Array.isArray(errorDetails) && errorDetails.length > 0) {
            const errorMessages = errorDetails.map((err: any) => {
              const field = err.loc?.[1] || 'campo';
              const msg = err.msg || 'inválido';
              return `${field}: ${msg}`;
            }).join('; ');
            setError(`Erro de validação: ${errorMessages}`);
          } else {
            setError('Erro de validação. Verifique os campos obrigatórios e tente novamente.');
          }
        } else {
          setError(data.error || 'Erro ao enviar solicitação. Tente novamente.');
        }
      }
    } catch (err) {
      setError('Erro de conexão. Verifique se o servidor backend está rodando na porta 8000.');
      console.error('Erro:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { value: 'Website Institucional', label: 'Website Institucional', icon: Layout },
    { value: 'Sistema Web', label: 'Sistema Web', icon: Code },
    { value: 'API / Backend', label: 'API / Backend', icon: Database },
    { value: 'App Full Stack', label: 'App Full Stack', icon: FileCode },
    { value: 'E-commerce', label: 'E-commerce', icon: Layout },
    { value: 'Dashboard', label: 'Dashboard', icon: FileCode },
  ];

  const techOptions = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'FastAPI',
    'PostgreSQL', 'MongoDB', 'MySQL', 'Docker', 'AWS', 'Tailwind CSS'
  ];

  const budgetRanges = [
    'R$ 5.000 - R$ 10.000',
    'R$ 10.000 - R$ 20.000',
    'R$ 20.000 - R$ 50.000',
    'Acima de R$ 50.000',
    'A discutir',
  ];

  const toggleTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter(t => t !== tech)
        : [...prev.tech_stack, tech]
    }));
  };

  return (
    <div className="pt-20 min-h-screen bg-[#05070D]">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #00E5FF 1px, transparent 1px),
            linear-gradient(to bottom, #00E5FF 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[150px] opacity-5" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#0B0F1A] border border-[#00E5FF]/30 rounded-full px-4 py-2 mb-6">
            <FileCode className="w-5 h-5 text-[#00E5FF]" />
            <span className="text-[#00E5FF] text-sm font-medium">Solicitar Projeto</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Solicite um <span className="text-[#00E5FF]">Projeto</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mx-auto mb-6" />
          <p className="text-[#B0B3B8] text-lg max-w-2xl mx-auto">
            Preencha o formulário abaixo com os detalhes do seu projeto. Nossa equipe técnica analisará sua solicitação e entrará em contato em até 24 horas úteis.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: Send, label: 'Envie sua solicitação', description: 'Preencha o formulário com detalhes do projeto' },
            { icon: Clock, label: 'Análise técnica', description: 'Nossa equipe analisa viabilidade e escopo' },
            { icon: CheckCircle, label: 'Proposta comercial', description: 'Receba orçamento e cronograma detalhado' },
          ].map((step, index) => (
            <div key={index} className="bg-[#0B0F1A]/50 border border-[#00E5FF]/20 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#05070D] border border-[#00E5FF]/30 rounded-lg mb-4">
                <step.icon className="w-6 h-6 text-[#00E5FF]" />
              </div>
              <h3 className="text-white font-semibold mb-2">{step.label}</h3>
              <p className="text-[#B0B3B8] text-sm">{step.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-500/10 to-[#00E5FF]/10 border border-green-500/30 rounded-2xl p-8 mb-8 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Solicitação Enviada com Sucesso!</h3>
            <p className="text-[#B0B3B8]">
              Recebemos sua solicitação. Nossa equipe entrará em contato em até 24 horas úteis.
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/30 rounded-xl p-4 mb-8 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-red-400 text-sm">{error}</div>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-[#0B0F1A]/60 backdrop-blur-sm border border-[#00E5FF]/20 rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF] rounded-full blur-[120px] opacity-5" />
          
          <div className="relative z-10 space-y-8">
            {/* Dados Pessoais */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00E5FF]/20 border border-[#00E5FF]/30 rounded-lg flex items-center justify-center">
                  <span className="text-[#00E5FF] font-bold">1</span>
                </div>
                Dados Pessoais
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white font-semibold mb-2">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="(32) 99100-4523"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-white font-semibold mb-2">
                    Empresa (Opcional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="Nome da sua empresa"
                  />
                </div>
              </div>
            </div>

            {/* Informações do Projeto */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00E5FF]/20 border border-[#00E5FF]/30 rounded-lg flex items-center justify-center">
                  <span className="text-[#00E5FF] font-bold">2</span>
                </div>
                Informações do Projeto
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Tipo de Projeto *
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {projectTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, project_type: type.value })}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.project_type === type.value
                            ? 'border-[#00E5FF] bg-[#00E5FF]/10'
                            : 'border-[#00E5FF]/20 bg-[#05070D] hover:border-[#00E5FF]/50'
                        }`}
                      >
                        <type.icon className="w-6 h-6 text-[#00E5FF] mb-2" />
                        <div className="text-white font-semibold text-sm">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="project_title" className="block text-white font-semibold mb-2">
                    Título do Projeto *
                  </label>
                  <input
                    type="text"
                    id="project_title"
                    required
                    value={formData.project_title}
                    onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="Ex: Sistema de Gestão de Clientes"
                  />
                </div>

                <div>
                  <label htmlFor="project_description" className="block text-white font-semibold mb-2">
                    Descrição do Projeto *
                  </label>
                  <textarea
                    id="project_description"
                    required
                    rows={6}
                    value={formData.project_description}
                    onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all resize-none"
                    placeholder="Descreva os objetivos, funcionalidades principais e público-alvo do projeto..."
                  />
                </div>
              </div>
            </div>

            {/* Especificações Técnicas */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00E5FF]/20 border border-[#00E5FF]/30 rounded-lg flex items-center justify-center">
                  <span className="text-[#00E5FF] font-bold">3</span>
                </div>
                Especificações Técnicas
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-3">
                    Tecnologias (Opcional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {techOptions.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.tech_stack.includes(tech)
                            ? 'bg-[#00E5FF] text-[#0B0F1A]'
                            : 'bg-[#05070D] text-[#B0B3B8] border border-[#00E5FF]/30 hover:border-[#00E5FF]/50'
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="deadline" className="block text-white font-semibold mb-2">
                      Prazo Desejado
                    </label>
                    <input
                      type="text"
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                      placeholder="Ex: 2 meses, 60 dias"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-white font-semibold mb-2">
                      Orçamento Estimado
                    </label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all"
                    >
                      <option value="">Selecione...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Requisitos Adicionais */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00E5FF]/20 border border-[#00E5FF]/30 rounded-lg flex items-center justify-center">
                  <span className="text-[#00E5FF] font-bold">4</span>
                </div>
                Requisitos Adicionais
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.has_design}
                      onChange={(e) => setFormData({ ...formData, has_design: e.target.checked })}
                      className="w-5 h-5 rounded border-[#00E5FF]/30 bg-[#05070D] text-[#00E5FF] focus:ring-[#00E5FF]/20 focus:ring-2"
                    />
                    <span className="text-white">Já possuo design/protótipo</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needs_hosting}
                      onChange={(e) => setFormData({ ...formData, needs_hosting: e.target.checked })}
                      className="w-5 h-5 rounded border-[#00E5FF]/30 bg-[#05070D] text-[#00E5FF] focus:ring-[#00E5FF]/20 focus:ring-2"
                    />
                    <span className="text-white">Preciso de hospedagem</span>
                  </label>
                </div>

                <div>
                  <label htmlFor="additional_info" className="block text-white font-semibold mb-2">
                    Informações Adicionais (Opcional)
                  </label>
                  <textarea
                    id="additional_info"
                    rows={4}
                    value={formData.additional_info}
                    onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })}
                    className="w-full bg-[#05070D] border border-[#00E5FF]/30 rounded-lg px-4 py-3 text-white placeholder-[#B0B3B8] focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/20 transition-all resize-none"
                    placeholder="Alguma observação importante sobre o projeto..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-[#00E5FF]/20">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full group bg-[#00E5FF] text-[#0B0F1A] rounded-lg px-8 py-4 font-semibold hover:bg-[#00E5FF]/90 transition-all duration-300 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.5)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Enviando Solicitação...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Solicitação Enviada com Sucesso!
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6" />
                      Enviar Solicitação
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}