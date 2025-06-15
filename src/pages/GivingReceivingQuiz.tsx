import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

// 授受動詞題型定義
type GivingReceivingQuestion = {
  id: number;
  chineseKey: string;
  japanese: string;
  correctAnswers: string[];
  hintKey: string;
};

type UserAnswer = {
  questionId: number;
  chinese: string;
  japanese: string;
  userInput: string;
  correctAnswers: string[];
  isCorrect: boolean;
};

// 授受動詞題庫
const givingReceivingQuestions: GivingReceivingQuestion[] = [
  {
    id: 1,
    chineseKey: "grq1_chinese",
    japanese: "先生は私に日本語の文法を説明して（＿）ます。",
    correctAnswers: ["くれ"],
    hintKey: "grq_hint_receive"
  },
  {
    id: 2,
    chineseKey: "grq2_chinese",
    japanese: "母は私に飴を買って（＿）ます。",
    correctAnswers: ["くれ"],
    hintKey: "grq_hint_receive"
  },
  {
    id: 3,
    chineseKey: "grq3_chinese",
    japanese: "高野さんは私に英語を教えて（＿）ます。",
    correctAnswers: ["くれ"],
    hintKey: "grq_hint_receive"
  },
  {
    id: 4,
    chineseKey: "grq4_chinese",
    japanese: "電気屋の人は私に新しいテレビを運んで（＿）ます。",
    correctAnswers: ["くれ"],
    hintKey: "grq_hint_receive"
  },
  {
    id: 5,
    chineseKey: "grq5_chinese",
    japanese: "役所の人は私たちに道を案内して（＿）ます。",
    correctAnswers: ["くれ"],
    hintKey: "grq_hint_receive"
  },
  {
    id: 6,
    chineseKey: "grq6_chinese",
    japanese: "あのお爺さんは妹に靴をなおして（＿）ます。",
    correctAnswers: ["くれ"],
    hintKey: "grq_hint_third_party_receive"
  },
  {
    id: 7,
    chineseKey: "grq7_chinese",
    japanese: "旅行会社の人は家族に海外旅行のビザを申し込んで（＿）ます。",
    correctAnswers: ["くれ"],
    hintKey: "grq_hint_third_party_receive"
  },
  {
    id: 8,
    chineseKey: "grq8_chinese",
    japanese: "王さんは竹内さんに仕事の方法を教えて（＿）ます。",
    correctAnswers: ["あげ"],
    hintKey: "grq_hint_give"
  },
  {
    id: 9,
    chineseKey: "grq9_chinese",
    japanese: "私はあなたに宿題の答えを教えて（＿）ます。",
    correctAnswers: ["あげ"],
    hintKey: "grq_hint_give_other"
  },
  {
    id: 10,
    chineseKey: "grq10_chinese",
    japanese: "母は弟に玩具を買って（＿）ます。",
    correctAnswers: ["あげ"],
    hintKey: "grq_hint_third_party_give"
  },
  {
    id: 11,
    chineseKey: "grq11_chinese",
    japanese: "王さんは彼女にギターを弾いて（＿）ます。",
    correctAnswers: ["あげ"],
    hintKey: "grq_hint_third_party_give"
  },
  {
    id: 12,
    chineseKey: "grq12_chinese",
    japanese: "先生はクラスメートに綺麗な絵本を貸して（＿）ます。",
    correctAnswers: ["あげ"],
    hintKey: "grq_hint_third_party_give"
  },
  {
    id: 13,
    chineseKey: "grq13_chinese",
    japanese: "寮の管理員さんは郵便物をみんなのメールボックスに入れて（＿）ます。",
    correctAnswers: ["あげ"],
    hintKey: "grq_hint_third_party_give"
  },
  {
    id: 14,
    chineseKey: "grq14_chinese",
    japanese: "私は岸部さんにギターの弾き方を教えて（＿）います。",
    correctAnswers: ["もらって"],
    hintKey: "grq_hint_get_help"
  },
  {
    id: 15,
    chineseKey: "grq15_chinese",
    japanese: "私は友達に本を買って（＿）ました。",
    correctAnswers: ["もらい"],
    hintKey: "grq_hint_get_help"
  },
  {
    id: 16,
    chineseKey: "grq16_chinese",
    japanese: "私は弟に部屋を掃除して（＿）ます。",
    correctAnswers: ["もらい"],
    hintKey: "grq_hint_get_help"
  },
  {
    id: 17,
    chineseKey: "grq17_chinese",
    japanese: "私は旅行会社の人にホテルを予約して（＿）ます。",
    correctAnswers: ["もらい"],
    hintKey: "grq_hint_get_help"
  },
  {
    id: 18,
    chineseKey: "grq18_chinese",
    japanese: "彼は妻にお昼のお弁当を作って（＿）ます。",
    correctAnswers: ["もらい"],
    hintKey: "grq_hint_get_help"
  },
  {
    id: 19,
    chineseKey: "grq19_chinese",
    japanese: "彼女は彼氏に食事代を払って（＿）ます。",
    correctAnswers: ["もらい"],
    hintKey: "grq_hint_get_help"
  },
  {
    id: 20,
    chineseKey: "grq20_chinese",
    japanese: "田村さんは林さんに中国語を教えて（＿）ます。",
    correctAnswers: ["もらい"],
    hintKey: "grq_hint_get_help"
  }
];

const GivingReceivingQuizComponent: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [randomizedQuestions, setRandomizedQuestions] = useState<GivingReceivingQuestion[]>([]);
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [finished, setFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showAnswersDialog, setShowAnswersDialog] = useState(false);

  // 隨機排列題目
  useEffect(() => {
    const shuffled = [...givingReceivingQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
  }, []);

  const current = randomizedQuestions[step];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!current) return;

    // 檢查答案是否正確
    const isCorrect = current.correctAnswers.some(answer => 
      answer.toLowerCase() === value.toLowerCase()
    );

    const userAnswer: UserAnswer = {
      questionId: current.id,
      chinese: t(current.chineseKey),
      japanese: current.japanese,
      userInput: value,
      correctAnswers: current.correctAnswers,
      isCorrect
    };

    setUserAnswers(prev => [...prev, userAnswer]);
    setValue("");
    
    if (step < randomizedQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    const shuffled = [...givingReceivingQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
    setStep(0);
    setValue("");
    setFinished(false);
    setUserAnswers([]);
  };

  const handleBack = () => navigate("/");

  const handleExit = () => {
    setShowExitDialog(false);
    setShowAnswersDialog(true);
  };

  const wrongAnswers = userAnswers.filter(answer => !answer.isCorrect);
  const correctCount = userAnswers.filter(answer => answer.isCorrect).length;
  const wrongCount = wrongAnswers.length;

  if (!current && !finished) {
    return <div>載入中...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <LanguageSwitcher />
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{t('givingReceivingQuizTitle')}</h1>
          </div>
          
          {!finished && (
            <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('exitQuestion')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('exitMessage')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('continueAnswering')}</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExit}>{t('exitNow')}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        
        {!finished ? (
          <>
            <div className="mb-4">
              <div className="text-base mb-2">
                第 {step + 1} / {randomizedQuestions.length} 題
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">中文意思：</div>
                  <div className="text-base font-medium mb-3">{t(current.chineseKey)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">日文填空：</div>
                  <div className="text-xl font-medium">{current.japanese}</div>
                </div>
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    提示：{t(current.hintKey)}
                  </div>
                </div>
                <Input
                  placeholder="請輸入動詞變化"
                  className="mb-4"
                  value={value}
                  onChange={handleChange}
                  autoFocus
                />
                <Button type="submit" disabled={value === ""} className="w-full">
                  {step === randomizedQuestions.length - 1 ? t('finish') : t('next')}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-4">{t('practiceCompleted')}</div>
            <div className="text-lg mb-6 text-center">
              <p>{t('totalQuestions')}{userAnswers.length}</p>
              <p className="text-green-600">{t('correct')}{correctCount} 題</p>
              <p className="text-red-600">{t('incorrect')}{wrongCount} 題</p>
              <p>{t('accuracy')}{userAnswers.length > 0 ? Math.round((correctCount / userAnswers.length) * 100) : 0}%</p>
            </div>
            
            {wrongAnswers.length > 0 && (
              <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-red-700 dark:text-red-300">{t('incorrectQuestions')}</h3>
                {wrongAnswers.map((answer, index) => (
                  <div key={index} className="mb-3 p-3 bg-white dark:bg-card rounded border">
                    <p className="text-sm text-gray-600 mb-1">中文：{answer.chinese}</p>
                    <p className="font-medium mb-1">{answer.japanese}</p>
                    <p className="text-red-600">{t('yourAnswer')}{answer.userInput || t('notFilled')}</p>
                    <p className="text-green-600">{t('correctAnswer')}{answer.correctAnswers.join("、")}</p>
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

      {/* 中途退出顯示答案對話框 */}
      <Dialog open={showAnswersDialog} onOpenChange={setShowAnswersDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('previousAnswersTitle')}</DialogTitle>
            <DialogDescription>
              {t('completedStatus', { answered: userAnswers.length, correct: correctCount, incorrect: wrongCount })}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {userAnswers.map((answer, index) => (
              <div key={index} className={`p-4 rounded-lg border ${answer.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <p className="text-sm text-gray-600 mb-1">中文：{answer.chinese}</p>
                <p className="font-medium mb-2">{answer.japanese}</p>
                <p className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                  {t('yourAnswer')}{answer.userInput || t('notFilled')}
                </p>
                <p className="text-green-600">{t('correctAnswer')}{answer.correctAnswers.join("、")}</p>
              </div>
            ))}
            
            {wrongAnswers.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-red-700 dark:text-red-300">{t('incorrectQuestions')}</h3>
                {wrongAnswers.map((answer, index) => (
                  <div key={index} className="mb-2 p-2 bg-white dark:bg-card rounded">
                    <p className="text-sm">{answer.chinese}</p>
                    <p className="text-sm">{answer.japanese}</p>
                    <p className="text-sm text-green-600">{t('correctAnswer')}{answer.correctAnswers.join("、")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setShowAnswersDialog(false)} variant="outline" className="flex-1">
              {t('close')}
            </Button>
            <Button onClick={handleBack} className="flex-1">
              {t('backToHome')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GivingReceivingQuizComponent;
