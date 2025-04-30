
import React from 'react';
import { Button } from '@/components/ui/button';
import LivesDisplay from '@/components/LivesDisplay';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get last accessed course from localStorage
  const getLastAccessedCourse = () => {
    const storedCourses = localStorage.getItem('courses');
    if (!storedCourses) return null;
    
    const courses = JSON.parse(storedCourses);
    
    // Find the last started course, if any
    const startedCourses = courses.filter((course: any) => course.isStarted);
    if (startedCourses.length === 0) return null;
    
    // If multiple courses are started, choose the one with the least progress
    // (assuming the user wants to focus on completing one course at a time)
    const sortedCourses = startedCourses.sort((a: any, b: any) => a.progress - b.progress);
    return sortedCourses[0];
  };
  
  const handleStartLearning = () => {
    const lastCourse = getLastAccessedCourse();
    
    if (lastCourse) {
      // Navigate to the specific course
      navigate(`/course/${lastCourse.id}`);
    } else {
      // Navigate to the courses page if no course has been started
      navigate('/courses');
      toast({
        title: "Nenhum curso iniciado",
        description: "Escolha um curso para começar a aprender."
      });
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Aprenda com <span className="text-gradient">QuestLessons</span>
            </h1>
            <p className="mt-6 text-center text-lg text-gray-600">
              Transforme seu aprendizado em uma aventura gamificada.
              Comece agora e desbloqueie seu potencial!
            </p>
            <div className="mt-8 flex justify-center">
              <Button onClick={handleStartLearning} size="lg">
                Iniciar Aprendizado
              </Button>
            </div>
            <div className="mt-4 flex justify-center">
              <LivesDisplay />
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="flex-1 bg-gray-50 px-6 py-12 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold text-center mb-8">Como funciona</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-brand-purple flex items-center mb-2">
                  <span className="bg-brand-purple text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">1</span>
                  Escolha um curso
                </div>
                <p className="text-gray-600">
                  Navegue pelos cursos disponíveis e escolha o que melhor se adapta às suas necessidades.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-brand-purple flex items-center mb-2">
                  <span className="bg-brand-purple text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">2</span>
                  Avance pelas lições
                </div>
                <p className="text-gray-600">
                  Complete lições, ganhe pontos e avance nos cursos conforme seu ritmo de aprendizado.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-brand-purple flex items-center mb-2">
                  <span className="bg-brand-purple text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">3</span>
                  Mantenha suas vidas
                </div>
                <p className="text-gray-600">
                  Suas vidas são restauradas diariamente. Aproveite ao máximo e evite errar para não perdê-las.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 QuestLessons. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
