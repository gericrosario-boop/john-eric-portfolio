'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const enabled = stored === 'dark';
    document.documentElement.classList.toggle('dark', enabled);
    setDark(enabled);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
