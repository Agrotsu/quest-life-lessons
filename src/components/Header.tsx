
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Check if user is logged in (from localStorage)
  const isLoggedIn = localStorage.getItem('user') !== null;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('courses');
    localStorage.removeItem('lives');
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gradient">QuestLessons</Link>
          </div>
          
          {/* Mobile menu button */}
          {isMobile && (
            <div className="flex items-center">
              <button 
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-brand-purple focus:outline-none"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          )}
          
          {/* Desktop navigation */}
          {!isMobile && (
            <nav className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-brand-purple px-3 py-2 font-medium">Início</Link>
              <Link to="/courses" className="text-gray-700 hover:text-brand-purple px-3 py-2 font-medium">Cursos</Link>
              {isLoggedIn && (
                <Link to="/profile" className="text-gray-700 hover:text-brand-purple px-3 py-2 font-medium">Perfil</Link>
              )}
            </nav>
          )}
          
          <div className="flex items-center">
            {isLoggedIn ? (
              <Button onClick={handleLogout} variant="outline" className="ml-4">Sair</Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default">Entrar</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {authMode === 'login' ? 'Entrar' : 'Criar Conta'}
                    </DialogTitle>
                  </DialogHeader>
                  {authMode === 'login' ? (
                    <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
                  ) : (
                    <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-in">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/courses" 
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Cursos
            </Link>
            {isLoggedIn && (
              <Link 
                to="/profile" 
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Perfil
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
