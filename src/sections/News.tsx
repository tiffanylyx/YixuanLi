import { useEffect, useRef, useState } from 'react';
import { FileText, Mic, BookCheck } from 'lucide-react';

const newsItems = [
  {
    date: 'April 2026',
    icon: BookCheck,
    content: `I passed my Ph.D. dissertation proposal! In the following two years, I will work on understanding and supporting how K–12 students develop data literacy and epistemic agency through decision-rich data visualization learning experiences.`,
    highlight: false,
  },
  {
    date: 'Feb 2026',
    icon: FileText,
    content:
      "My first-author paper 'Towards an Empirical Understanding of Epistemic Data Agency for Middle School Students During a Data Storytelling Summer Camp' has been conditionally accepted by ICLS 2026!",
    highlight: true,
  },
  {
    date: 'Jan 2026',
    icon: FileText,
    content:
      "My first-author paper 'ContAQT: Designing an Interactive Data Display to Make Multi-Pollutant Air Quality Data Accessible' has been accepted by CHI 2026!",
    highlight: true,
  },
  {
    date: 'Nov 2025',
    icon: Mic,
    content: 'I presented two first-author papers at IEEE VIS 2025 in Vienna, Austria!',
    highlight: false,
  },
  {
    date: 'July 2025',
    icon: FileText,
    content:
      "My first-author paper 'Teaching Air Quality and Data Visualization Using Tangible Models for Middle Schoolers' has been accepted by EduVis Workshop at IEEE VIS!",
    highlight: true,
  },
  {
    date: 'June 2025',
    icon: FileText,
    content:
      "My first-author paper 'From Perception to Decision: Assessing the Role of Chart Types Affordances in High-Level Decision Tasks' has been accepted by IEEE VIS 2025!",
    highlight: true,
  },
  {
    date: 'June 2025',
    icon: Mic,
    content:
      "I presented a poster 'Skills and Dispositions for PFL: Promoting Data Literacy for Middle School Students in a Summer Camp' at ISLS 2025 in Helsinki, Finland!",
    highlight: false,
  },
  {
    date: 'June 2025',
    icon: Mic,
    content:
      "I presented a paper 'DPV (Domain, Purpose, Visual) Framework: A data visualization design pedagogical method for middle schoolers' at EuroVis 2025 remotely!",
    highlight: false,
  },
  {
    date: 'April 2025',
    icon: BookCheck,
    content: 'I passed my Ph.D. qualification exam!',
    highlight: false,
  },
];

export default function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Show more / less
  const INITIAL_COUNT = 3;
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? newsItems : newsItems.slice(0, INITIAL_COUNT);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="news"
      ref={sectionRef}
      className={`mb-20 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h2 className="text-2xl font-bold text-[#333] mb-6 pb-2 border-b border-[#e0e0e0]">
        News
      </h2>

      <div className="space-y-4">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className={`flex gap-4 p-4 rounded-lg transition-all duration-300 hover:shadow-md ${
              item.highlight
                ? 'bg-[#6b8e6b]/5 border border-[#6b8e6b]/20'
                : 'bg-white border border-[#e0e0e0]'
            }`}
          >
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.highlight ? 'bg-[#6b8e6b] text-white' : 'bg-[#f0f0f0] text-[#666]'
                }`}
              >
                <item.icon size={18} />
              </div>
            </div>

            <div className="flex-1">
              <span className="text-sm font-medium text-[#6b8e6b] block mb-1">
                {item.date}
              </span>
              <p className="text-[#333] leading-relaxed">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      {newsItems.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#666] border border-[#e0e0e0] rounded-md hover:text-[#6b8e6b] hover:border-[#6b8e6b] transition-all"
            aria-expanded={showAll}
            aria-controls="news-list"
          >
            {showAll ? '− Show less' : '+ Show more'}
          </button>
        </div>
      )}
    </section>
  );
}
