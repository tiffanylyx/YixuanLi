import { useEffect, useRef, useState } from 'react';


export default function About() {
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
      id="about"
      ref={sectionRef}
      className={`mb-20 transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {/* Profile Image */}
      <div className="flex flex-col items-center lg:items-start mb-8">



        <h2 className="text-3xl font-bold text-[#333] mb-2">Hello, I'm Yixuan Li (李,翊瑄)!</h2>


      </div>

      {/* Bio */}
      <div className="space-y-4 text-[#333] leading-relaxed">
        <p>
          I am Yixuan Li (李, 翊瑄) from Tianjin, China. I’m a Ph.D. student in Human-Centered Computing at Georgia Tech advised by
          <a href="https://jessicaannroberts.com/" className="text-[#6b8e6b] hover:underline font-medium"> Dr. Jessica Roberts </a>
          in
          <a href="https://tiles.cc.gatech.edu/" className="text-[#6b8e6b] hover:underline font-medium"> Tiles Lab</a>,
          where my research focuses on promoting data literacy through data visualization in
          informal learning environments. I design interactive systems and learning experiences
          to empower K-12 students and public audiences to actively engage with and communicate using data.
        </p>

        <p>
          My work brings together insights from
          <span className="font-semibold"> learning sciences</span>,
          <span className="font-semibold"> data visualization</span>, and
          <span className="font-semibold"> human-computer interaction</span>.
          I collaborate closely with visualization researchers, K–12 educators,
          and K-12 students to design and evaluate both educational tools and
          pedagogical frameworks. Ultimately, I aim to make data more accessible,
          relatable, and powerful for learners and the general public by leveraging
          visualization as a tool for both inquiry and communication.
        </p>

      </div>

      {/* Research Interests Tags */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-[#666] uppercase tracking-wider mb-3">
          Research Interest
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Data Visualization Literacy', 'Informal Learning Space', 'HCI', 'Epistemic Agency'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white border border-[#e0e0e0] rounded-full text-sm text-[#555] hover:border-[#6b8e6b] hover:text-[#6b8e6b] transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
