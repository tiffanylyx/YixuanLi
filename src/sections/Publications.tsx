import { useEffect, useRef, useState } from 'react';
import { FileText, ExternalLink, Award, Video, Package } from 'lucide-react';
import { publications } from '../data/publications';

const base = import.meta.env.BASE_URL;

const publicationUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `${base}${url.replace(/^\/+/, '')}`;

export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      id="publications"
      ref={sectionRef}
      className={`mb-20 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h2 className="text-2xl font-bold text-[#333] mb-6 pb-2 border-b border-[#e0e0e0]">
        Publications
      </h2>

      <div className="space-y-5">
        {publications.map((pub) => (
          <div
            key={pub.order}
            className="bg-white border border-[#e0e0e0] rounded-lg p-5 hover:shadow-md hover:border-[#6b8e6b]/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#333] mb-2 leading-snug">
                  {pub.title}
                </h3>

                <p className="text-sm text-[#666] mb-2">
                  {pub.authors.map((author, i) => (
                    <span key={i}>
                      {author === 'Yixuan Li' ? (
                        <span className="font-semibold text-[#333]">{author}</span>
                      ) : (
                        author
                      )}
                      {i < pub.authors.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-[#6b8e6b]">
                    {pub.venue}
                  </span>
                  <span className="text-sm text-[#999]">·</span>
                  <span className="text-sm text-[#666]">{pub.year}</span>
                  <span className="text-sm text-[#999]">·</span>
                  <span className="text-xs px-2 py-0.5 bg-[#f0f0f0] text-[#666] rounded">
                    {pub.type}
                  </span>

                  {pub.award && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-medium">
                      <Award size={12} />
                      {pub.award}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4">
                  {pub.links.pdf && (
                    <a
                      href={publicationUrl(pub.links.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                    >
                      <FileText size={14} />
                      PDF
                    </a>
                  )}

                  {pub.links.external && (
                    <a
                      href={publicationUrl(pub.links.external)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                    >
                      <ExternalLink size={14} />
                      LINK
                    </a>
                  )}

                  {pub.links.video && (
                    <a
                      href={publicationUrl(pub.links.video)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                    >
                      <Video size={14} />
                      Presentation
                    </a>
                  )}

                  {pub.links.materials && (
                    <a
                      href={publicationUrl(pub.links.materials)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
                    >
                      <Package size={14} />
                      Materials
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
