"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useThemeStore } from "@/lib/stores/theme-store";
import {
  useFilterStore,
  Category,
  syncFiltersFromURL,
  AVAILABLE_COUNTRIES,
} from "@/lib/stores/filter-store";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronDown, LogOut, User } from "lucide-react";
import SearchDialog from "./search-dialog";
import { useStore } from "@/store/user-store";

export default function Navbar() {
  const pathname = usePathname();
  const { backgroundColor } = useThemeStore();
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [creatorsOpen, setCreatorsOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const creatorsRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { userData, isAuthenticated, logout } = useStore();
  const userDisplayName = userData?.displayName || userData?.fullName || "";
  const userInitial =
    userDisplayName?.charAt(0)?.toUpperCase() ||
    userData?.email?.charAt(0)?.toUpperCase() ||
    "U";
  const userProfileImage = userData?.profileImage;

  const { country, category, setCountry, setCategory } = useFilterStore();

  const categories: Category[] = [
    "COMEDY",
    "LIFESTYLE",
    "TECH",
    "MUSIC",
    "GAMING",
    "BUSINESS",
    "EDUCATION",
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        creatorsRef.current &&
        !creatorsRef.current.contains(event.target as Node)
      ) {
        setCreatorsOpen(false);
      }
      if (
        videosRef.current &&
        !videosRef.current.contains(event.target as Node)
      ) {
        setVideosOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync filters from URL on mount
  useEffect(() => {
    syncFiltersFromURL();
  }, []);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const difference = latest - lastScrollY;

    // Close dropdowns and mobile menu on scroll
    if (creatorsOpen || videosOpen || mobileMenuOpen || profileOpen) {
      setCreatorsOpen(false);
      setVideosOpen(false);
      setMobileMenuOpen(false);
      setProfileOpen(false);
    }

    // Hide when scrolling down past 100px
    if (latest > 100 && difference > 0) {
      setHidden(true);
    }
    // Show when scrolling up even slightly (5px)
    else if (difference < -5) {
      setHidden(false);
    }

    setLastScrollY(latest);
  });

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <motion.nav
      className="w-full transition-colors duration-1000 fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor }}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 desktop:px-14">
        <div className="flex items-center justify-between py-6">
          {/* Mobile Menu Button - Left on Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden h-[36px] w-[36px] rounded-md !text-white flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          <div className="lg:hidden">
            {/* Logo - Centered on Mobile */}
            <Link
              href="/"
              className="w-[160px] h-[25px] md:w-[220px] md:h-[34px] lg:w-[250px] lg:h-[39px] relative block"
            >
              <Image
                src="/c92443c27a28162617afdb8db0f8fd1536e11ea0.png"
                alt="CreatorCharts"
                fill
                className="object-contain"
              />
            </Link>
          </div>

          {/* Left Section: Logo and Navigation */}
          <div className="hidden lg:flex items-center gap-8 md:gap-16 lg:gap-24">
            {/* Logo - Centered on Mobile */}
            <Link
              href="/"
              className="w-[160px] h-[25px] md:w-[220px] md:h-[34px] lg:w-[250px] lg:h-[39px] relative block"
            >
              <Image
                src="/c92443c27a28162617afdb8db0f8fd1536e11ea0.png"
                alt="CreatorCharts"
                fill
                className="object-contain"
              />
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-4 lg:gap-6 text-white text-[15px] lg:text-[17px] font-semibold">
              <Link
                href="/"
                className={`hover:opacity-80 transition-all relative ${
                  isActive("/") && pathname === "/" ? "text-[#22c55e]" : ""
                }`}
              >
                Charts
                {isActive("/") && pathname === "/" && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22c55e]"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>

              {/* Creators Dropdown */}
              <div className="relative" ref={creatorsRef}>
                <motion.button
                  onClick={() => {
                    setCreatorsOpen(!creatorsOpen);
                    setVideosOpen(false);
                  }}
                  className={`flex items-center gap-2 hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md px-2 py-1 relative ${
                    isActive("/creators") ? "text-[#22c55e]" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Creators
                  <motion.div
                    animate={{ rotate: creatorsOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                  {isActive("/creators") && (
                    <motion.div
                      className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#22c55e]"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
                <AnimatePresence>
                  {creatorsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-[#1a1d1f] border border-white/20 rounded-lg py-2 min-w-[240px] shadow-xl z-50"
                    >
                      <Link
                        href="/creators/top"
                        className="block px-4 py-3 hover:bg-white/10 transition-colors text-base text-white/90 hover:text-white"
                        onClick={() => setCreatorsOpen(false)}
                      >
                        Top 100 Creators
                      </Link>
                      <Link
                        href="/creators/trending"
                        className="block px-4 py-3 hover:bg-white/10 transition-colors text-base text-white/90 hover:text-white"
                        onClick={() => setCreatorsOpen(false)}
                      >
                        Trending Creators
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Videos Dropdown */}
              <div className="relative" ref={videosRef}>
                <motion.button
                  onClick={() => {
                    setVideosOpen(!videosOpen);
                    setCreatorsOpen(false);
                  }}
                  className={`flex items-center gap-2 hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-white/20 rounded-md px-2 py-1 relative ${
                    isActive("/videos") ? "text-[#22c55e]" : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Videos
                  <motion.div
                    animate={{ rotate: videosOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                  {isActive("/videos") && (
                    <motion.div
                      className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#22c55e]"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
                <AnimatePresence>
                  {videosOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 bg-[#1a1d1f] border border-white/20 rounded-lg py-2 min-w-[240px] shadow-xl z-50"
                    >
                      <Link
                        href="/videos/top"
                        className="block px-4 py-3 hover:bg-white/10 transition-colors text-base text-white/90 hover:text-white"
                        onClick={() => setVideosOpen(false)}
                      >
                        Top 100 Videos
                      </Link>
                      <Link
                        href="/videos/viral"
                        className="block px-4 py-3 hover:bg-white/10 transition-colors text-base text-white/90 hover:text-white"
                        onClick={() => setVideosOpen(false)}
                      >
                        Viral Videos
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Annual Rankings */}
              <Link
                href="/annual-rankings"
                className={`hover:opacity-80 transition-all relative ${
                  isActive("/annual-rankings") ? "text-[#22c55e]" : ""
                }`}
              >
                Annual Rankings
                {isActive("/annual-rankings") && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#22c55e]"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </div>
          </div>

          {/* Right Section: Filters, Search, Login */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Country Select - Hidden on mobile */}
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="hidden lg:flex h-[36px] md:h-[40px] bg-white/10 border-white/20 text-white hover:bg-white/15 min-w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d1f] border-white/20 max-h-[300px]">
                {AVAILABLE_COUNTRIES.map((countryName) => (
                  <SelectItem
                    key={countryName}
                    value={countryName}
                    className="text-white hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                  >
                    {countryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Select - Hidden on mobile */}
            {/* <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="hidden lg:flex h-[36px] md:h-[40px] bg-white/10 border-white/20 text-white hover:bg-white/15 min-w-[110px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1d1f] border-white/20">
                {categories.map((categoryOption) => (
                  <SelectItem
                    key={categoryOption}
                    value={categoryOption}
                    className="text-white hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                  >
                    {categoryOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            <button
              // variant="ghost"
              // size="lg"
              onClick={() => setSearchOpen(true)}
              className="h-7.5! w-7.5! md:h-[40px] md:w-[40px] rounded-md !text-white lg:bg-white/10 hover:text-white lg:hover:bg-white/15 flex items-center justify-center"
            >
              <Search className="w-7 h-7 lg:w-5 lg:h-5" />
            </button>

            {isAuthenticated && userData ? (
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 h-[40px] rounded-full bg-white/10 hover:bg-white/15 pl-1 pr-3 transition-colors"
                >
                  {userProfileImage ? (
                    <Image
                      src={userProfileImage}
                      alt={userDisplayName}
                      width={32}
                      height={32}
                      className="rounded-full object-cover w-8 h-8"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-white text-sm font-bold">
                      {userInitial}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-white/70" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 bg-[#1a1d1f] border border-white/20 rounded-lg py-2 min-w-[200px] shadow-xl z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white text-sm font-medium truncate">
                          {userDisplayName}
                        </p>
                        <p className="text-white/60 text-xs truncate">
                          {userData.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/10 transition-colors text-red-400 hover:text-red-300 text-sm"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/sign-in" className="hidden md:block">
                <button className="h-[36px] md:h-[40px] bg-[var(--primary-colour,#14532d)] hover:bg-[#14532d]/90 rounded-lg px-4 md:px-6 text-white text-sm md:text-base font-semibold transition-colors border border-transparent flex items-center justify-center">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor }}
            className="lg:hidden border-t border-white/20  overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className={`block py-2 text-white text-base font-semibold hover:text-[#22c55e] transition-colors ${
                  pathname === "/" ? "text-[#22c55e]" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Charts
              </Link>

              <div className="space-y-2">
                <div className="text-white text-base font-semibold py-2">
                  Creators
                </div>
                <Link
                  href="/creators/top"
                  className="block py-2 pl-4 text-white/80 text-sm hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Top 100 Creators
                </Link>
                <Link
                  href="/creators/trending"
                  className="block py-2 pl-4 text-white/80 text-sm hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trending Creators
                </Link>
              </div>

              <div className="space-y-2">
                <div className="text-white text-base font-semibold py-2">
                  Videos
                </div>
                <Link
                  href="/videos/top"
                  className="block py-2 pl-4 text-white/80 text-sm hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Top 100 Videos
                </Link>
                <Link
                  href="/videos/viral"
                  className="block py-2 pl-4 text-white/80 text-sm hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trending Videos
                </Link>
              </div>

              <Link
                href="/annual-rankings"
                className={`block py-2 text-white text-base font-semibold hover:text-[#22c55e] transition-colors ${
                  isActive("/annual-rankings") ? "text-[#22c55e]" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Annual Rankings
              </Link>

              {isAuthenticated && userData ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full h-[44px] flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-lg px-6 text-white text-base font-semibold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <button className="w-full h-[44px] bg-[var(--primary-colour,#14532d)] hover:bg-[#14532d]/90 rounded-lg px-6 text-white text-base font-semibold transition-colors">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </motion.nav>
  );
}
