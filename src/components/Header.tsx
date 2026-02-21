import { useState, useEffect } from "react";
import { Menu, X, Phone, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();   // ✅ ADD THIS
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost/client-area/check-session.php", {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error("Session check failed");
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (window.innerWidth < 768 && isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);





  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLogout = async () => {
    await fetch("http://localhost/client-area/logout.php", {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setIsProfileOpen(false);

    window.location.href = "http://localhost:8083/";
  };

  const handlePlaceOrder = async () => {
    const res = await fetch("http://localhost/client-area/check-session.php", {
      credentials: "include",
    });

    const data = await res.json();

    if (!data.loggedIn) {
      window.location.href =
        "http://localhost/client-area/auth.php?redirect=order";
    } else {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isCheckingSession) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-300 ${isScrolled ? "bg-gradient-to-b from-black/70 to-black/60 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <a
              href="/"
              className="flex-shrink-0 hover:scale-105 transition-transform"
            >
              <img
                src={`${import.meta.env.BASE_URL}logo-light.png`}
                className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto dark:hidden"
                alt="Logo Light"
              />
              <img
                src={`${import.meta.env.BASE_URL}logo-dark1.png`}
                className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto hidden dark:block"
                alt="Logo Dark"
              />
            </a>


            {/* DESKTOP NAV */}
            <nav className="hidden md:flex gap-8">
              {navLinks.map(link => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* DESKTOP RIGHT */}
            <div className="hidden md:flex items-center gap-4 relative">

              {!isLoggedIn ? (
                <button
                  onClick={() =>
                    window.location.replace(
                      "http://localhost/client-area/auth.php?mode=signup"
                    )
                  }
                  className="
relative inline-flex items-center justify-center
px-5 py-2 text-xs font-semibold tracking-wider
text-white whitespace-nowrap
rounded-full overflow-hidden
border border-white/20 bg-white/5 backdrop-blur
transition-all duration-300 ease-out
hover:scale-105
hover:shadow-[0_0_25px_rgba(255,255,255,0.35)]
before:absolute before:inset-0
before:-translate-x-full
before:bg-gradient-to-r 
before:from-transparent 
before:via-white/30 
before:to-transparent
before:transition-transform before:duration-700
hover:before:translate-x-full
"
                >
                  GET STARTED
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsProfileOpen(prev => !prev)}
                    className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <User className="w-5 h-5 text-primary" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-12 bg-background border rounded-xl shadow-lg w-48">
                      <button
                        onClick={() =>
                          (window.location.href = "/profile")
                        }
                        className="block w-full text-left px-4 py-3"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          document
                            .getElementById("order")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="block w-full text-left px-4 py-3"
                      >
                        My Orders
                      </button>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}

              <ThemeToggle />
              <Button onClick={handlePlaceOrder}>Place Order</Button>
            </div>

            {/* MOBILE RIGHT */}
            <div className="md:hidden flex items-center gap-2">

              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      window.location.href = "http://localhost/client-area/auth.php?mode=signup";
                    }}
                    className="
relative inline-flex items-center justify-center
px-5 py-2 text-xs font-semibold tracking-wider
text-white whitespace-nowrap
rounded-full overflow-hidden
border border-white/20 bg-white/5 backdrop-blur
transition-all duration-300 ease-out
hover:scale-105
hover:shadow-[0_0_25px_rgba(255,255,255,0.35)]
before:absolute before:inset-0
before:-translate-x-full
before:bg-gradient-to-r 
before:from-transparent 
before:via-white/30 
before:to-transparent
before:transition-transform before:duration-700
hover:before:translate-x-full
"

                  >
                    GET STARTED
                  </button>


                  <button
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsMenuOpen(prev => !prev)}
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-primary" />
                </button>
              )}

              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[999999] md:hidden">

          {/* DARK OVERLAY */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* SLIDE PANEL */}
          <div
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm 
                 bg-background shadow-2xl 
                 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE BUTTON */}
            <div className="flex justify-end pt-24 px-6 pb-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-6 pb-10 flex flex-col gap-6 overflow-y-auto">

              {isLoggedIn && (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-center px-4 py-3"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      document.getElementById("order")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    My Orders
                  </button>

                  <button onClick={handleLogout} className="text-red-500">
                    Logout
                  </button>

                  <div className="border-t my-4"></div>
                </>
              )}

              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <Button
                className="mt-6"
                onClick={() => {
                  setIsMenuOpen(false);
                  handlePlaceOrder();
                }}
              >
                Place Order
              </Button>

            </nav>
          </div>
        </div>

      )}
    </>
  );
};

export default Header;
