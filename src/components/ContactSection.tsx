import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7623 072 241",
    href: "tel:+917623072241",
  },
  {
    icon: Mail,
    label: "Email",
    value: "kumarnitin06022@gmail.com",
    href: "mailto:kumarnitin06022@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: "#",
  },
];

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const form = e.currentTarget; // ✅ SAVE REFERENCE
  const formData = new FormData(form);

  try {
    const res = await fetch(
      "http://localhost/backend/create_contact.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const result = JSON.parse(text);

    if (result.status === "success") {
      window.open(result.whatsapp_url, "_blank");
      toast({ title: "Message sent successfully!" });
      form.reset(); // ✅ SAFE NOW
    } else {
      toast({ title: result.message || "Failed" });
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
      id="contact"
      ref={sectionRef}
      className="py-24 bg-transparent mx-6 md:mx-12 rounded-2xl"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Discuss Your{" "}
            <span className="text-gradient">Next Project</span>
          </h2>
          <p className="text-muted-foreground">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className={`lg:col-span-1 space-y-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-center gap-4 p-6 bg-transparent transition-colors group"
              >
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  <p className="font-semibold text-foreground">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 dark:backdrop-blur-xs bg-transparent p-8 rounded-x3 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-white/10 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md dark:backdrop-blur-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="bg-white/10 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md dark:backdrop-blur-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can I help you?"
                  required
                  className="bg-white/10 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 backdrop-blur-md dark:backdrop-blur-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or inquiry..."
                  rows={5}
                  required
                  className="bg-white/10 dark:bg-black/10 text-foreground placeholder:text-muted-foreground focus:ring-0 resize-none backdrop-blur-md dark:backdrop-blur-md"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                onClick={() => console.log("BUTTON CLICKED")}
              >
                <Send className="w-4 h-4" />
                Send Message
              </Button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
