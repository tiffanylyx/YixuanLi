import { useEffect, useRef, useState } from 'react';
import { Download, GraduationCap, Briefcase, FileText } from 'lucide-react';

const education = [
  {
    degree: 'Ph.D. Student in Human-Centered-Computering',
    institution: 'Georgia Institute of Technology, US',
    period: '2023 - Now',
    advisor: (
  <a
    href="https://jessicaannroberts.com/"
    className="text-[#6b8e6b] hover:underline font-medium"
  >
    Prof. Jessica Roberts
  </a>
),
  },
  {
    degree: 'MSc in Media, Arts and Technology',
    institution: 'University of California, Santa Barbara, US',
    period: '2021 - 2023',
    advisor: (
  <a
    href="https://www.mat.ucsb.edu/legrady/"
    className="text-[#6b8e6b] hover:underline font-medium"
  >
    Prof. George Legrady
  </a>
),
  },
  {
    degree: 'BSc in Data Science',
    institution: 'Fudan University, Shanghai, China',
    period: '2017 - 2021',
    advisor: (
  <a
    href="http://simingchen.me/"
    className="text-[#6b8e6b] hover:underline font-medium"
  >
    Prof. Siming Chen
  </a>
),
  },
];

const experience = [
  {
    title: (
  <a
    href="https://cyxiong.com/2025-spring-gatech-cs-6730-data-visualization-principles-applications/"
    className="hover:underline font-medium"
  >
    CS6730 Data Visualization: Principles & Applications
  </a>
),
    organization: 'GaTech',
    period: 'Spring 2025',
    description: 'Head Teaching Assistant to Prof. Cindy Xiong Bearfield',
  },
  {
    title: 'MAT201A Media Signal Processing',
    organization: 'UCSB',
    period: 'Spring 2023',
    description: 'Teaching Assistant to Dr. Karl Yerkes',
  },
  {
    title: (
  <a
    href="https://vislab.mat.ucsb.edu/2023.html"
    className="hover:underline font-medium"
  >
    MAT259 Data Visualization
  </a>
),
    organization: 'UCSB',
    period: 'Winter 2023',
    description: 'Teaching Assistant to Prof. George Legrady',
  },
  {
    title: (
  <a
    href="https://www.mat.ucsb.edu/~g.legrady/academic/courses/22f255/22f255.html"
    className="hover:underline font-medium"
  >
    MAT255 Computational Photographic Image
  </a>
),
    organization: 'UCSB',
    period: 'Fall 2022',
    description: 'Teaching Assistant and Curriculum Designer to Prof. George Legrady',
  },
  {
    title: (
  <a
    href="https://www.mat.ucsb.edu/~g.legrady/academic/courses/22f255/22f255b.html"
    className="hover:underline font-medium"
  >
    MAT255 Computational Asethetics
  </a>
),
    organization: 'UCSB',
    period: 'Spring 2022',
    description: 'Teaching Assistant to Prof. George Legrady',
  },
  {
    title: (
  <a
    href="https://vislab.mat.ucsb.edu/2022.html"
    className="hover:underline font-medium"
  >
    MAT259 Data Visualization,
  </a>
),
    organization: 'UCSB',
    period: 'Winter 2022',
    description: 'Teaching Assistant to Prof. George Legrady',
  },
];

// const awards = [
//   { name: '清华大学研究生学术新秀', year: '2024' },
//   { name: '国家奖学金', year: '2023, 2024' },
//   { name: 'ACL Outstanding Paper Award', year: '2024' },
//   { name: '优秀本科生毕业论文', year: '2022' },
// ];

export default function CV() {
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
      id="cv"
      ref={sectionRef}
      className={`mb-12 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <h2 className="text-2xl font-bold text-[#333] mb-6 pb-2 border-b border-[#e0e0e0]">
        CV
      </h2>

      {/* Download Button */}
      <div className="mb-8">
        <a
          href="document/Yixuan_CV.pdf"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6b8e6b] text-white rounded-lg hover:bg-[#5a7a5a] transition-colors font-medium shadow-sm"
        >
          <Download size={18} />
          Download (PDF)
        </a>
      </div>

      <div className="space-y-8">
        {/* Education */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#333] mb-4">
            <GraduationCap size={20} className="text-[#6b8e6b]" />
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white border border-[#e0e0e0] rounded-lg p-4"
              >
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h4 className="font-semibold text-[#333]">{edu.degree}</h4>
                    <p className="text-[#6b8e6b] font-medium">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-[#666] bg-[#f5f5f5] px-2 py-1 rounded">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm text-[#666] mt-2">{edu.advisor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#333] mb-4">
            <Briefcase size={20} className="text-[#6b8e6b]" />
            Teaching
          </h3>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white border border-[#e0e0e0] rounded-lg p-4"
              >
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h4 className="font-semibold text-[#333]">{exp.title}</h4>
                    <p className="text-[#6b8e6b] font-medium">{exp.organization}</p>
                  </div>
                  <span className="text-sm text-[#666] bg-[#f5f5f5] px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-[#666] mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Contact */}
        <div className="bg-[#6b8e6b]/5 border border-[#6b8e6b]/20 rounded-lg p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-[#333] mb-3">
            <FileText size={20} className="text-[#6b8e6b]" />
            Contact
          </h3>
          <div className="space-y-2 text-[#666]">
            <p>
              <span className="font-medium">Email</span>
              <a href="mailto:yixuanli@gatech.edu" className="text-[#6b8e6b] hover:underline">
                yixuanli@gatech.edu
              </a>
            </p>
            <p>
              <span className="font-medium">Address:</span>
              Technology Square Research Building, 85 5th St NW, Atlanta, GA 30308, United States
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
