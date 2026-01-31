import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'DataChat',
    description: '一个基于大语言模型的对话式数据分析平台，支持自然语言查询、自动可视化生成和交互式数据探索。',
    tags: ['React', 'Python', 'LLM', 'D3.js'],
    image: null,
    links: { demo: '#', github: '#' },
  },
  {
    title: 'VizInsight',
    description: '智能可视化推荐系统，能够根据数据特征和用户意图自动推荐最合适的可视化方式。',
    tags: ['Vue.js', 'TypeScript', 'Machine Learning'],
    image: null,
    links: { demo: '#', github: '#' },
  },
  {
    title: 'NL2SQL',
    description: '自然语言到SQL转换工具，帮助非技术用户通过自然语言查询数据库。',
    tags: ['Python', 'PyTorch', 'Transformers'],
    image: null,
    links: { demo: '#', github: '#' },
  },
  {
    title: 'TextVis',
    description: '文本数据可视化分析工具，支持主题建模、情感分析和交互式文本探索。',
    tags: ['D3.js', 'NLP', 'Flask'],
    image: null,
    links: { demo: '#', github: '#' },
  },
];

export default function Projects() {
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
      id="projects"
      ref={sectionRef}
      className={`mb-20 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h2 className="text-2xl font-bold text-[#333] mb-6 pb-2 border-b border-[#e0e0e0]">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white border border-[#e0e0e0] rounded-lg p-5 hover:shadow-lg hover:-translate-y-1 hover:border-[#6b8e6b]/30 transition-all duration-300"
          >
            {/* Project Image Placeholder */}
            <div className="w-full h-32 bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8] rounded-md mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold text-[#6b8e6b]/30">
                {project.title.charAt(0)}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-[#333] mb-2">
              {project.title}
            </h3>

            <p className="text-sm text-[#666] leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#f5f5f5] text-[#666] text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              <a
                href={project.links.demo}
                className="inline-flex items-center gap-1.5 text-sm text-[#6b8e6b] hover:underline font-medium"
              >
                <ExternalLink size={14} />
                Demo
              </a>
              <a
                href={project.links.github}
                className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#6b8e6b] transition-colors"
              >
                <Github size={14} />
                Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
