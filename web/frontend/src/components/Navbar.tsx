import React, { useState, useEffect } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { BRAND } from '../branding'
import { smoothScrollTo } from '../lib/animations'

const logo = '/assets/logo.png'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#about', label: 'About Us' },
    { 
      href: '#services', 
      label: 'Services',
      dropdown: [
        { href: '#services', label: 'All Services' },
        { href: '#services', label: 'Web Development' },
        { href: '#services', label: 'DevOps & CI/CD' },
        { href: '#services', label: 'Cloud Migration' },
        { href: '#services', label: 'Cybersecurity' },
        { href: '#services', label: 'Support & Monitoring' },
      ]
    },
    { href: '#leadership', label: 'Team' },
    { href: '#resources', label: 'Resources' },
  ]

  const handleNavClick = (href: string) => {
    smoothScrollTo(href)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-secondary-900 text-white py-2 px-4 hidden lg:block">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="w-4 h-4" />
              <span>{BRAND.company.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4" />
              <span>{BRAND.company.phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="status-dot status-online"></div>
            <span>Available for new projects</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-large border-b border-secondary-100' 
          : 'bg-white/90 backdrop-blur-sm border-b border-secondary-50'
      }`}>
        <nav className="container">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <a 
              href="#" 
              className="flex items-center gap-3 font-bold text-xl lg:text-2xl text-secondary-900 hover:text-primary-600 transition-colors group"
              onClick={(e) => {
                e.preventDefault()
                smoothScrollTo('#')
              }}
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="logo" 
                  className="w-10 h-10 lg:w-12 lg:h-12 transition-transform group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-gradient font-display">
                {BRAND.siteName}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  <button
                    onClick={() => handleNavClick(link.href)}
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="flex items-center gap-1 text-secondary-600 hover:text-primary-600 font-medium transition-colors py-2 relative"
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDownIcon className={`w-4 h-4 transition-transform ${
                        activeDropdown === link.label ? 'rotate-180' : ''
                      }`} />
                    )}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                  </button>

                  {/* Dropdown */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-large border border-secondary-100 py-2 animate-fade-in-up"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.dropdown.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className="block w-full text-left px-4 py-3 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Contact CTA */}
              <button
                onClick={() => handleNavClick('#contact')}
                className="btn btn-primary ml-4"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-secondary-600 hover:text-primary-600 transition-colors rounded-xl hover:bg-primary-50"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-secondary-100 bg-white/98 backdrop-blur-xl animate-slide-down">
              <div className="py-6 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center justify-between w-full px-4 py-4 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 transition-colors rounded-xl mx-2 font-medium"
                    >
                      {link.label}
                      {link.dropdown && <ChevronDownIcon className="w-4 h-4" />}
                    </button>
                    
                    {/* Mobile dropdown */}
                    {link.dropdown && (
                      <div className="ml-4 pl-4 border-l-2 border-secondary-100 space-y-1">
                        {link.dropdown.map((item) => (
                          <button
                            key={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className="block w-full text-left px-4 py-2 text-secondary-600 hover:text-primary-600 transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Mobile contact info */}
                <div className="pt-6 mt-6 border-t border-secondary-100 mx-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-secondary-600">
                      <EnvelopeIcon className="w-5 h-5" />
                      <span className="text-sm">{BRAND.company.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-secondary-600">
                      <PhoneIcon className="w-5 h-5" />
                      <span className="text-sm">{BRAND.company.phone}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="btn btn-primary w-full"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
