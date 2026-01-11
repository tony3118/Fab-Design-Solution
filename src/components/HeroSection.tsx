import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-products.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Industrial Product Design"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10 pt-20">
        <div className="max-w-4xl relative">
          {/* Main Headline - BEGG Style */}
          <div className="relative">
            <h1 className="font-display font-bold uppercase leading-[0.95] tracking-tight">
  
              <span 
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up"
                style={{ animationDelay: "0.15s" }}
              >
                your requirement,
              </span>
              <span 
                className="block text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] text-white/70 drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up pl-8 md:pl-16 lg:pl-24"
                style={{ animationDelay: "0.3s" }}
              >
                our commitment
              </span>
            </h1>
            
            {/* Handwritten Tagline - Overlapping the headline */}
            <div className="relative -mt-4 md:-mt-8">
              <p className="font-handwritten text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]">
                <span 
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl -rotate-3 animate-handwriting"
                  style={{ animationDelay: "0.5s" }}
                >
                  Design Build
                </span>
                <span 
                  className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl pl-20 sm:pl-28 md:pl-36 lg:pl-44 -rotate-2 animate-handwriting"
                  style={{ animationDelay: "0.9s" }}
                >
                  For Production
                </span>
              </p>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Transforming ideas into manufacturing-ready designs. Specializing in
            water bottles, oil containers, plastic products, and precision mould
            design.
          </p>

          {/* CTA Buttons - positioned lower */}
          <div className="flex flex-col sm:flex-row gap-4 translate-y-32 md:-translate-y-20 animate-fade-in-up" style={{ animationDelay: "1.3s" }}>
            <Button size="lg" asChild className="group">
              <a href="#portfolio">
                View Portfolio
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/30 text-foreground hover:bg-white/10">
              <a href="#order">
                <Play className="mr-2 w-4 h-4" />
                Place an Order
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
