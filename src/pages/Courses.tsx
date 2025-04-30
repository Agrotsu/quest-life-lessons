
import React, { useState, useEffect } from 'react';
import CourseCard, { Course } from '@/components/CourseCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import LivesDisplay from '@/components/LivesDisplay';

// Mock data for courses
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introdução à Programação',
    description: 'Aprenda os fundamentos da programação com exemplos práticos e atividades interativas.',
    level: 'iniciante',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=500&auto=format&fit=crop',
    progress: 0
  },
  {
    id: '2',
    title: 'Web Design Responsivo',
    description: 'Crie sites que se adaptam a qualquer dispositivo. Do desktop ao mobile, suas páginas ficarão perfeitas.',
    level: 'intermediario',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=500&auto=format&fit=crop',
    progress: 0
  },
  {
    id: '3',
    title: 'Inteligência Artificial',
    description: 'Explore os fundamentos da IA e aprenda a criar sistemas inteligentes e algoritmos de machine learning.',
    level: 'avancado',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad495?q=80&w=500&auto=format&fit=crop',
    progress: 0
  },
  {
    id: '4',
    title: 'Desenvolvimento Mobile',
    description: 'Crie aplicativos para iOS e Android utilizando as tecnologias mais modernas do mercado.',
    level: 'intermediario',
    image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=500&auto=format&fit=crop',
    progress: 0
  },
  {
    id: '5',
    title: 'Banco de Dados SQL',
    description: 'Aprenda a criar e gerenciar bancos de dados relacionais utilizando SQL.',
    level: 'iniciante',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=500&auto=format&fit=crop',
    progress: 0
  },
  {
    id: '6',
    title: 'DevOps & Cloud Computing',
    description: 'Entenda como implementar pipelines de CI/CD e gerenciar infraestruturas em nuvem.',
    level: 'avancado',
    image: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=500&auto=format&fit=crop',
    progress: 0
  }
];

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [startedCourses, setStartedCourses] = useState<Course[]>([]);
  const [notStartedCourses, setNotStartedCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    // Load courses from localStorage if they exist
    const storedCourses = localStorage.getItem('courses');
    
    if (storedCourses && JSON.parse(storedCourses).length > 0) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses(parsedCourses);
    } else {
      // Initialize with mock courses if no courses exist in localStorage
      localStorage.setItem('courses', JSON.stringify(mockCourses));
      setCourses(mockCourses);
    }
  }, []);
  
  useEffect(() => {
    // Filter courses into started and not started
    const started = courses.filter(course => course.isStarted);
    const notStarted = courses.filter(course => !course.isStarted);
    
    setStartedCourses(started);
    setNotStartedCourses(notStarted);
  }, [courses]);
  
  const handleStartCourse = (courseId: string) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId && !course.isStarted) {
        return {
          ...course,
          isStarted: true,
          progress: 0 // Initialize progress
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
          <LivesDisplay />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="started">Iniciados</TabsTrigger>
            <TabsTrigger value="notStarted">Não Iniciados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onStartCourse={handleStartCourse} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="started">
            {startedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {startedCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onStartCourse={handleStartCourse} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Você ainda não iniciou nenhum curso.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="notStarted">
            {notStartedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notStartedCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onStartCourse={handleStartCourse} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Todos os cursos já foram iniciados.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;
