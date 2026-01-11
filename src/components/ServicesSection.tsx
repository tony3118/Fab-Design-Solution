import React, { useEffect, useRef, useState } from "react";
import printingIcon from "@/assets/icons/3d-printing.png";
import { ScanLine, Box, Cog, Construction, Lightbulb, Droplet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const services: {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}[] = [
  {
    icon: <Box className="w-7 h-7" />,
    title: "Industrial Product Design",
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>User-Centric:</strong> Research-driven design for usability.</li>
        <li><strong>Functionality & Aesthetics:</strong> Balance of form and function.</li>
        <li><strong>Collaboration:</strong> Designers work with engineers and manufacturers.</li>
        <li><strong>Key Activities:</strong> Research, ideation, CAD, material selection.</li>
      </ul>
    )
  },
  {
    icon: (
      <img
        src={printingIcon}
        alt="3D Printing"
        className="w-10 h-10 object-contain
      transition-all duration-300
      group-hover:invert
      group-hover:brightness-0
      group-hover:contrast-200
      group-hover:scale-110"
      
      />
    ),
    title: "3D Printing",
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Design:</strong> Create a 3D model using CAD or scans.</li>
        <li><strong>Slicing:</strong> Convert the model into printable layers.</li>
        <li><strong>Printing:</strong> Object is built layer by layer.</li>
        <li><strong>Completion:</strong> Post-processing like curing or cleaning.</li>
      </ul>
    )
  },
  {
    icon: <ScanLine className="w-7 h-7" />,
    title: "3D Scanning",
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Laser Scanning:</strong> High accuracy for complex shapes.</li>
        <li><strong>Structured Light:</strong> Pattern projection mapping.</li>
        <li><strong>Photogrammetry:</strong> 3D models from photos.</li>
        <li><strong>Contact Scanning:</strong> Extreme precision probing.</li>
      </ul>
    )
  },
  {
    icon: <Cog className="w-7 h-7" />,
    title: "Product & Mould Design",
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Cavity/Core:</strong> Internal mould geometry.</li>
        <li><strong>Material Flow:</strong> Uniform filling and pressure.</li>
        <li><strong>Cooling:</strong> Thermal control channels.</li>
        <li><strong>Structure:</strong> Slides, lifters, multi-cavity layouts.</li>
      </ul>
    )
  },
  {
    icon: <Construction className="w-7 h-7" />,
    title: "Manufacturing-Ready Designs",
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Ease of Assembly:</strong> Optimized for production.</li>
        <li><strong>Simplified Design:</strong> Reduced parts and cost.</li>
        <li><strong>Compliance:</strong> Industry standards met.</li>
      </ul>
    )
  },
  {
    icon: <Lightbulb className="w-7 h-7" />,
    title: "Concept Development",
    description: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Problem Definition:</strong> Deep user research.</li>
        <li><strong>Idea Generation:</strong> Brainstorming & ideation.</li>
        <li><strong>Prototyping:</strong> Validate with real users.</li>
        <li><strong>Market Feasibility:</strong> Business viability analysis.</li>
      </ul>
    )
  }
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    sectionRef.current && observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 bg-transparent mx-6 md:mx-12 rounded-2xl"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            What I Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive <span className="text-gradient">Design Services</span>
          </h2>
          <p className="text-muted-foreground">
            From concept to production, tailored industrial design solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group hover-lift bg-white/5 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-xl backdrop-blur-[2px] hover:border-white/40 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mb-4 rounded-xl group-hover:bg-primary transition-all duration-300">
                  <div className="text-primary group-hover:text-primary-foreground transition">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
