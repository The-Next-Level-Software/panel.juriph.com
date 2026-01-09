import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "#Profile", label: "Profile" },
  { to: "#Certificate", label: "Certificates" },
  { to: "#Skill", label: "Skills" },
  { to: "#Portfolio", label: "Portfolio" },
];

export default function ProfileSidebar({ scrollRef }) {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultHash = links[0].to;

  // prevents scroll listener from overriding activeTab while we are auto-scrolling
  const isProgrammaticScroll = useRef(false);
  const programmaticTimer = useRef(null);

  const normalizedHash = useMemo(() => {
    if (!location.hash) return "";
    const match = links.find(
      (l) => l.to.toLowerCase() === location.hash.toLowerCase()
    );
    return match?.to || location.hash;
  }, [location.hash]);

  const [activeTab, setActiveTab] = useState(defaultHash);

  const scrollToHash = (hash) => {
    const id = hash.replace("#", "");
    const container = scrollRef?.current;
    if (!container) return;

    const el = container.querySelector(`#${CSS.escape(id)}`);
    if (!el) return;

    // mark as programmatic scroll so scroll listener doesn't fight the state
    isProgrammaticScroll.current = true;
    clearTimeout(programmaticTimer.current);

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // after a short time allow scroll listener to take over again
    programmaticTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  };

  // 1) Sync state with hash (on load + when hash changes)
  useEffect(() => {
    const container = scrollRef?.current;
    if (!container) return;

    if (!location.hash) {
      navigate(
        { pathname: location.pathname, hash: defaultHash },
        { replace: true }
      );
      setActiveTab(defaultHash);
      requestAnimationFrame(() => scrollToHash(defaultHash));
      return;
    }

    const exists = links.some(
      (l) => l.to.toLowerCase() === location.hash.toLowerCase()
    );

    const next = exists ? normalizedHash : defaultHash;

    if (!exists) {
      navigate(
        { pathname: location.pathname, hash: defaultHash },
        { replace: true }
      );
    }

    setActiveTab(next);
    requestAnimationFrame(() => scrollToHash(next));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash, location.pathname, navigate, defaultHash, normalizedHash]);

  // 2) Update activeTab when user scrolls the RIGHT PANEL
  useEffect(() => {
    const container = scrollRef?.current;
    if (!container) return;

    const getActiveSectionByScroll = () => {
      // don't override when we are doing smooth-scroll due to click
      if (isProgrammaticScroll.current) return;

      const top = container.getBoundingClientRect().top;

      // pick the section whose top is closest to container top (within threshold)
      let best = { hash: defaultHash, dist: Number.POSITIVE_INFINITY };

      for (const item of links) {
        const id = item.to.replace("#", "");
        const el = container.querySelector(`#${CSS.escape(id)}`);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - top);

        // prefer sections that are at/above the top a little
        // (so it feels natural while scrolling)
        if (rect.top - top <= 120 && dist < best.dist) {
          best = { hash: item.to, dist };
        }
      }

      if (best.hash !== activeTab) {
        setActiveTab(best.hash);

        // keep URL hash in sync without adding to history stack
        if (location.hash?.toLowerCase() !== best.hash.toLowerCase()) {
          navigate(
            { pathname: location.pathname, hash: best.hash },
            { replace: true }
          );
        }
      }
    };

    // run once initially
    getActiveSectionByScroll();

    // listen on right panel scroll
    container.addEventListener("scroll", getActiveSectionByScroll, {
      passive: true,
    });

    return () => {
      container.removeEventListener("scroll", getActiveSectionByScroll);
    };
  }, [scrollRef, activeTab, navigate, location.pathname, location.hash, defaultHash]);

  const goTo = (hash) => {
    setActiveTab(hash);
    navigate({ pathname: location.pathname, hash }, { replace: false });
    requestAnimationFrame(() => scrollToHash(hash));
  };

  return (
    <>


      {/* DESKTOP */}
      <aside className="hidden md:block w-[260px] mt-4 bg-white p-3">
        <nav className="flex flex-col gap-1">
          {links.map((item) => {
            const isActive = activeTab === item.to;
            return (
              <button
                key={item.to}
                type="button"
                onClick={() => goTo(item.to)}
                className={[
                  "w-full text-left cursor-pointer px-4 py-3 rounded-md font-medium transition-all",
                  isActive
                    ? "bg-[#F3F3F3] text-[#6B7280]"
                    : "text-[#6B7280] hover:bg-[#F5F5F5]",
                ].join(" ")}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
