
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LivesDisplay from '@/components/LivesDisplay';
import { useNavigate } from 'react-router-dom';
import { Course } from '@/components/CourseCard';

interface User {
  id: string;
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [coursesStarted, setCoursesStarted] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const storedCourses = localStorage.getItem('courses');
    
    if (!storedUser) {
      navigate('/');
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    if (storedCourses) {
      const courses = JSON.parse(storedCourses) as Course[];
      setTotalCourses(courses.length);
      
      const started = courses.filter(course => course.isStarted).length;
      const completed = courses.filter(course => course.progress === 100).length;
      
      setCoursesStarted(started);
      setCoursesCompleted(completed);
    }
  }, [navigate]);
  
  if (!user) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-gentle mb-4">Carregando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Perfil</h1>
          <LivesDisplay />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cursos Iniciados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coursesStarted}</div>
              <p className="text-xs text-muted-foreground">
                de {totalCourses} disponíveis
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{coursesCompleted}</div>
              <p className="text-xs text-muted-foreground">
                de {coursesStarted} iniciados
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Dias consecutivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">
                Continue aprendendo!
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Informações do Usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nome</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{user.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de perigo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600 mb-4">
              As seguintes ações não podem ser desfeitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="destructive" 
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('courses');
                  localStorage.removeItem('lives');
                  navigate('/');
                }}
              >
                Limpar todos os dados
              </Button>
              
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700" 
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/');
                }}
              >
                Sair da conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
