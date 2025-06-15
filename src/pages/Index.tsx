
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Edit3 } from "lucide-react";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleChoiceQuiz = () => navigate("/choice-quiz");
  const handleBlankQuiz = () => navigate("/blank-quiz");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">日文助詞練習網站</h1>
        <p className="text-muted-foreground text-center mb-8">選擇練習模式</p>
        
        <div className="space-y-4">
          <Button 
            onClick={handleChoiceQuiz} 
            variant="default" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <BookOpen className="mr-3 h-6 w-6" />
            助詞練習題（選擇題）
          </Button>
          
          <Button 
            onClick={handleBlankQuiz} 
            variant="outline" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <Edit3 className="mr-3 h-6 w-6" />
            助詞練習題（填充題）
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground text-center">
        <p>練習日文助詞的使用方法</p>
        <p>選擇題有標準答案，填充題為自由練習</p>
      </div>
    </div>
  );
};

export default Index;
