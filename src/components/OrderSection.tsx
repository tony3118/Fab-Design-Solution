import { useEffect, useRef, useState } from "react";
import { Send, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const OrderSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    const res = await fetch(
      "http://localhost/backend/create_order.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const result = JSON.parse(text);

    if (result.status === "success") {
      toast({
        title: "Order Submitted!",
        description: "Thank you for your inquiry. I'll get back to you within 24 hours.",
      });
      form.reset();
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      toast({ title: result.message || "Submission failed" });
    }
  } catch (err) {
    console.error("BACKEND ERROR:", err);
    toast({ title: "Backend error" });
  } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <section
      id="order"
      ref={sectionRef}
      className="py-24 bg-transparent mx-6 md:mx-12 rounded-2xl"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <div className={`${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
              Start Your Project
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Bring Your{" "}
              <span className="text-gradient">Product to Life?</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Share your project requirements and I'll provide a detailed proposal 
              tailored to your needs. From initial concepts to production-ready designs, 
              let's create something exceptional together.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    Get a detailed quote within 24 hours of submission.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Flexible Budgets</h3>
                  <p className="text-sm text-muted-foreground">
                    Solutions designed to fit your budget and timeline.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">End-to-End Support</h3>
                  <p className="text-sm text-muted-foreground">
                    From concept to manufacturing consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={`pt-10 pb-14 px-8 group hover-lift bg-white/5 dark:bg-black/15 rounded-x3 backdrop-blur-[2px] hover:border-white/40 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type *</Label>
                  <Select name="productType" required>
                    <SelectTrigger className="bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water-bottle">Water Bottle Design</SelectItem>
                      <SelectItem value="oil-container">Oil Container Design</SelectItem>
                      <SelectItem value="plastic-product">Plastic Product Design</SelectItem>
                      <SelectItem value="mould-design">Mould Design</SelectItem>
                      <SelectItem value="concept-design">Concept Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select name="budget">
                    <SelectTrigger className="bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                      <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                      <SelectItem value="50k-1L">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="above-1L">Above ₹1,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select name="timeline">
                    <SelectTrigger className="bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2-weeks">1-2 Weeks</SelectItem>
                      <SelectItem value="2-4-weeks">2-4 Weeks</SelectItem>
                      <SelectItem value="1-2-months">1-2 Months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your project requirements, specifications, and any reference materials..."
                  rows={4}
                  required
                  className="bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 resize-none backdrop-blur-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Reference Files (Optional)</Label>
                <div className="border-2 border-dashed border-border p-6 text-center bg-white/40 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 hover:border-primary/50 transition-colors cursor-pointer backdrop-blur-md">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop files or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports: JPG, PNG, PDF, CAD files (Max 10MB)
                  </p>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf,.dwg,.step,.iges"
                    multiple
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Submitted Successfully!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Project Request
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
