import { useState, useEffect } from 'react';
import { Menu, X, Mail, GraduationCap, Linkedin } from 'lucide-react';
import './App.css';

// Sections
import About from './sections/About';
import News from './sections/News';
import Publications from './sections/Publications';
import CV from './sections/CV';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'news', label: 'News' },
  { id: 'publications', label: 'Publications' },
  { id: 'cv', label: 'CV' },
];

const socialLinks = [
  {
    icon: Mail,
    href: 'mailto:yixuanli@gatech.edu',
    label: 'Email',
  },
  {
    icon: GraduationCap,
    href: 'https://scholar.google.com/citations?user=N6EH0qkAAAAJ&hl=en',
    label: 'Google Scholar',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/yixuanli0822/',
    label: 'LinkedIn',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#f9f9f9] transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ================= Desktop Sidebar ================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[400px] flex-col justify-between p-8 bg-[#f9f9f9] border-r border-[#e0e0e0]/50">
        <div>
          {/* Profile */}
          <div className="mb-10 flex flex-col items-center text-center">
            {/* Headshot */}
            <div className="w-44 h-44 rounded-full bg-gradient-to-br from-[#6b8e6b] to-[#4a6b4a] p-1 shadow-lg mb-5">
              <img
                src="/headshot.jpg"
                alt="Yixuan Li headshot"
                className="w-full h-full rounded-full object-cover bg-white
                           hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h1 className="text-2xl font-bold text-[#333] tracking-tight">
              Yixuan Li
            </h1>
            <p className="text-sm text-[#666] mt-1">
              PhD student at Human-Centered Computing
            </p>
            <p className="text-sm text-[#6b8e6b] mt-0.5">
              Georgia Institute of Technology
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-4 justify-center">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-white border border-[#e0e0e0]
                             text-[#666] hover:text-[#6b8e6b]
                             hover:border-[#6b8e6b]
                             transition-all duration-200 shadow-sm"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === id
                    ? 'text-[#6b8e6b] bg-[#6b8e6b]/10'
                    : 'text-[#666] hover:text-[#333] hover:bg-[#e0e0e0]/30'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="text-xs text-[#999]">
          <p>© 2026 Yixuan Li</p>
        </div>
      </aside>

      {/* ================= Mobile Header ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#f9f9f9]/95 backdrop-blur-sm border-b border-[#e0e0e0]/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-[#333]">Yixuan Li</h1>
            <p className="text-xs text-[#666]">
              PhD student at Human-Centered Computing
            </p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#666] hover:text-[#333] transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="px-4 pb-4 border-t border-[#e0e0e0]/50 bg-[#f9f9f9]">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'text-[#6b8e6b]'
                    : 'text-[#666] hover:text-[#333]'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ================= Main Content ================= */}
      <main className="lg:ml-[400px] min-h-screen">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-8 lg:py-16 pt-20 lg:pt-16">
          <About />
          <News />
          <Publications />
          <CV />
        </div>
      </main>
    </div>
  );
}

export default App;
