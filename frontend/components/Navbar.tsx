"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  InformationCircleIcon,
  WrenchScrewdriverIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  const navItems = [
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/about", label: "Who We Are", icon: InformationCircleIcon },
    { href: "/services", label: "Services", icon: WrenchScrewdriverIcon },
    { href: "/contact", label: "Contact", icon: EnvelopeIcon },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50"
      style={{
        backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
        borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb'
      }}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/assets/MedicareLogoNavbar.png" 
                alt="MediCare Hub" 
                width={60} 
                height={60}
                className="rounded-lg"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className="flex items-center space-x-2 font-medium transition-colors duration-200 group"
                    style={{
                      color: theme === 'dark' ? '#d1d5db' : '#374151'
                    }}
                  >
                    <IconComponent 
                      className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                      style={{
                        color: theme === 'dark' ? '#d1d5db' : '#374151'
                      }}
                    />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button 
                className="p-2 rounded-lg transition-colors duration-200"
                style={{
                  color: theme === 'dark' ? '#d1d5db' : '#374151'
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button 
              className="p-2 rounded-lg transition-colors duration-200"
              style={{
                color: theme === 'dark' ? '#d1d5db' : '#374151'
              }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              style={{
                backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
                borderTop: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb'
              }}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200"
                        style={{
                          color: theme === 'dark' ? '#d1d5db' : '#374151'
                        }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent 
                          className="w-5 h-5" 
                          style={{
                            color: theme === 'dark' ? '#d1d5db' : '#374151'
                          }}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
} 