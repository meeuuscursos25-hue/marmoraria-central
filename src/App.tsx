import { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, ZoomIn, Zap, Handshake, Gem, ChevronLeft, ChevronRight, 
  Store, MapPin, Clock, Phone, Map as MapIcon, Globe, Camera, Mail, 
  X, Menu, Star, Plus, Minus, Instagram, Users, Ruler, Award
} from 'lucide-react';

// Refined Data
const GALLERY = [
  { src: "https://i.postimg.cc/d1rCR2hR/13.png", classes: "col-span-2 row-span-2 md:col-span-2 md:row-span-2" },
  { src: "https://i.postimg.cc/dVgJMD0J/3.png", classes: "" },
  { src: "https://i.postimg.cc/65GHjQFY/9.png", classes: "" },
  { src: "https://i.postimg.cc/q7cSm76k/8.png", classes: "" },
  { src: "https://i.postimg.cc/c4HWrfgv/5.png", classes: "" },
  { src: "https://www.marmorariauniaocampinas.com.br/assets/project-15-CtP36CBP.webp", classes: "col-span-2 md:col-span-2" },
  { src: "https://i.postimg.cc/5NW71Y7h/16.png", classes: "" },
  { src: "https://i.postimg.cc/QCQqVm4q/17.png", classes: "" },
  { src: "https://i.postimg.cc/dt9BYWTL/18.png", classes: "col-span-2 row-span-2 md:col-span-2 md:row-span-2" },
  { src: "https://i.postimg.cc/cCSRqYxf/20.png", classes: "" },
  { src: "https://i.postimg.cc/SxvcSHQ8/21.png", classes: "" },
  { src: "https://i.postimg.cc/y6v6kvWt/Whats-App-Image-2026-04-05-at-6-59-01-PM-(1).jpg", classes: "" },
  { src: "https://i.postimg.cc/X7RRJCKh/Whats-App-Image-2026-04-05-at-6-59-01-PM.jpg", classes: "" },
];

const SERVICES = [
  { img: "https://i.postimg.cc/d08wBZHK/image.png", title: "Ilhas e Bancadas", desc: "Resistência e sofisticação para o uso contínuo em cozinhas e áreas gourmet." },
  { img: "https://i.postimg.cc/rwZCvFVq/baixados-(4).jpg", title: "Lavabos e Banheiros", desc: "Acabamento de ponta em pedras naturais, mármore e quartz." },
  { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUYwT8irh2xcda6RY_jA6FawPN-TXXpLfY1SAoimXi45AXKdHCII_9oQqcHa6Izs9-Sih9zEC9AMAK6TAEnNTm1J-SoeeMB_YAkoS5sHKrVNaOzIMp5zhrjvMHqEblNe-Ud7IcIdpSMXvDSbXXt25ztrWClnlkokFF9FF7jCB78uUCYS26HxTPjXdPO7nKwgw3vwPxzxHdMBNO248hD5UkBK3JNQX20CJxnCw-rYaTlj477M38X2OtLedXhfkXzYWj3GcLgBgtl7Fu", title: "Escadas Restruturadas", desc: "Durabilidade funcional e estética refinada para o seu projeto." },
  { img: "https://i.postimg.cc/d1hq46W1/Modern-Marble-Kitchen-with-Warm-Ambient-Lighting-Luxury-Minimalist-Kitchen-Design.jpg", title: "Cozinhas Sob Medida", desc: "Projetos em porcelanato e granito que se adaptam à rotina." },
  { img: "https://i.postimg.cc/cHkvJ6zd/0175d16aa42c5a7402c547005e602951.jpg", title: "Banheiros", desc: "Superfícies elegantes, resistentes à umidade e perfeitas para o seu relaxamento." },
];

const MATERIALS = [
  { img: "https://i.postimg.cc/dt9fdgM5/Whats_App_Image_2026_02_13_at_9_57_42_AM.jpg", name: "Branco Paraná", origin: "Alta Resistência" },
  { img: "https://i.postimg.cc/MGzrCcZ1/image.png", name: "Verde Ubatuba", origin: "Nacionais e Importados" },
  { img: "https://i.postimg.cc/C5LmXmB3/Travertino_Romano.png", name: "Travertino Romano", origin: "Desempenho e Versatilidade" },
  { img: "https://i.postimg.cc/zBqjH0jr/Lizard.png", name: "Lizard", origin: "Acabamento Uniforme" },
  { img: "https://i.postimg.cc/vTNLjMd8/Taj_Mahal.png", name: "Taj Mahal", origin: "Sofisticação Translúcida" },
];

const TESTIMONIALS = [
  { name: "Lucca Amaro", date: "um mês atrás", text: "Atendimento dedicado e profissionais super competentes. O acabamento da minha bancada de porcelanato ficou perfeito!", rating: 5 },
  { name: "Bárbara Mattar", date: "2 meses atrás", text: "Fui muito bem orientada na escolha das pedras para minha bancada. A tradição da marmoraria faz a diferença na qualidade. Minha área gourmet ficou impecável.", rating: 5 },
  { name: "Mariana Costa", date: "3 meses atrás", text: "Os materiais são excelentes. A instalação da minha escada em mármore foi feita com extrema atenção e cuidado. Recomendo de olhos fechados.", rating: 5 },
  { name: "Ricardo Silveira", date: "um mês atrás", text: "Empresa séria e comprometida com a satisfação do cliente em Várzea Grande. Entregaram a ilha antes do prazo prometido. O acabamento no granito é perfeito.", rating: 4 },
  { name: "João Pedro Alves", date: "5 meses atrás", text: "Fiz o projeto completo da minha casa com eles: cozinha, banheiros e bancadas. Desde o primeiro orçamento até a montagem final, foram muito prestativos.", rating: 5 },
  { name: "Ana Beatriz Gomes", date: "6 meses atrás", text: "O quartz na minha cozinha ficou maravilhoso. A equipe que instalou manteve tudo limpo e foram muito cuidadosos no transporte e instalação.", rating: 4 },
  { name: "Carlos Eduardo", date: "4 meses atrás", text: "Achei a Marmoraria Central procurando no Google. Foi a melhor decisão. O preço é justo e o trabalho de meia esquadria que fizeram é realmente muito artesanal.", rating: 5 },
  { name: "Fernanda Lima", date: "um ano atrás", text: "Fiz minha ilha da cozinha e a pia do lavabo. As medições foram perfeitas e a pedra encaixou exatamente onde deveria. Trabalho muito impecável deles.", rating: 5 },
  { name: "Sérgio Moraes", date: "2 meses atrás", text: "Atendimento rápido pelo WhatsApp e visita técnica super pontual para tirar as medidas. Eles sabem muito bem o que estão fazendo.", rating: 4 },
  { name: "Juliana Santos", date: "4 meses atrás", text: "Ótima experiência! Recomendo muito para quem busca mármore de alta qualidade e uma equipe responsável para atuar na Baixada Cuiabana.", rating: 5 },
];

const FAQS = [
  { q: "Quais regiões a Marmoraria Central atende?", a: "Nossa marmoraria está em Várzea Grande, mas atendemos com equipe própria projetos em Cuiabá e toda a Baixada Cuiabana." },
  { q: "Quais tipos de materiais vocês trabalham?", a: "Trabalhamos com uma ampla linha de mármores e granitos nacionais e importados, quartz, porcelanatos, ultracompactos, silestone e materiais translúcidos, como cristallo e ônix." },
  { q: "Vocês realizam a instalação das pedras?", a: "Sim, somos especialistas em instalação! Nossa equipe técnica executa a montagem de bancadas, ilhas e escadas no local, garantindo absoluta segurança e alinhamento perfeito." },
  { q: "Como solicitar um orçamento de projeto?", a: "Basta entrar em contato pelo nosso WhatsApp. Com algumas medidas do seu projeto ou ambiente, preparamos uma proposta rápida, transparente e sob medida." },
];

export default function App() {
  const materialsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [formStep, setFormStep] = useState(1);

  // Simple infinite auto-scrollers
  useEffect(() => {
    const scrollers = [
      { ref: materialsRef, step: 250 },
    ];
    const timers = scrollers.map(s => setInterval(() => {
      if (!s.ref.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = s.ref.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) s.ref.current.scrollTo({ left: 0, behavior: 'smooth' });
      else s.ref.current.scrollBy({ left: s.step, behavior: 'smooth' });
    }, 2500));
    return () => timers.forEach(clearInterval);
  }, []);

  const openForm = () => { setIsModalOpen(true); setIsMobileMenuOpen(false); setFormStep(1); };

  return (
    <div className="font-body text-text-main selection:bg-secondary selection:text-white pb-0">
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-outline/50 transition-all">
        <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-screen-2xl mx-auto">
          <a href="#" className="flex items-center text-xl font-headline font-bold text-text-main uppercase tracking-widest gap-2">
            Marmoraria <span className="text-primary">Central</span>
          </a>
          <nav className="hidden md:flex gap-8">
            {['Galeria', 'Coleções', 'Processo', 'Contato'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-widest font-bold text-text-muted hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex gap-4">
            <button onClick={openForm} className="hidden md:block bg-primary text-white px-8 py-2.5 font-label uppercase tracking-widest text-xs font-bold hover:bg-primary-hover transition-colors rounded-full shadow-sm">
              Orçamento Premium
            </button>
            <button className="md:hidden text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-xl flex flex-col items-center py-8 gap-6 z-40 animate-fade-in">
          {['Galeria', 'Coleções', 'Processo', 'Contato'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-bold uppercase tracking-widest text-sm">
              {item}
            </a>
          ))}
          <button onClick={openForm} className="mt-4 bg-primary text-white px-8 py-3 uppercase tracking-widest text-xs font-bold rounded-full">Iniciar Projeto</button>
        </div>
      )}

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[500px] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img alt="Hero Architecture" className="w-full h-full object-cover" loading="lazy"
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVoxkaDtleea-I2eeeoSa4ZsPApbYNplnKmuCCeT1s95oqhcp81wMK4MCfcM3DL-lsGUO4Rr0oAPvqNYfDPktN22vMoZDcqIBquXsDiqK3tQFs8PImPfm761eABLyCfGs7ihXe3-PE_Ap9q9A4jEKUx346xlUJz_Zysj4D02c5R90QUuTIaqhQCeSWU8_yEm-1TeV_0-QhVfhXva0kI3MRB08TWrpPM0qaIwDQuQMDOywB7mGDx9G3JnXtEQ6o-v8qJ9B-wzjIkjfM" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4 md:px-6 max-w-4xl mt-16 md:mt-0">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-sm">
            A marmoraria de Várzea Grande que transforma projetos em <br className="hidden md:block" /> <span className="italic text-primary">acabamentos impecáveis.</span>
          </h1>
          <p className="text-white/95 text-sm sm:text-base md:text-xl max-w-3xl mx-auto mb-8 font-normal leading-relaxed drop-shadow-sm">
            Há 10 anos criando bancadas, ilhas, escadas, áreas gourmet e projetos sob medida em mármore, granito, quartz e porcelanato, unindo beleza, durabilidade e acabamento de alto padrão.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full px-2 sm:px-0">
            <button onClick={openForm} className="w-full sm:w-auto bg-primary text-white px-8 md:px-10 py-4 md:py-5 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-primary-hover transition-colors rounded-full shadow-md">
              Falar com Especialista
            </button>
            <a href="#coleções" className="w-full sm:w-auto border border-white/50 text-white px-8 md:px-10 py-4 md:py-5 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white/10 transition-colors rounded-full text-center">
              Ver Coleções
            </a>
          </div>
        </div>
        <ChevronDown className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white/80 w-10 h-10 animate-bounce" />
      </section>

      {/* GALLERY */}
      <section id="galeria" className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="font-label text-primary uppercase tracking-[0.2rem] text-[10px] md:text-xs font-bold block mb-4">Portfólio</span>
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl text-text-main">Projetos Executados</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[150px] md:auto-rows-[250px]">
          {GALLERY.map((img, i) => (
            <div key={i} onClick={() => setSelectedImage(img.src)} className={`overflow-hidden rounded-lg md:rounded-xl relative group shadow-sm cursor-zoom-in ${img.classes}`}>
              <img alt="Projeto Concluído" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img.src} />
              <div className="absolute inset-0 bg-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 md:py-24 lg:py-32 px-6 lg:px-8 bg-surface-alt">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="font-label text-secondary uppercase tracking-[0.2rem] text-[10px] md:text-xs font-bold block mb-4">Sobre Nós</span>
            <h2 className="font-headline text-3xl md:text-5xl text-text-main mb-6 leading-tight">A força do empreendedorismo familiar</h2>
            <div className="space-y-4 md:space-y-6 text-text-muted text-base md:text-lg font-light leading-relaxed">
              <p>A Marmoraria Central iniciou sua trajetória há 10 anos, movida pela determinação de construir um novo caminho e oferecer um futuro melhor para a família. Com muito trabalho, dedicação diária e investimentos graduais, começamos de forma simples e nos consolidamos na região oferecendo seriedade em cada entrega.</p>
              <p>Com o apoio essencial familiar, de forma especial dos filhos Isabella e Moizes, evoluímos sem perder nossa essência. Hoje, preservamos a mesma base desde a origem: foco integral na satisfação dos clientes de Várzea Grande, Cuiabá e toda a Baixada Cuiabana.</p>
            </div>
            <div className="pt-8 mt-8 border-t border-outline flex gap-12">
              <div>
                <h4 className="font-headline text-4xl text-primary mb-1">10</h4>
                <p className="font-bold uppercase tracking-widest text-[10px] text-text-muted">Anos de Mercado</p>
              </div>
              <div>
                <h4 className="font-headline text-4xl text-primary mb-1">+2k</h4>
                <p className="font-bold uppercase tracking-widest text-[10px] text-text-muted">Espaços Renovados</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
            <img src="https://i.postimg.cc/5y26P4CG/IMG-20260602-WA0065-Joely-Goncalina-(1).jpg" alt="Equipe" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/5"></div>
          </div>
        </div>
      </section>

      {/* AMBIENTES/SERVIÇOS */}
      <section className="py-16 md:py-24 lg:py-32 bg-surface overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="font-label text-primary uppercase tracking-[0.2rem] text-[10px] md:text-xs font-bold block mb-4">Ambientes Atendidos</span>
            <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl text-text-main">Design Estrutural</h2>
          </div>
          <div className="flex md:grid overflow-x-auto md:overflow-visible gap-4 md:gap-6 pb-6 md:pb-8 no-scrollbar md:grid-cols-3 pl-4 md:pl-0 pr-4 md:pr-0 -mx-4 md:mx-0 snap-x">
            {SERVICES.map((s, i) => (
              <div key={i} onClick={() => setSelectedImage(s.img)} className="group relative rounded-xl md:rounded-2xl overflow-hidden min-w-[80vw] sm:min-w-[60vw] md:min-w-0 aspect-square md:aspect-[4/5] cursor-pointer shadow-sm border border-outline snap-center">
                <img alt={s.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={s.img} />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/95 via-secondary-dark/40 to-transparent opacity-80 md:opacity-80 group-hover:opacity-95 transition-opacity"></div>
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  <h3 className="font-headline text-2xl md:text-3xl mb-2">{s.title}</h3>
                  <p className="text-stone-300 text-xs md:text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS / POR QUE A DMG */}
      <section className="py-16 md:py-24 lg:py-32 bg-secondary-dark relative">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-label text-outline uppercase tracking-[0.2rem] text-[10px] md:text-xs font-bold block mb-4">Superioridade Técnica</span>
            <h2 className="font-headline text-3xl md:text-5xl text-white">Nossos Diferenciais</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { i: <Award className="w-6 h-6 md:w-8 md:h-8" />, t: "Serviços Ricos em Acabamentos", d: "Oferecemos serviços que se destacam pela atenção aos detalhes e riqueza de acabamentos, garantindo um resultado final impressionante." },
              { i: <Users className="w-6 h-6 md:w-8 md:h-8" />, t: "Profissionais Capacitados", d: "Nossa equipe é composta por profissionais altamente capacitados, prontos para oferecer soluções inovadoras para atender às suas necessidades." },
              { i: <Ruler className="w-6 h-6 md:w-8 md:h-8" />, t: "Visita Técnica", d: "Nós fazemos a medição técnica no local e entregamos um projeto altamente detalhado, fornecendo todas as informações para a execução." },
              { i: <Star className="w-6 h-6 md:w-8 md:h-8" />, t: "Produtos de Alta Qualidade", d: "Nossos produtos são reconhecidos pela sua excepcional qualidade, proporcionando durabilidade e desempenho superiores em todas as situações." },
            ].map((d, i) => (
              <div key={i} className="group aspect-square bg-[#2a3c4f] border border-white/5 p-6 md:p-8 flex flex-col justify-center items-center text-center rounded-2xl hover:bg-[#32475b] transition-all">
                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  <div className="text-primary">{d.i}</div>
                </div>
                <h3 className="font-headline text-lg md:text-xl text-white mb-3 md:mb-4">{d.t}</h3>
                <p className="text-stone-300 text-xs md:text-sm leading-relaxed">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="processo" className="py-16 md:py-24 lg:py-32 bg-surface-alt">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-label text-secondary uppercase tracking-[0.2rem] text-[10px] md:text-xs font-bold block mb-4">Engenharia do Atendimento</span>
            <h2 className="font-headline text-3xl md:text-4xl text-text-main">Como a Mágica Acontece</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative">
            <div className="hidden md:block absolute top-[2.5rem] w-full h-px border-t border-dashed border-secondary/30"></div>
            {[
              { n: "01", t: "Atendimento", d: "Compreendemos as necessidades do seu ambiente e apresentamos uma proposta transparente." },
              { n: "02", t: "Produção", d: "Apoiamos na definição dos materiais precisos realizando a fabricação com cuidado técnico." },
              { n: "03", t: "Instalação", d: "Equipe especializada garantindo que a montagem no local siga o rigor do projeto arquitetônico." }
            ].map((s, i) => (
              <div key={i} className="relative flex-1 bg-surface border border-outline rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow">
                <span className="inline-flex w-10 h-10 md:w-12 md:h-12 bg-primary text-white items-center justify-center rounded-full font-headline text-lg md:text-xl mb-4 md:mb-6 shadow-sm">{s.n}</span>
                <h4 className="font-headline text-xl md:text-2xl text-primary mb-2 md:mb-3">{s.t}</h4>
                <p className="text-text-muted text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS / COLEÇÕES */}
      <section id="coleções" className="py-16 md:py-24 bg-surface border-t border-outline overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div>
              <span className="font-label text-secondary uppercase tracking-[0.2rem] text-[10px] md:text-xs font-bold block mb-4">Acervo de Pedras</span>
              <h2 className="font-headline text-3xl md:text-4xl text-text-main max-w-xl">Matérias-primas rigorosamente selecionadas</h2>
            </div>
            <p className="text-text-muted text-sm md:text-base max-w-md">Do clássico atemporal ao ultracompacto tecnológico, oferecemos a paleta ideal para conceituar sua obra.</p>
          </div>
          <div ref={materialsRef} className="flex overflow-x-auto gap-4 md:gap-6 pb-6 no-scrollbar pl-4 md:pl-0 pr-4 md:pr-0 -mx-4 md:mx-0">
            {MATERIALS.map((m, i) => (
              <div key={i} className="min-w-[240px] md:min-w-[320px] group cursor-pointer snap-start">
                <div className="overflow-hidden rounded-xl md:rounded-2xl aspect-square mb-4 shadow-sm border border-outline bg-surface-alt">
                  <img alt={m.name} loading="lazy" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" src={m.img} />
                </div>
                <h4 className="font-headline text-lg md:text-xl text-text-main mb-1 group-hover:text-primary transition-colors">{m.name}</h4>
                <p className="text-text-muted text-xs md:text-sm">{m.origin}</p>
              </div>
            ))}
            <div className="min-w-[240px] md:min-w-[320px] group cursor-pointer snap-start flex flex-col">
              <div className="overflow-hidden rounded-xl md:rounded-2xl aspect-square mb-4 shadow-sm border-transparent bg-secondary-dark flex items-center justify-center p-6 text-center transition-colors duration-500 group-hover:bg-text-main">
                <h4 className="font-headline text-2xl md:text-3xl text-white">E muito mais...</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 lg:py-32 bg-surface border-y border-outline overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-10 md:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-headline text-3xl md:text-4xl text-text-main mb-3 md:mb-4">O que dizem sobre nós</h2>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-text-main font-bold text-2xl">
              4.8 <div className="flex gap-0.5 text-[#fbbc04]"> <Star size={20} fill="currentColor" stroke="none" /> <Star size={20} fill="currentColor" stroke="none" /> <Star size={20} fill="currentColor" stroke="none" /> <Star size={20} fill="currentColor" stroke="none" /> <Star size={20} fill="currentColor" stroke="none" /> </div>
            </div>
          </div>
          <div className="flex overflow-hidden relative group w-full -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-4 md:gap-6 pb-6 animate-marquee">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="w-[85vw] md:w-[360px] shrink-0 bg-white border border-[#e8eaed] p-5 md:p-6 rounded-xl shadow-sm text-left flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg shrink-0" style={{backgroundColor: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58', '#673AB7', '#FF7043', '#26A69A', '#5C6BC0', '#AB47BC', '#EC407A'][i % 10]}}>
                      {t.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[15px] md:text-base text-[#202124] truncate">{t.name}</h4>
                      <span className="text-xs text-[#70757a]">{t.date}</span>
                    </div>
                    <div className="w-5 h-5 flex-shrink-0">
                      <svg viewBox="0 0 512 512" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="m504.6 242.94c0-16.71-1.5-32.8-4.32-48.45h-244.28v91.73h139.73c-6.04 29.62-22.39 54.76-48.45 72.19v60.03h78.43c45.91-42.27 72.39-104.53 72.39-175.5h-13.5z" fill="#4285f4"/><path d="m256 504.6c69.83 0 128.43-23.13 171.18-62.63l-78.43-60.03c-23.13 15.53-52.74 24.69-92.75 24.69-71.27 0-131.6-48.21-153.2-113h-81.18v62.94c42.54 84.44 131.35 142.15 234.38 148.03z" fill="#34a853"/><path d="m102.81 293.64c-5.59-16.75-8.79-34.56-8.79-52.92s3.21-36.17 8.79-52.92v-62.94h-81.18c-17.18 34.22-26.97 72.71-26.97 113.13s9.8 78.9 26.97 113.12l78.42-62.93h2.76z" fill="#fbbc05"/><path d="m256 102.13c37.95 0 72.03 13.06 98.81 38.64l74.19-74.18c-45.19-42.22-103.88-68.51-173-68.51-102.99 0-191.81 57.73-234.38 142.19l81.18 62.94c21.6-64.81 81.93-113.04 153.2-113.04z" fill="#ea4335"/></svg>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2 text-[#fbbc04]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={14} fill={starIndex < t.rating ? "currentColor" : "none"} stroke={starIndex < t.rating ? "none" : "currentColor"} className={starIndex < t.rating ? "" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-[#3c4043] text-sm md:text-[14px] leading-relaxed line-clamp-5 flex-1">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-surface-alt">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-headline text-3xl md:text-4xl text-text-main text-center mb-10 md:mb-12">Dúvidas Frequentes</h2>
          <div className="space-y-3 md:space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-outline bg-surface rounded-xl px-5 py-2 md:px-6 md:py-2 transition-colors shadow-sm">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full flex justify-between items-center text-left py-4 min-h-[44px]">
                  <span className={`font-headline text-lg md:text-xl pr-4 ${activeFaq === i ? 'text-secondary' : 'text-text-main'}`}>{faq.q}</span>
                  {activeFaq === i ? <Minus className="text-primary shrink-0 ml-4" /> : <Plus className="text-primary shrink-0 ml-4" />}
                </button>
                {activeFaq === i && <p className="mt-4 text-text-muted text-sm leading-relaxed animate-fade-in">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contato" className="py-16 md:py-24 lg:py-32 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          <div className="bg-surface-alt border border-outline p-8 w-full md:p-14 rounded-3xl flex flex-col justify-center">
            <h2 className="font-headline text-3xl md:text-4xl text-text-main mb-8 md:mb-12">Onde nossa base reside</h2>
            <div className="space-y-6 md:space-y-8">
              <div className="flex gap-4"><MapPin className="text-primary shrink-0 mt-1 w-5 h-5 md:w-6 md:h-6" /><div><p className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-text-muted mb-1">Endereço</p><p className="text-text-main text-base md:text-lg">Avenida Alzira Santana, 900<br/>Centro Sul, Várzea Grande - MT</p></div></div>
              <div className="flex gap-4"><Clock className="text-primary shrink-0 mt-1 w-5 h-5 md:w-6 md:h-6" /><div><p className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-text-muted mb-1">Horário</p><p className="text-text-main text-base md:text-lg">Seg - Sex: 08:00 às 17:48</p></div></div>
              <div className="flex gap-4"><Phone className="text-primary shrink-0 mt-1 w-5 h-5 md:w-6 md:h-6" /><div><p className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-text-muted mb-1">Contato</p><p className="text-text-main text-base md:text-lg">(65) 8127-3512<br/><span className="text-sm md:text-base text-text-muted break-all">contato@marmorariacentral.com.br</span></p></div></div>
            </div>
            <button onClick={openForm} className="mt-10 w-full md:w-auto bg-primary text-white py-4 md:px-8 font-bold uppercase tracking-widest text-xs hover:bg-primary-hover transition-colors rounded-full text-center shadow-md">Falar no WhatsApp</button>
          </div>
          <a href="#" className="relative bg-secondary rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] group border border-outline shadow-sm block">
            <iframe title="Map" className="absolute inset-0 w-full h-full border-0 grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700 pointer-events-none" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709452335!2d-44.06016110273437!3d-19.902661499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690cacacf2c33%3A0x5b35795e3ad23997!2sBelo%20Horizonte%2C%20State%20of%20Minas%20Gerais!5e0!3m2!1sen!2sbr!4v1711060000000!5m2!1sen!2sbr" loading="lazy"></iframe>
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-text-main text-gray-400 py-16">
        <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h2 className="text-2xl font-headline text-white mb-4 italic">Marmoraria <span className="text-primary">Central</span></h2>
            <p className="text-sm font-light mb-6">Tradição, qualidade e soluções em pedras para projetos estruturantes em toda a Baixada Cuiabana há 10 anos.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/marmorariacentral/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors cursor-pointer">
                <Instagram />
              </a>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Menu</h5>
            <ul className="space-y-2 text-sm"><li><a href="#galeria" className="hover:text-primary">Portfólio</a></li><li><a href="#contato" className="hover:text-primary">Localização</a></li></ul>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Legal</h5>
            <ul className="space-y-2 text-sm"><li><a href="#" className="hover:text-primary">Privacidade</a></li><li><a href="#" className="hover:text-primary">Termos</a></li></ul>
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Atendimento</h5>
            <p className="text-sm mb-4">Plantão de Vendas (WhatsApp)</p>
            <p className="text-xl text-white font-headline border-b border-primary pb-2 inline-block">(65) 8127-3512</p>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-surface/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-8 right-8 text-text-main bg-surface-alt rounded-full p-2 hover:text-primary"><X size={28}/></button>
          <img src={selectedImage} alt="Zoom" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={e=>e.stopPropagation()} />
        </div>
      )}

      {/* Contact Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] bg-text-main/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-3xl w-full max-w-xl relative p-8 md:p-12 shadow-2xl overflow-hidden">
            <button className="absolute top-6 right-6 text-text-muted hover:text-primary bg-surface-alt p-2 rounded-full z-10" onClick={() => setIsModalOpen(false)}><X size={20}/></button>
            <div className="text-center mb-8">
              <span className="font-label text-secondary uppercase tracking-[0.2rem] text-[10px] font-bold">Atendimento VIP</span>
              <h3 className="font-headline text-3xl text-text-main mt-2">Inicie seu orçamento</h3>
            </div>
            
            <div className="relative">
              {formStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <p className="text-text-main font-medium mb-1 text-sm md:text-base">Como podemos chamar você?</p>
                  <input type="text" placeholder="Nome / Arquiteto" className="w-full border-b-2 border-outline py-3 bg-transparent outline-none focus:border-primary transition-colors text-text-main placeholder:text-text-muted" />
                  <input type="tel" placeholder="WhatsApp" className="w-full border-b-2 border-outline py-3 bg-transparent outline-none focus:border-primary transition-colors text-text-main placeholder:text-text-muted" />
                  
                  <button onClick={() => setFormStep(2)} className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary-hover transition-colors rounded-full mt-8">Avançar</button>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <p className="text-text-main font-medium mb-4 text-center text-sm md:text-base">O que você está buscando no momento?</p>
                  <div className="space-y-3 bg-surface-alt p-6 rounded-2xl border border-outline">
                    {[
                      "Bancadas para cozinha planejada",
                      "Reforma de banheiro (pia, nicho, etc.)",
                      "Área gourmet - churrasqueira",
                      "Escadas - revestimento em pedra",
                      "Outro projeto personalizado",
                      "Apenas um corte de pedra",
                      "Silo - peças simples"
                    ].map((option, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-surface transition-colors">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input type="radio" name="project_type" value={option} className="peer appearance-none w-5 h-5 border-2 border-outline rounded-full checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer" />
                          <div className="absolute w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                        <span className="text-sm font-medium text-text-muted group-hover:text-text-main peer-checked:text-text-main transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setFormStep(1)} className="w-1/3 bg-surface-alt border border-outline text-text-main py-4 font-bold uppercase tracking-widest text-xs hover:bg-surface transition-colors rounded-full">Voltar</button>
                    <button onClick={() => setFormStep(3)} className="w-2/3 bg-primary text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary-hover transition-colors rounded-full">Avançar</button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <p className="text-text-main font-medium mb-4 text-center text-sm md:text-base">Em qual prazo você pretende executar esse projeto?</p>
                  <div className="space-y-3 bg-surface-alt p-6 rounded-2xl border border-outline">
                    {[
                      "Imediatamente (Próximos 15 dias)",
                      "Em 1 a 2 meses",
                      "Em 3 a 6 meses",
                      "Apenas pesquisando preços"
                    ].map((option, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-surface transition-colors">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input type="radio" name="project_time" value={option} className="peer appearance-none w-5 h-5 border-2 border-outline rounded-full checked:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer" />
                          <div className="absolute w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                        <span className="text-sm font-medium text-text-muted group-hover:text-text-main peer-checked:text-text-main transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setFormStep(2)} className="w-1/3 bg-surface-alt border border-outline text-text-main py-4 font-bold uppercase tracking-widest text-xs hover:bg-surface transition-colors rounded-full">Voltar</button>
                    <button id="btn-submit-whatsapp-lead" onClick={() => { window.open('https://wa.link/hm02ky', '_blank'); setIsModalOpen(false); }} className="w-2/3 bg-[#25D366] text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#20bd5a] transition-colors rounded-full"><span className="pointer-events-none">Continuar Atendimento</span></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
