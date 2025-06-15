import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// 選擇題型別定義
type ChoiceQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

type UserChoiceAnswer = {
  questionId: number;
  question: string;
  userChoice: string;
  correctAnswer: string;
  isCorrect: boolean;
};

// 選擇題題庫（增加到15題）
const choiceQuestions: ChoiceQuestion[] = [
  {
    id: 1,
    question: "新しいパソコン（＿）欲しい",
    options: ["A が", "B で", "C に", "D を"],
    answer: "A が"
  },
  {
    id: 2,
    question: "あそこ（＿）白いビル（＿）あります",
    options: ["A に、が", "B で、は", "C が、に", "D を、で"],
    answer: "A に、が"
  },
  {
    id: 3,
    question: "彼女と銀行の前（＿）会いました",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で"
  },
  {
    id: 4,
    question: "友達は日曜日に家（＿）来ました",
    options: ["A が", "B で", "C に", "D を"],
    answer: "C に"
  },
  {
    id: 5,
    question: "電子レンジ（＿）肉饅を温める",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で"
  },
  {
    id: 6,
    question: "動物の中（＿）鼠が一番嫌いです",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で"
  },
  {
    id: 7,
    question: "これは皆（＿）頑張った結果です",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で"
  },
  {
    id: 8,
    question: "朝ご飯は たまご（＿）ソーセージです",
    options: ["A が", "B で", "C と", "D を"],
    answer: "C と"
  },
  {
    id: 9,
    question: "毎日7時（＿）おきます",
    options: ["A が", "B で", "C に", "D を"],
    answer: "C に"
  },
  {
    id: 10,
    question: "私は車（＿）ありません",
    options: ["A が", "B で", "C に", "D を"],
    answer: "A が"
  },
  {
    id: 11,
    question: "毎日コーヒー（＿）飲みます",
    options: ["A が", "B で", "C に", "D を"],
    answer: "D を"
  },
  {
    id: 12,
    question: "昨日レストラン（＿）晩ご飯を食べました",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で"
  },
  {
    id: 13,
    question: "休みに どこ（＿）行きますか",
    options: ["A が", "B で", "C へ", "D を"],
    answer: "C へ"
  },
  {
    id: 14,
    question: "仕事は午前9時から午後6時（＿）です",
    options: ["A が", "B まで", "C に", "D を"],
    answer: "B まで"
  },
  {
    id: 15,
    question: "私は今学校（＿）います",
    options: ["A が", "B で", "C に", "D を"],
    answer: "C に"
  }
];

const ChoiceQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [randomizedQuestions, setRandomizedQuestions] = useState<ChoiceQuestion[]>([]);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserChoiceAnswer[]>([]);
  const [finished, setFinished] = useState(false);

  // 隨機排列題目
  useEffect(() => {
    const shuffled = [...choiceQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
  }, []);

  const current = randomizedQuestions[step];

  const handleSelect = (option: string) => setSelected(option);
  
  const handleNext = () => {
    if (!current || !selected) return;

    const isCorrect = selected === current.answer;
    const userAnswer: UserChoiceAnswer = {
      questionId: current.id,
      question: current.question,
      userChoice: selected,
      correctAnswer: current.answer,
      isCorrect
    };

    setUserAnswers(prev => [...prev, userAnswer]);
    setSelected(null);
    
    if (step < randomizedQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...choiceQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
    setStep(0);
    setSelected(null);
    setUserAnswers([]);
    setFinished(false);
  };

  const handleBack = () => navigate("/");

  const correctCount = userAnswers.filter(answer => answer.isCorrect).length;
  const wrongAnswers = userAnswers.filter(answer => !answer.isCorrect);

  if (!current && !finished) {
    return <div>載入中...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <LanguageSwitcher />
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">{t('choiceQuizTitle')}</h1>
        </div>
        
        {!finished ? (
          <>
            <div className="mb-4">
              <div className="text-base mb-2">
                第 {step + 1} / {randomizedQuestions.length} 題
              </div>
              <div className="text-xl font-medium mb-4 text-center">{current.question}</div>
              <div className="space-y-2">
                {current.options.map((option) => (
                  <Button
                    key={option}
                    variant={selected === option ? "secondary" : "outline"}
                    className="w-full text-base"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {selected && (
                <div className="flex justify-end mt-4">
                  <Button variant="default" onClick={handleNext}>
                    {step === randomizedQuestions.length - 1 ? t('finish') : t('next')}
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-4">{t('practiceCompleted')}</div>
            <div className="text-lg mb-6 text-center">
              <p>{t('totalQuestions')}{userAnswers.length}</p>
              <p className="text-green-600">{t('correct')}{correctCount} 題</p>
              <p className="text-red-600">{t('incorrect')}{wrongAnswers.length} 題</p>
              <p>{t('accuracy')}{userAnswers.length > 0 ? Math.round((correctCount / userAnswers.length) * 100) : 0}%</p>
            </div>
            
            {wrongAnswers.length > 0 && (
              <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-red-700 dark:text-red-300">{t('incorrectQuestions')}</h3>
                {wrongAnswers.map((answer, index) => (
                  <div key={index} className="mb-3 p-3 bg-white dark:bg-card rounded border">
                    <p className="font-medium">{answer.question}</p>
                    <p className="text-red-600">{t('yourAnswer')}{answer.userChoice}</p>
                    <p className="text-green-600">{t('correctAnswer')}{answer.correctAnswer}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-2 w-full">
              <Button onClick={handleRestart} variant="outline" className="w-full">
                {t('practiceAgain')}
              </Button>
              <Button onClick={handleBack} variant="default" className="w-full">
                {t('backToHome')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoiceQuiz;
