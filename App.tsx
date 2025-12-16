
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Instagram, MessageCircle, Menu, X, Plus, Minus, Send, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

// Reusable Components
const Button = ({ children, variant = 'primary', className = '', onClick, type = "button", disabled = false }: { children?: React.ReactNode, variant?: 'primary' | 'outline', className?: string, onClick?: () => void, type?: "button" | "submit", disabled?: boolean }) => {
  const baseStyles = "px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 font-medium disabled:opacity-50";
  const variants = {
    primary: "bg-black text-white hover:bg-rose-900",
    outline: "border border-black text-black hover:bg-black hover:text-white"
  };
  
  const variantClass = variants[variant as keyof typeof variants] || variants.primary;
  
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantClass} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4 italic">{title}</h2>
    {subtitle && <p className="text-gray-600 max-w-xl text-lg leading-relaxed mx-auto">{subtitle}</p>}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="font-serif text-xl md:text-2xl tracking-tighter cursor-pointer">KAROLINE CARVALHO</a>
        
        <div className="hidden md:flex gap-10 items-center text-xs tracking-[0.2em] uppercase font-medium">
          <button onClick={() => scrollToSection('experiencia')} className="hover:text-rose-500 transition-colors">Experiência</button>
          <button onClick={() => scrollToSection('portfolio')} className="hover:text-rose-500 transition-colors">Portfólio</button>
          <button onClick={() => scrollToSection('servicos')} className="hover:text-rose-500 transition-colors">Serviços</button>
          <button onClick={() => scrollToSection('contato')} className="hover:text-rose-500 transition-colors">Contato</button>
          <Button variant="primary" className="!px-6 !py-2.5" onClick={() => scrollToSection('contato')}>Agendar</Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 flex flex-col items-center justify-center gap-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={() => scrollToSection('experiencia')} className="font-serif text-3xl">Experiência</button>
        <button onClick={() => scrollToSection('portfolio')} className="font-serif text-3xl">Portfólio</button>
        <button onClick={() => scrollToSection('servicos')} className="font-serif text-3xl">Serviços</button>
        <button onClick={() => scrollToSection('contato')} className="font-serif text-3xl">Contato</button>
        <Button onClick={() => scrollToSection('contato')}>Agendar Agora</Button>
        <button className="absolute top-6 right-6" onClick={() => setIsOpen(false)}><X size={32} /></button>
      </div>
    </nav>
  );
};

const Hero = () => (
  <header id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-rose-50">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1 z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-rose-400 font-bold mb-4 block">Prepare-se para brilhar</span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1]">
          Unhas que refletem seu <span className="italic">estilo</span>.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-md leading-relaxed">
          Unhas bem feitas não são apenas estéticas. Elas elevam sua autoestima e fazem você se sentir cuidada — todos os dias.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>Ver Serviços e Preços</Button>
          <div className="flex items-center gap-3 text-sm tracking-widest uppercase font-medium group cursor-pointer ml-0 sm:ml-4" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
            Conheça meu trabalho <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </div>
      <div className="order-1 md:order-2 relative">
        <div className="aspect-[4/5] bg-rose-100 relative overflow-hidden shadow-2xl rounded-tl-[80px] rounded-br-[80px] rounded-tr-[20px] rounded-bl-[20px]">
          <img 
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop" 
            alt="Editorial Nail Art" 
            className="w-full h-full object-cover opacity-100" 
          />
          <div className="absolute inset-0 bg-rose-200/5"></div>
          <div className="absolute bottom-10 -left-10 w-40 h-40 border border-white/30 backdrop-blur-sm p-4 hidden lg:block rounded-full flex items-center justify-center text-center">
            <p className="text-[10px] uppercase tracking-widest text-white leading-relaxed px-2">
              Técnica e sensibilidade editorial.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
      <ChevronDown size={32} strokeWidth={1} onClick={() => document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth' })} className="cursor-pointer" />
    </div>
  </header>
);

const Portfolio = () => {
  const items = [
    { id: 1, title: "Nude Minimalista", category: "Manicure de Luxo", image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "Pérolas Delicadas", category: "Nail Art", image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Rosa Editorial", category: "Design Personalizado", image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Soft French", category: "Manicure de Luxo", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Textura & Ouro", category: "Nail Art", image: "https://images.unsplash.com/photo-1600007183804-1ec0e729a677?q=80&w=800&auto=format&fit=crop" },
    { id: 6, title: "Minimal Gloss", category: "Cuidado Completo", image: "https://images.unsplash.com/photo-1504198458649-012803d324f4?q=80&w=800&auto=format&fit=crop" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsToShow(3);
      else if (window.innerWidth >= 768) setItemsToShow(2);
      else setItemsToShow(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= items.length - itemsToShow + 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? items.length - itemsToShow : prev - 1));
  };

  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading 
            title="Galeria Editorial" 
            subtitle="Um olhar sensível sobre a beleza das mãos. Design que transborda sofisticação e leveza."
          />
          <div className="flex gap-4 mb-12">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 border border-rose-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} strokeWidth={1} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 border border-rose-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
              aria-label="Próximo"
            >
              <ChevronRight size={24} strokeWidth={1} />
            </button>
          </div>
        </div>

        <div className="relative mt-8">
          <div 
            className="flex transition-transform duration-700 ease-in-out gap-8"
            style={{ transform: `translateX(calc(-${currentIndex * (100 / itemsToShow)}%))` }}
          >
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 group relative overflow-hidden aspect-[4/5] bg-rose-50 cursor-pointer rounded-[40px]"
                style={{ width: `calc(${100 / itemsToShow}% - ${(8 * (itemsToShow - 1)) / itemsToShow}px)` }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-rose-200 block mb-2">{item.category}</span>
                  <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 flex justify-center gap-3">
          {Array.from({ length: Math.max(0, items.length - itemsToShow + 1) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 transition-all duration-500 ${currentIndex === i ? 'w-12 bg-black' : 'w-4 bg-rose-100 hover:bg-rose-200'}`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => (
  <section id="experiencia" className="py-24 md:py-32 bg-rose-50/50">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square bg-rose-50 overflow-hidden rounded-[100px] shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1000&auto=format&fit=crop" 
              alt="Close of hands" 
              className="w-full h-full object-cover opacity-100 contrast-100" 
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-rose-100 z-[-1] rounded-[60px]"></div>
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading 
            title="Sua experiência vai além do esmalte." 
            subtitle="Suas mãos falam muito sobre você. E quando elas estão bem cuidadas, você sente — e todo o mundo percebe."
          />
          <div className="space-y-8 italic font-serif text-2xl md:text-3xl text-gray-800 border-l-2 border-rose-200 pl-8">
            <p>“Quero algo bonito, mas delicado.”</p>
            <p>“Não gosto de unhas exageradas.”</p>
            <p>“Quero um acabamento impecável.”</p>
          </div>
          <p className="mt-12 text-gray-600 leading-relaxed max-w-lg">
            Aqui, o cuidado é sobre tempo, atenção e estética. Um momento de calma no seu dia para realçar o que você já tem de melhor.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  if (formStatus === 'success') {
    return (
      <section className="py-24 bg-white" id="contato">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="flex justify-center mb-8">
            <CheckCircle2 size={80} className="text-rose-400 animate-in zoom-in duration-500" strokeWidth={1} />
          </div>
          <h2 className="font-serif text-4xl mb-4 italic">Obrigada pelo contato!</h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Sua solicitação foi enviada com sucesso. Em breve entrarei em contato para conversarmos sobre sua beleza.
          </p>
          <Button onClick={() => setFormStatus('idle')} variant="outline" className="rounded-full">Enviar nova mensagem</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white" id="contato">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeading 
              title="Solicite um Atendimento" 
              subtitle="Tire suas dúvidas ou solicite um orçamento personalizado. Será um prazer cuidar de você."
            />
            <div className="space-y-6 text-gray-600">
              <p className="text-lg italic font-serif">"O luxo está no detalhe e na atenção dedicada a cada cliente."</p>
              <div className="flex flex-col gap-2 text-sm uppercase tracking-widest font-medium">
                <span className="text-rose-400">Atendimento com hora marcada</span>
                <span>Segunda a Sábado — 09h às 19h</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full border-b border-rose-100 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                  placeholder="Seu nome"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full border-b border-rose-100 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                    placeholder="exemplo@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">Telefone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    className="w-full border-b border-rose-100 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-lg"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-gray-400">Mensagem</label>
                <textarea 
                  id="message" 
                  required
                  rows={4}
                  className="w-full border border-rose-100 p-4 rounded-3xl focus:outline-none focus:border-black transition-colors bg-rose-50/30 text-lg resize-none"
                  placeholder="Como posso ajudar você hoje?"
                ></textarea>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center gap-4 rounded-full"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Solicitação'} 
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Manicure de Luxo",
      description: "Acabamento impecável, cutículas bem cuidadas e um resultado que transmite elegância sem exageros.",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Design Personalizado",
      description: "Cores suaves, detalhes delicados e design que valorizam suas mãos com leveza e sofisticação.",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Cuidado das Mãos",
      description: "Mais do que unhas bonitas — mãos bem tratadas, hidratadas e profundamente femininas.",
      image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-rose-50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Soft Beauty com um toque de luxo." 
          subtitle="Meu trabalho une técnica avançada e sensibilidade estética. Nada é feito no automático."
          centered
        />
        <div className="grid md:grid-cols-3 gap-12 mt-16">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-white relative rounded-[60px] shadow-sm">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-rose-200/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="font-serif text-2xl mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
              <div className="w-10 h-[1px] bg-black group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 md:py-32 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4 lg:col-span-5 relative">
          <div className="font-serif text-8xl md:text-[12rem] text-rose-100 absolute -top-10 -left-10 pointer-events-none select-none">“</div>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8 italic relative z-10">O que elas sentem depois.</h2>
          <p className="text-gray-500 uppercase tracking-[0.2em] text-xs">Depoimentos reais de quem escolhe exclusividade</p>
        </div>
        <div className="md:col-span-8 lg:col-span-7 grid sm:grid-cols-2 gap-8">
          {[
            "Minhas unhas são delicadas e perfeitas. É exatamente o que eu buscava.",
            "É diferente de tudo que eu já fiz em outros lugares. O atendimento é único.",
            "Saí me sentindo mais bonita e confiante com minhas mãos impecáveis.",
            "O olhar artístico da Karol faz toda a diferença no resultado final."
          ].map((quote, i) => (
            <div key={i} className="bg-rose-50 p-10 rounded-[40px] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
              <p className="text-lg italic text-gray-800 leading-relaxed mb-6">“{quote}”</p>
              <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">— Cliente Satisfeita</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-rose-100 py-6 last:border-0">
      <button 
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="font-serif text-xl md:text-2xl">{question}</h4>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 leading-relaxed max-w-2xl">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => (
  <section className="py-24 bg-rose-50/30" id="faq">
    <div className="container mx-auto px-6 max-w-4xl">
      <SectionHeading title="Perguntas Frequentes" centered />
      <div className="mt-12">
        <FAQItem 
          question="As unhas ficam naturais?" 
          answer="Sim. A proposta é delicadeza, leveza e elegância. Utilizamos técnicas que preservam a saúde da unha e garantem um aspecto natural e sofisticado." 
        />
        <FAQItem 
          question="O atendimento é personalizado?" 
          answer="Com certeza. Cada cliente é única e o resultado acompanha seu estilo pessoal, formato de mãos e a ocasião desejada." 
        />
        <FAQItem 
          question="Quais cores você mais trabalha?" 
          answer="Minha assinatura são os tons suaves, rosados, nudes e composições femininas e atuais, perfeitas para quem busca o luxo discreto." 
        />
      </div>
    </div>
  </section>
);

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-rose-100 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-24 text-center md:text-left">
          <div>
            <h2 className="font-serif text-4xl md:text-6xl mb-6">Se cuidar também é um ato de amor próprio.</h2>
            <p className="text-gray-600 max-w-xl text-lg">Escolha um momento só seu. Escolha unhas que combinem com quem você é.</p>
          </div>
          <Button variant="primary" className="whitespace-nowrap flex items-center gap-4 rounded-full" onClick={() => scrollToSection('contato')}>
            Agendar pelo WhatsApp <MessageCircle size={18} />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-rose-100 py-16">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-serif text-2xl mb-6 cursor-pointer" onClick={() => scrollToSection('hero')}>Karoline Carvalho</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Nails Designer & Editorial Artist</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Navegação</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><button onClick={() => scrollToSection('experiencia')} className="hover:text-black">Experiência</button></li>
              <li><button onClick={() => scrollToSection('portfolio')} className="hover:text-black">Portfólio</button></li>
              <li><button onClick={() => scrollToSection('servicos')} className="hover:text-black">Serviços</button></li>
              <li><button onClick={() => scrollToSection('faq')} className="hover:text-black">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Redes Sociais</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center gap-2"><Instagram size={16} /> <a href="#" className="hover:text-black">Instagram</a></li>
              <li className="flex items-center gap-2"><MessageCircle size={16} /> <a href="#" className="hover:text-black">WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Localização</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Studio Karoline Carvalho<br />
              Bairro Elegante, 123<br />
              São Paulo, SP
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-gray-400">
          <p>© 2024 Karoline Carvalho. Todos os direitos reservados.</p>
          <p>Design Editorial by Nails & Beauty</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="antialiased selection:bg-rose-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Experience />
      <Portfolio />
      <Services />
      <Testimonials />
      <ContactForm />
      <FAQ />
      <Footer />
    </div>
  );
}

