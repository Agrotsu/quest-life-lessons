
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, we would validate credentials against the backend
    // For this demo, we'll simulate a successful login by storing a user object in localStorage
    const user = {
      id: '1',
      name: 'Usuário Demo',
      email: 'demo@example.com'
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    
    // Initialize courses and lives data in localStorage
    if (!localStorage.getItem('courses')) {
      localStorage.setItem('courses', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('lives')) {
      const lives = {
        count: 3,
        lastReset: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
      };
      localStorage.setItem('lives', JSON.stringify(lives));
    }
    
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo de volta."
    });
    
    // Reload the page to reflect logged in state
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="seu@email.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" placeholder="********" required />
      </div>
      <Button type="submit" className="w-full">Entrar</Button>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">Não tem uma conta? </span>
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-brand-purple hover:underline focus:outline-none"
        >
          Cadastre-se
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
