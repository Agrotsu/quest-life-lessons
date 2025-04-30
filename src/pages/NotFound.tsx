
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="text-center p-4">
        <h1 className="text-6xl font-bold text-brand-purple mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Ops! Página não encontrada</p>
        <div className="text-gray-500 mb-8">
          A página que você está procurando pode ter sido removida, 
          renomeada ou está temporariamente indisponível.
        </div>
        <Button onClick={() => navigate('/')}>
          Retornar à página inicial
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
