import { useState, useEffect } from "react";
import { Menu, X, Phone, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".profile-menu")) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);

    fetch("http://localhost/client-area/check-auth.php", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => { setIsLoggedIn(!!data?.loggedIn) });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  const handlePlaceOrder = async () => {
    const res = await fetch("http://localhost/client-area/check-auth.php", {
      credentials: "include",
    });
    const data = await res.json();

    if (!data.loggedIn) {
      // store intent in backend via auth.php
      window.location.href =
        "http://localhost/client-area/auth.php?redirect=order";
    } else {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }

  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-auto transition-all duration-300 ${isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href={import.meta.env.BASE_URL} className="transition-transform duration-300 hover:scale-105">
            {/* Light mode logo */}
            <img
              src={`${import.meta.env.BASE_URL}logo-light.png`} alt="Logolight"

              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto block dark:hidden"
            />

            {/* Dark mode logo */}
            <img
              src={`${import.meta.env.BASE_URL}logo-dark1.png`} alt="Logodark"

              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto hidden dark:block dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
            />
          </a>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

          </nav>

          <div className="hidden md:flex items-center gap-4 relative">
            {!isLoggedIn ? (
              <a
                href="http://localhost/client-area/auth.php"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                GET STARTED
              </a>
            ) : (
              <>
                {/* User Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ VERY IMPORTANT
                    setIsProfileOpen((prev) => !prev);
                  }}
                  className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center relative z-[10000]"
                >
                  <User className="w-5 h-5 text-primary" />
                </button>


                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div
                    className="profile-menu absolute right-0 top-12 w-48 bg-background border border-border rounded-xl shadow-lg z-[10000]"
                    onClick={(e) => e.stopPropagation()} // ✅ IMPORTANT
                  >

                    <button
                      onClick={() => {
                        window.location.href = `${import.meta.env.BASE_URL}profile`;
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted"
                    >
                      Profile
                    </button>

                    {/* ✅ MY ORDERS — ONLY WHEN LOGGED IN */}
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        document
                          .getElementById("order")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-muted transition-colors"
                    >
                      My Orders
                    </button>



                    <button
                      onClick={() => {
                        window.location.href = "http://localhost/client-area/logout.php";
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}

            <a href="tel:+917623072241" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              +91 7623 072 241
            </a>

            <ThemeToggle />

            <Button onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>


          {/* Mobile Menu Button */}
         <div className="md:hidden flex items-center gap-2">            
          <ThemeToggle />

          <button
            className="md:hidden p-2 rounded-lg bg-background/60 backdrop-blur border border-border text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
         </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-[9998] bg-background/95 backdrop-blur-xl border-t border-border rounded-t-2xl transition-y-full opacity-0 pointer-events-auto duration-300 ${isMenuOpen
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
          }`}
      >


        <nav className="container mx-auto px-6 py-8 flex flex-col gap-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {isLoggedIn && (
            <>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = `${import.meta.env.BASE_URL}profile`;
                }}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  document
                    .getElementById("order")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                My Orders
              </button>

              <button
                onClick={() => {
                  window.location.href = "http://localhost/client-area/logout.php";
                }}
                className="text-lg font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}


          {!isLoggedIn && (
            <a
              href="http://localhost/client-area/auth.php"
              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              GET STARTED
            </a>
          )}
          <Button
            className="mt-6 w-full rounded-xl py-3 text-base"
            onClick={() => {
              setIsMenuOpen(false);
              handlePlaceOrder();
            }}
          >
            Place Order
          </Button>

        </nav>
      </div>
    </header>
  );
};

export default Header;
