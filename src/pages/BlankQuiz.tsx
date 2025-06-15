
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

// 填空題型別定義
type BlankQuestion = {
  id: number;
  question: string;
  correctAnswers: string[];
};

type UserAnswer = {
  questionId: number;
  question: string;
  userInput: string;
  correctAnswers: string[];
  isCorrect: boolean;
};

// 填空題題庫（添加正確答案）
const blankQuestions: BlankQuestion[] = [
  { id: 1, question: "新しいパソコン（＿）欲しい", correctAnswers: ["が"] },
  { id: 2, question: "あそこ（＿）白いビル（＿）あります", correctAnswers: ["に", "が"] },
  { id: 3, question: "彼女と銀行の前（＿）会いました", correctAnswers: ["で"] },
  { id: 4, question: "友達は日曜日に家（＿）来ました", correctAnswers: ["に"] },
  { id: 5, question: "電子レンジ（＿）肉饅を温める", correctAnswers: ["で"] },
  { id: 6, question: "動物の中（＿）鼠が一番嫌いです", correctAnswers: ["で"] },
  { id: 7, question: "これは皆（＿）頑張った結果です", correctAnswers: ["で"] },
  { id: 8, question: "朝ご飯は たまご（＿）ソーセージです", correctAnswers: ["と"] },
  { id: 9, question: "毎日7時（＿）おきます", correctAnswers: ["に"] },
  { id: 10, question: "私は車（＿）ありません", correctAnswers: ["が"] },
  { id: 11, question: "毎日コーヒー（＿）飲みます", correctAnswers: ["を"] },
  { id: 12, question: "昨日レストラン（＿）晩ご飯を食べました", correctAnswers: ["で"] },
  { id: 13, question: "休みに どこ（＿）行きますか", correctAnswers: ["へ"] },
  { id: 14, question: "仕事は午前9時から午後6時（＿）です", correctAnswers: ["まで"] },
  { id: 15, question: "私は今学校（＿）います", correctAnswers: ["に"] },
  { id: 16, question: "友達（＿）日本人です", correctAnswers: ["は"] },
  { id: 17, question: "母は寿司（＿）好きです", correctAnswers: ["が"] },
  { id: 18, question: "ここでバス（＿）のります", correctAnswers: ["に"] },
  { id: 19, question: "銀行の前でバス（＿）おります", correctAnswers: ["を"] },
  { id: 20, question: "母（＿）朝ご飯を作ってもらいました", correctAnswers: ["に"] }
];

const BlankQuizComponent: React.FC = () => {
  const navigate = useNavigate();
  const [randomizedQuestions, setRandomizedQuestions] = useState<BlankQuestion[]>([]);
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [finished, setFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showAnswersDialog, setShowAnswersDialog] = useState(false);
  const [inputError, setInputError] = useState("");

  // 隨機排列題目
  useEffect(() => {
    const shuffled = [...blankQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
  }, []);

  const current = randomizedQuestions[step];

  // 檢查是否為日文字符
  const isJapanese = (text: string) => {
    const japaneseRegex = /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]*$/;
    return japaneseRegex.test(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    if (inputValue === "" || isJapanese(inputValue)) {
      setValue(inputValue);
      setInputError("");
    } else {
      setInputError("請只輸入日文字符");
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!current) return;
    
    if (inputError) return;

    // 檢查答案是否正確
    const isCorrect = current.correctAnswers.some(answer => 
      answer.toLowerCase() === value.toLowerCase()
    );

    const userAnswer: UserAnswer = {
      questionId: current.id,
      question: current.question,
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
    const shuffled = [...blankQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
    setStep(0);
    setValue("");
    setFinished(false);
    setUserAnswers([]);
    setInputError("");
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
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">助詞練習題（填充題）</h1>
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
                  <AlertDialogTitle>你是否要退出？</AlertDialogTitle>
                  <AlertDialogDescription>
                    退出後將顯示你目前的答題情況和正確答案。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>繼續答題</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExit}>退出</AlertDialogAction>
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
                <div className="text-xl font-medium mb-4 text-center">{current.question}</div>
                <Input
                  placeholder="請輸入助詞（只能輸入日文）"
                  className={`mb-2 ${inputError ? 'border-red-500' : ''}`}
                  value={value}
                  onChange={handleChange}
                  autoFocus
                />
                {inputError && (
                  <p className="text-red-500 text-sm mb-4">{inputError}</p>
                )}
                <Button type="submit" disabled={value === "" || inputError !== ""} className="w-full">
                  {step === randomizedQuestions.length - 1 ? "完成" : "下一題"}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-4">練習完成！</div>
            <div className="text-lg mb-6 text-center">
              <p>總題數：{userAnswers.length}</p>
              <p className="text-green-600">答對：{correctCount} 題</p>
              <p className="text-red-600">答錯：{wrongCount} 題</p>
              <p>正確率：{userAnswers.length > 0 ? Math.round((correctCount / userAnswers.length) * 100) : 0}%</p>
            </div>
            
            {wrongAnswers.length > 0 && (
              <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-red-700 dark:text-red-300">錯誤題目：</h3>
                {wrongAnswers.map((answer, index) => (
                  <div key={index} className="mb-3 p-3 bg-white dark:bg-card rounded border">
                    <p className="font-medium">{answer.question}</p>
                    <p className="text-red-600">你的答案：{answer.userInput || "未填寫"}</p>
                    <p className="text-green-600">正確答案：{answer.correctAnswers.join("、")}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-2 w-full">
              <Button onClick={handleRestart} variant="outline" className="w-full">
                再練一次
              </Button>
              <Button onClick={handleBack} variant="default" className="w-full">
                回到首頁
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 中途退出顯示答案對話框 */}
      <Dialog open={showAnswersDialog} onOpenChange={setShowAnswersDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>你之前寫的題目以及答案</DialogTitle>
            <DialogDescription>
              已完成 {userAnswers.length} 題，答對 {correctCount} 題，答錯 {wrongCount} 題
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {userAnswers.map((answer, index) => (
              <div key={index} className={`p-4 rounded-lg border ${answer.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <p className="font-medium mb-2">{answer.question}</p>
                <p className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                  你的答案：{answer.userInput || "未填寫"}
                </p>
                <p className="text-green-600">正確答案：{answer.correctAnswers.join("、")}</p>
              </div>
            ))}
            
            {wrongAnswers.length > 0 && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-red-700 dark:text-red-300">錯誤題目總結：</h3>
                {wrongAnswers.map((answer, index) => (
                  <div key={index} className="mb-2 p-2 bg-white dark:bg-card rounded">
                    <p className="text-sm">{answer.question}</p>
                    <p className="text-sm text-green-600">正確答案：{answer.correctAnswers.join("、")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setShowAnswersDialog(false)} variant="outline" className="flex-1">
              關閉
            </Button>
            <Button onClick={handleBack} className="flex-1">
              回到首頁
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlankQuizComponent;
