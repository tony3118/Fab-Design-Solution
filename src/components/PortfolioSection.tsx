import { useEffect, useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import portfolioBottle from "@/assets/portfolio-bottle.png";
import portfolioContainer from "@/assets/portfolio-container.png";
import portfolioContainer2 from "@/assets/portfolio-container2.png";
import portfolioMould from "@/assets/portfolio-mould.png";
import portfolioMould2 from "@/assets/portfolio-mould2.png";
import portfolioParts from "@/assets/portfolio-parts.png";
import portfolioParts2 from "@/assets/portfolio-parts2.png";
import portfolioParts3 from "@/assets/portfolio-parts3.png";
import portfolioParts4 from "@/assets/portfolio-parts4.png";
import portfolioParts5 from "@/assets/portfolio-parts5.png";
import portfolioParts6 from "@/assets/portfolio-parts6.png";
import portfolioParts7 from "@/assets/portfolio-parts7.png";
import portfolioProduct from "@/assets/portfolio-product.png";
import portfolioProduct2 from "@/assets/portfolio-product2.png";

const portfolioItems = [
  {
    id: 1,
    image: portfolioBottle,
    title: "HDPE 1 Liter Bottle",
    category: "Bottles",
    label: "BOTTLE",
    description: <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
      <li>Ergonomically designed HDPE bottle with a sleek and functional pharma-grade structure.</li>
      <li>Precision-molded HDPE bottle design optimized for pharmaceutical packaging applications.</li>
      <li>User-friendly bottle design with smooth contours and balanced form for easy handling.</li>
      <li>Compact and durable HDPE bottle engineered for safe pharmaceutical use.</li>
      <li>Modern pharma bottle design combining form, function, and reliability.</li>
      <li>Smartly contoured HDPE bottle for efficient handling and secure packaging.</li>
    </ul>
  },
  {
    id: 2,
    image: portfolioContainer,
    title: "Industrial Oil Container",
    category: "Containers",
    label: "CONTAINER",
    description: "Heavy-duty oil container with reinforced handle and precision pour spout. Optimized for both retail and industrial applications.",
  },
  {
    id: 3,
    image: portfolioMould,
    title: "Blow Mould",
    category: "Mould Designs",
    label: "MOULD",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 4,
    image: portfolioParts,
    title: "Machine Parts",
    category: "Machine Parts",
    label: "MACHINE PART",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 5,
    image: portfolioProduct,
    title: "Cricket Bat",
    category: "Product Concepts",
    label: "PRODUCT",
    description: "Contemporary plastic lounge chair featuring fluid organic curves. Designed for both indoor and outdoor use with UV-resistant materials.",
  },
  {
    id: 6,
    image: portfolioContainer2,
    title: "Industrial Oil Container",
    category: "Containers",
    label: "CONTAINER",
    description: "Heavy-duty oil container with reinforced handle and precision pour spout. Optimized for both retail and industrial applications.",
  },
  {
    id: 7,
    image: portfolioParts2,
    title: "Machine Parts",
    category: "Machine Parts",
    label: "MACHINE PART",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 8,
    image: portfolioParts3,
    title: "Machine Parts",
    category: "Machine Parts",
    label: "MACHINE PART",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 9,
    image: portfolioParts4,
    title: "Machine Parts",
    category: "Machine Parts",
    label: "MACHINE PART",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 10,
    image: portfolioParts5,
    title: "Machine Parts",
    category: "Machine Parts",
    label: "MACHINE PART",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 11,
    image: portfolioParts6,
    title: "Machine Parts",
    category: "Machine Parts",
    label: "MACHINE PART",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 12,
    image: portfolioParts7,
    title: "Machine Parts",
    category: "Machine Parts",
    label: "MACHINE PART",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 13,
    image: portfolioMould2,
    title: "Chocolate Mould",
    category: "Mould Designs",
    label: "MOULD",
    description: "High-precision injection mould design for consumer electronics housing. Features multi-cavity layout for efficient production.",
  },
  {
    id: 14,
    image: portfolioProduct2,
    title: "Containers and Bottles",
    category: "Product Concepts",
    label: "PRODUCT",
    description: "Contemporary plastic lounge chair featuring fluid organic curves. Designed for both indoor and outdoor use with UV-resistant materials.",
  },
];

const categories = ["All", "Bottles", "Containers", "Mould Designs", "Machine Parts", "Product Concepts"];

const PortfolioSection = () => {
  const isMobile = window.innerWidth < 768;
  const [showAll, setShowAll] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);


  const filteredItems =
    activeCategory === "All"
      ? showAll
        ? portfolioItems
        : portfolioItems.slice(0, 4)
      : portfolioItems.filter(
        (item) => item.category === activeCategory
      );


  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 bg-card/20 dark:bg-black/30 backdrop-blur-sm/20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            My Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured{" "}
            <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-muted-foreground">
            A showcase of my recent industrial design projects across various categories.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative cursor-pointer overflow-hidden bg-background ${isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-xs font-medium text-primary-foreground/80 tracking-widest mb-2">
                  {item.label ?? item.category}
                </p>

                <h3 className="text-xl font-bold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <ZoomIn className="w-4 h-4" />
                  <span className="text-sm">Click to view details</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Button */}
        {activeCategory === "All" && !showAll && portfolioItems.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              See All
            </button>
          </div>
        )}


        {/* Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent
            className={`
              bg-card border-border overflow-y-auto transition-all duration-300
              [&>button]:hidden
              ${isMobile
                ? "fixed bottom-4 left-1/2 -translate-x-1/2 w-[92vw] max-w-[420px] min-h-[80vh] max-h-[90vh] rounded-2xl"
                : "max-w-4xl"
              }
           `}
          >

            {isMobile && (
              <div className="w-full flex justify-center pt-2 pb-3">
                <div className="h-1.5 w-12 rounded-full bg-muted" />
              </div>
            )}

          <div className="relative rounded-xl p-8">

            {/* DESKTOP CLOSE BUTTON */}
            <button
              onClick={() => setSelectedItem(null)}
              className="
    hidden md:flex
    absolute top-4 right-4 z-50
    rounded-full
    bg-background/80
    backdrop-blur
    border border-border
    p-2
    hover:bg-muted
    transition
  "
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>


            {/* MOBILE CLOSE BUTTON */}
            {isMobile && (
              <div className="absolute top-4 right-4 z-50">
              <button
                onClick={() => setSelectedItem(null)}
                className="
      flex h-10 w-10 items-center justify-center
      rounded-full
      bg-background/90
      border border-border
      shadow
      active:scale-95
      transition
    "
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
             </div>
            )}
          </div>


            <DialogHeader>
              <DialogTitle className="text-2xl text-foreground">{selectedItem?.title}</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="pb-20">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-[45vh] overflow-hidden bg-background rounded-xl">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                      {selectedItem.label ?? selectedItem.category}
                    </p>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {selectedItem.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Design Type</span>
                        <span className="text-foreground font-medium">Industrial Product</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span className="text-foreground font-medium">Production Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PortfolioSection;
