import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { APP_TITLE, APP_SUBTITLE, NAV_ITEMS } from '@shared/const';

export function Navigation() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { language } = useLanguage();
  
  const navItems = NAV_ITEMS.map(item => ({
    label: typeof item.label === 'string' ? item.label : item.label[language],
    path: item.path
  }));

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-xl font-bold gradient-text">{APP_TITLE}</span>
              <span className="text-xs text-muted-foreground">{APP_SUBTITLE}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? 'secondary' : 'ghost'}
                  size="sm"
                  className="text-sm"
                  asChild
                >
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side: Language Switcher */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 fade-in">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={location === item.path ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                  >
                    {item.label}
                  </Button>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

