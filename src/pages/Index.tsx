
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Edit3, MessageSquare, FileText, Users, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleChoiceQuiz = () => navigate("/choice-quiz");
  const handleBlankQuiz = () => navigate("/blank-quiz");
  const handleScenarioQuiz = () => navigate("/scenario-quiz");
  const handleAdjectiveQuiz = () => navigate("/adjective-quiz");
  const handleGivingReceivingQuiz = () => navigate("/giving-receiving-quiz");
  const handleAuxiliaryVerbQuiz = () => navigate("/auxiliary-verb-quiz");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <LanguageSwitcher />
      
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-center">{t('siteTitle')}</h1>
        <p className="text-muted-foreground text-center mb-8">{t('chooseMode')}</p>
        
        <div className="space-y-4">
          <Button 
            onClick={handleChoiceQuiz} 
            variant="default" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <BookOpen className="mr-3 h-6 w-6" />
            {t('particleChoice')}
          </Button>
          
          <Button 
            onClick={handleBlankQuiz} 
            variant="outline" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <Edit3 className="mr-3 h-6 w-6" />
            {t('particleFillBlank')}
          </Button>

          <Button 
            onClick={handleScenarioQuiz} 
            variant="secondary" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <MessageSquare className="mr-3 h-6 w-6" />
            {t('scenarioPractice')}
          </Button>

          <Button 
            onClick={handleAdjectiveQuiz} 
            variant="outline" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <FileText className="mr-3 h-6 w-6" />
            {t('adjectivePractice')}
          </Button>

          <Button 
            onClick={handleGivingReceivingQuiz} 
            variant="secondary" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <Users className="mr-3 h-6 w-6" />
            {t('givingReceivingPractice')}
          </Button>

          <Button 
            onClick={handleAuxiliaryVerbQuiz} 
            variant="outline" 
            size="lg" 
            className="w-full h-16 text-lg"
          >
            <Zap className="mr-3 h-6 w-6" />
            {t('auxiliaryVerbPractice')}
          </Button>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-muted-foreground text-center max-w-lg">
        <p>{t('practiceDescription')}</p>
        <p className="mt-2">{t('modeExplanation')}</p>
        <p className="mt-2">{t('adjectiveExplanation')}</p>
        <p className="mt-2">{t('givingReceivingExplanation')}</p>
        <p className="mt-2">{t('auxiliaryVerbExplanation')}</p>
      </div>
    </div>
  );
};

export default Index;
