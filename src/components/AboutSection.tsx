import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Award, Users, Briefcase } from "lucide-react";
import designerImage from "@/assets/designer-portrait.png";

const stats = [
  { icon: Briefcase, value: "50+", label: "Projects Completed" },
  { icon: Users, value: "30+", label: "Happy Clients" },
  { icon: Award, value: "10+", label: "Years Experience" },
];

const skills = [
  "NX & AutoCAD",
  "3D Scanning",
  "Reverse Engineering",
  "Injection Mould Design",
  "3D Prototype Printing",
  "CMM Inspection",
];

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      className="py-24 bg-card/20 dark:bg-black/30 backdrop-blur-sm/20"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className={`relative ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="relative aspect-[4/4] w-full">
              <img
                src={designerImage}
                alt="Nitin Kumar - Industrial Designer"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              About Me
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Industrial Designer Crafting{" "}
              <span className="text-gradient">Innovative Solutions</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hello,
              My name is Nitin Kumar, and I am a 3D CAD Designer with 8 years of experience in product design, mold design, and reverse engineering.
              I am proficient in Siemens NX, PowerShape, and AutoCAD for creating accurate and high-quality 3D models.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I can complete your fixture design project efficiently and deliver precise results within the timeline.
              Looking forward to collaborating with you on this project.
              <ul>
              <li>Thank you!</li>
              <li>Best regards,</li>
              <li>Nitin Kumar</li>
              </ul>
            </p>

            {/* Skills Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{skill}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
