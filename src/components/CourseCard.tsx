
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'iniciante' | 'intermediario' | 'avancado';
  image: string;
  isStarted?: boolean;
  progress?: number;
}

interface CourseCardProps {
  course: Course;
  onStartCourse: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onStartCourse }) => {
  const navigate = useNavigate();
  
  const getLevelColor = () => {
    switch (course.level) {
      case 'iniciante':
        return 'bg-green-100 text-green-800';
      case 'intermediario':
        return 'bg-yellow-100 text-yellow-800';
      case 'avancado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handlePlay = () => {
    onStartCourse(course.id);
    navigate(`/course/${course.id}`);
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getLevelColor()}`}>
            {course.level === 'iniciante' ? 'Iniciante' : 
             course.level === 'intermediario' ? 'Intermediário' : 'Avançado'}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{course.title}</h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        
        {course.isStarted && course.progress !== undefined && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Progresso</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-brand-purple h-2 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Informações</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{course.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <Badge className={`${getLevelColor()}`}>
                {course.level === 'iniciante' ? 'Iniciante' : 
                course.level === 'intermediario' ? 'Intermediário' : 'Avançado'}
              </Badge>
              <p className="text-sm">{course.description}</p>
              
              {course.isStarted && course.progress !== undefined && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span>Progresso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-purple h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <Button onClick={handlePlay} className="w-full">
                {course.isStarted ? 'Continuar' : 'Iniciar'}
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button onClick={handlePlay}>
          {course.isStarted ? 'Continuar' : 'Iniciar'}
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
