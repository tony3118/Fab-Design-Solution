import { ArrowUp, Linkedin, Instagram, Twitter, Dribbble } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#order", label: "Place Order" },
    { href: "#contact", label: "Contact" },
  ];

  const services = [
    "Industrial Product Design",
    "Water Bottle Design",
    "Reverse Engineering",
    "Mould Design",
    "Concept Development",
  ];

  const socials = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Dribbble, href: "#", label: "Dribbble" },
  ];

  return (
    <footer className="pt-12 pb-16 bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0">
      <div className="max-w-10xl mx-auto px-6 md:px-8 pt-12 pb-16 backdrop-blur-md">
        <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="text-2xl font-bold inline-block mb-4 dark:text-gray-300">
              FAB DESIGN{" "}<span className="text-primary-foreground/70 dark:text-[#f5f1e8]">SOLUTION</span>
            </a>
            <p className="text-background/70 text-sm leading-relaxed mb-6 dark:text-gray-300">
              Industrial & Product Designer crafting innovative, manufacturing-ready 
              solutions for brands worldwide.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors dark:text-gray-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-background/70 dark:text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+917623072241"
                  className="text-sm text-background/70 hover:text-background transition-colors dark:text-gray-300"
                >
                  +91 7623 072 241
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@nitinkumar.design"
                  className="text-sm text-background/70 hover:text-background transition-colors dark:text-gray-300"
                >
                  kumarnitin06022@gmail.com
                </a>
              </li>
              <li>
                <span className="text-sm text-background/70 dark:text-gray-300">India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60 dark:text-gray-300">
            © {new Date().getFullYear()} Nitin Kumar. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
