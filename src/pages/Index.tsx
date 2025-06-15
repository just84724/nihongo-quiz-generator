
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BookOpen, Edit3, MessageSquare, FileText, Users, Zap, Languages, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const practiceItems = [
    {
      title: t('particleChoice'),
      description: t('practiceDescription'),
      icon: BookOpen,
      onClick: () => navigate("/choice-quiz"),
      variant: "default" as const,
      color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: t('particleFillBlank'),
      description: t('modeExplanation'),
      icon: Edit3,
      onClick: () => navigate("/blank-quiz"),
      variant: "outline" as const,
      color: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      title: t('scenarioPractice'),
      description: t('modeExplanation'),
      icon: MessageSquare,
      onClick: () => navigate("/scenario-quiz"),
      variant: "secondary" as const,
      color: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      title: t('adjectivePractice'),
      description: t('adjectiveExplanation'),
      icon: FileText,
      onClick: () => navigate("/adjective-quiz"),
      variant: "outline" as const,
      color: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
      iconColor: "text-orange-600 dark:text-orange-400"
    },
    {
      title: t('givingReceivingPractice'),
      description: t('givingReceivingExplanation'),
      icon: Users,
      onClick: () => navigate("/giving-receiving-quiz"),
      variant: "secondary" as const,
      color: "bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800",
      iconColor: "text-pink-600 dark:text-pink-400"
    },
    {
      title: t('auxiliaryVerbPractice'),
      description: t('auxiliaryVerbExplanation'),
      icon: Zap,
      onClick: () => navigate("/auxiliary-verb-quiz"),
      variant: "outline" as const,
      color: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
      iconColor: "text-yellow-600 dark:text-yellow-400"
    },
    {
      title: t('translationPractice'),
      description: t('translationExplanation'),
      icon: Languages,
      onClick: () => navigate("/translation-quiz"),
      variant: "secondary" as const,
      color: "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <LanguageSwitcher />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            {t('siteTitle')}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-2">
            {t('siteDescription')}
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {t('chooseMode')}
          </p>
        </div>

        {/* Practice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {practiceItems.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl border-2 ${item.color} hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer`}
              onClick={item.onClick}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm ${item.iconColor}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-lg leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Bottom Info Section */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              準備開始您的日語學習之旅
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
