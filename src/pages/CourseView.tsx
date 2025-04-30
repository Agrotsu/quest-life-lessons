
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LivesDisplay from '@/components/LivesDisplay';
import { useToast } from '@/components/ui/use-toast';
import { type Course } from '@/components/CourseCard';

// Dummy course content
const lessonContent = [
  {
    title: "Introdução",
    content: "Bem-vindo ao curso! Nesta aula, vamos explorar os conceitos básicos.",
    question: "Qual é o principal objetivo deste curso?",
    options: [
      "Aprender programação avançada",
      "Entender os conceitos básicos",
      "Criar aplicativos complexos",
      "Nenhuma das opções acima"
    ],
    correctAnswer: 1
  },
  {
    title: "Conceitos Fundamentais",
    content: "Agora vamos aprofundar nos conceitos fundamentais que você precisa dominar.",
    question: "Qual destes é um conceito fundamental?",
    options: [
      "Debugging avançado",
      "Otimização de banco de dados",
      "Estruturas de dados",
      "Desenvolvimento de microserviços"
    ],
    correctAnswer: 2
  },
  {
    title: "Aplicação Prática",
    content: "Vamos colocar em prática o que aprendemos até agora com um exercício.",
    question: "Qual é a melhor abordagem para aplicar o conhecimento adquirido?",
    options: [
      "Ler mais conteúdo teórico",
      "Fazer exercícios práticos",
      "Assistir mais vídeos",
      "Discutir com outros alunos"
    ],
    correctAnswer: 1
  }
];

const CourseView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [lives, setLives] = useState<{ count: number; lastReset: string } | null>(null);
  
  // Load course data and progress
  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    const storedLives = localStorage.getItem('lives');
    
    if (storedCourses && courseId) {
      const courses = JSON.parse(storedCourses);
      const foundCourse = courses.find((c: Course) => c.id === courseId);
      
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        // Course not found, redirect to courses page
        navigate('/courses');
        toast({
          title: "Curso não encontrado",
          description: "O curso solicitado não foi encontrado."
        });
      }
    }
    
    if (storedLives) {
      setLives(JSON.parse(storedLives));
    }
  }, [courseId, navigate, toast]);
  
  // Update course progress
  const updateCourseProgress = () => {
    if (!course) return;
    
    // Calculate progress based on current lesson
    const totalLessons = lessonContent.length;
    const newProgress = Math.round(((currentLessonIndex + 1) / totalLessons) * 100);
    
    const updatedCourse = {
      ...course,
      isStarted: true,
      progress: newProgress
    };
    
    // Update course in localStorage
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
      const courses = JSON.parse(storedCourses);
      const updatedCourses = courses.map((c: Course) => {
        if (c.id === course.id) {
          return updatedCourse;
        }
        return c;
      });
      
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourse(updatedCourse);
    }
  };
  
  // Update lives count
  const updateLives = (decrease: boolean) => {
    if (!lives) return;
    
    const updatedLives = {
      ...lives,
      count: decrease ? Math.max(0, lives.count - 1) : lives.count
    };
    
    localStorage.setItem('lives', JSON.stringify(updatedLives));
    setLives(updatedLives);
    
    if (decrease && updatedLives.count === 0) {
      toast({
        title: "Sem vidas restantes!",
        description: "Você ficou sem vidas. Volte amanhã para tentar novamente.",
        variant: "destructive"
      });
      
      setTimeout(() => {
        navigate('/courses');
      }, 3000);
    }
  };
  
  const handleOptionSelect = (optionIndex: number) => {
    if (answerSubmitted) return;
    setSelectedOption(optionIndex);
  };
  
  const handleSubmitAnswer = () => {
    if (selectedOption === null || answerSubmitted) return;
    
    const currentLesson = lessonContent[currentLessonIndex];
    const isCorrect = selectedOption === currentLesson.correctAnswer;
    
    setAnswerSubmitted(true);
    
    if (isCorrect) {
      toast({
        title: "Resposta correta!",
        description: "Parabéns, você acertou!",
      });
    } else {
      toast({
        title: "Resposta incorreta",
        description: "Tente novamente na próxima questão.",
        variant: "destructive"
      });
      
      // Decrease lives count
      updateLives(true);
    }
  };
  
  const handleNextLesson = () => {
    if (currentLessonIndex < lessonContent.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setSelectedOption(null);
      setAnswerSubmitted(false);
      updateCourseProgress();
    } else {
      // Course completed
      updateCourseProgress();
      toast({
        title: "Curso concluído!",
        description: "Parabéns, você completou este curso!"
      });
      
      setTimeout(() => {
        navigate('/courses');
      }, 3000);
    }
  };
  
  if (!course) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse-gentle mb-4">Carregando...</div>
        </div>
      </div>
    );
  }
  
  const currentLesson = lessonContent[currentLessonIndex];

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <div className="text-sm text-muted-foreground">
              Lição {currentLessonIndex + 1} de {lessonContent.length}
            </div>
          </div>
          <LivesDisplay />
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{currentLesson.title}</h2>
          <p className="text-gray-700 mb-8">{currentLesson.content}</p>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">{currentLesson.question}</h3>
            
            <div className="space-y-3">
              {currentLesson.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={`p-4 border rounded-md cursor-pointer transition-colors
                    ${selectedOption === index ? 'border-brand-purple bg-purple-50' : 'border-gray-200 hover:border-gray-300'}
                    ${answerSubmitted && index === currentLesson.correctAnswer ? 'border-green-500 bg-green-50' : ''}
                    ${answerSubmitted && selectedOption === index && index !== currentLesson.correctAnswer ? 'border-red-500 bg-red-50' : ''}
                  `}
                >
                  {option}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/courses')}
              >
                Voltar aos cursos
              </Button>
              
              {!answerSubmitted ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                >
                  Verificar resposta
                </Button>
              ) : (
                <Button onClick={handleNextLesson}>
                  {currentLessonIndex < lessonContent.length - 1 ? 'Próxima lição' : 'Finalizar curso'}
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-brand-purple h-2 rounded-full transition-all duration-300" 
            style={{ 
              width: `${((currentLessonIndex + (answerSubmitted ? 1 : 0)) / lessonContent.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
