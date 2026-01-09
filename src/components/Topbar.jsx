import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import JuriphLogo from "../assets/Juriph Logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // underline (single moving bar)
  const [underline, setUnderline] = useState({ left: 0, width: 0, opacity: 0 });
  const listRef = useRef(null);
  const itemRefs = useRef({}); // path -> element

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { name: "Home", path: "/" && "#Home" },
      { name: "How it works", path: "#How-it-works" },
      { name: "Features", path: "#Features" },
      { name: "Blogs", path: "/blogs" },
    ],
    []
  );

  // Close mobile menu on route/hash change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const scrollToHash = (hash) => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // When hash changes (via navigate), scroll
  useEffect(() => {
    if (location.hash) {
      const t = setTimeout(() => scrollToHash(location.hash), 50);
      return () => clearTimeout(t);
    }
  }, [location.hash]);

  const handleNav = (path) => {
    if (!path) return;

    // Hash links
    if (path.startsWith("#")) {
      // If you're not on home, go to home with hash
      if (location.pathname !== "/") {
        navigate("/" + path); //  
      } else {
        navigate(path); // 
      }
      return;
    }

    // Normal routes
    navigate(path);
  };

  const isActive = (path) => {
    if (!path) return false;

    if (path === "/") return location.pathname === "/" && !location.hash;

    if (path.startsWith("#")) {
      return location.pathname === "/" && location.hash === path;
    }

    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const updateUnderline = () => {
    const activeItem = navItems.find((i) => isActive(i.path));
    const parent = listRef.current;

    if (!activeItem || !parent) {
      setUnderline((u) => ({ ...u, opacity: 0 }));
      return;
    }

    const el = itemRefs.current[activeItem.path];
    if (!el) {
      setUnderline((u) => ({ ...u, opacity: 0 }));
      return;
    }

    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    setUnderline({
      left: elRect.left - parentRect.left,
      width: elRect.width,
      opacity: 1,
    });
  };

  // Update underline when active changes
  useLayoutEffect(() => {
    updateUnderline();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // Update underline on resize
  useEffect(() => {
    const onResize = () => updateUnderline();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="bg-[#fcf8f0] lg:px-20 sticky top-0 z-50">
      <div className="mx-auto h-16 lg:h-20 px-4 lg:px-6 flex items-center justify-between">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-6 lg:gap-12">
          <button
            type="button"
            onClick={() => handleNav("/")}
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C284] rounded-md"
          >
            <img src={JuriphLogo} width="130" alt="Juriph Logo" className="block" />
          </button>

          {/* Desktop Menu */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul
              ref={listRef}
              className="relative flex gap-8 text-sm lg:text-base text-[#012B37] font-medium"
            >
              {navItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <li key={item.path} className="relative">
                    <button
                      ref={(node) => {
                        if (node) itemRefs.current[item.path] = node;
                      }}
                      type="button"
                      onClick={() => handleNav(item.path)}
                      className={`relative pb-2 cursor-pointer transition-colors duration-200 ${
                        active ? "text-[#d6a154]" : "hover:opacity-80"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                );
              })}

              {/* ONE underline bar */}
              <motion.span
                className="absolute bottom-0 h-0.75 bg-[#E8C284] rounded-full"
                animate={{
                  x: underline.left,
                  width: underline.width,
                  opacity: underline.opacity,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            </ul>
          </nav>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="px-6 py-2.5 cursor-pointer rounded-lg font-medium border border-[#E8C284] text-[#012B37] hover:bg-[#f5e5c7] transition">
            Contact us
          </button>
          <button
          onClick={() => handleNav("/select-page")}
          className="px-6 py-2.5 cursor-pointer rounded-lg font-medium bg-[#E8C284] text-[#012B37] hover:bg-[#e2b766] transition">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C284]"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6 text-[#012B37]" /> : <Menu className="w-6 h-6 text-[#012B37]" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-[#ecd9b8] bg-[#fcf8f0]"
          >
            <div className="mx-auto max-w-6xl px-4 pb-4">
              <ul className="flex flex-col gap-1 text-[#012B37] text-sm font-medium mt-3">
                {navItems.map((item) => {
                  const active = isActive(item.path);

                  return (
                    <motion.li key={item.path} whileTap={{ scale: 0.97 }} className="w-full">
                      <button
                        type="button"
                        onClick={() => handleNav(item.path)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                          active
                            ? "border-l-4 border-[#E8C284] text-[#d6a154] bg-[#f5e6c5]/40"
                            : "hover:bg-[#f5e6c5]/30"
                        }`}
                      >
                        {item.name}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-4 flex flex-col gap-3">
                <button className="w-full px-6 py-2.5 cursor-pointer rounded-lg font-medium border border-[#E8C284] text-[#012B37] hover:bg-[#f5e5c7] transition">
                  Contact us
                </button>
                <button
                onClick={()=>{navigate("/select-page")}}
                className="w-full px-6 py-2.5 cursor-pointer rounded-lg font-medium bg-[#E8C284] text-[#012B37] hover:bg-[#e2b766] transition">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
