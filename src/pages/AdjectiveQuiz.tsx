import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

// い形容詞數據
const iAdjectiveData = [
  { word: "おおきい／大きい", meaning: "big" },
  { word: "ちいさい／小さい", meaning: "small" },
  { word: "ながい／長い", meaning: "long" },
  { word: "みじかい／短い", meaning: "short" },
  { word: "たかい／高い", meaning: "expensive" },
  { word: "やすい／安い", meaning: "cheap" },
  { word: "あかるい／明るい", meaning: "bright" },
  { word: "くらい／暗い", meaning: "dark" },
  { word: "あたらしい／新しい", meaning: "new" },
  { word: "ふるい／古い", meaning: "old" },
  { word: "やさしい／やさしい", meaning: "easy" },
  { word: "むずかしい／難しい", meaning: "difficult" },
  { word: "いい／よい", meaning: "good" },
  { word: "わるい／悪い", meaning: "bad" },
  { word: "はやい／速い", meaning: "fast/early" },
  { word: "おそい／遅い", meaning: "slow/late" },
  { word: "おいしい／美味しい", meaning: "tasty" },
  { word: "あまい／甘い", meaning: "sweet" },
  { word: "からい／辛い", meaning: "salty/spicy" },
  { word: "たのしい／楽しい", meaning: "fun" }
];

// な形容詞數據
const naAdjectiveData = [
  { word: "ゆうめいな／有名な", meaning: "famous" },
  { word: "たいせつな／大切な", meaning: "precious" },
  { word: "すきな／好きな", meaning: "favorite" },
  { word: "きらいな／嫌いな", meaning: "not favorite" },
  { word: "きれいな／奇麗な", meaning: "clean" },
  { word: "にぎやかな／賑やかな", meaning: "busy" },
  { word: "しずかな／静かな", meaning: "quiet" },
  { word: "ひまな／暇な", meaning: "not busy" },
  { word: "らくな／楽な", meaning: "easy/comfortable" },
  { word: "じょうずな／上手な", meaning: "good at" },
  { word: "へたな／下手な", meaning: "not good at" },
  { word: "べんりな／便利な", meaning: "convenient" },
  { word: "かんたんな／簡単な", meaning: "simple" },
  { word: "すてきな／素敵な", meaning: "nice/great" },
  { word: "しんせつな／親切な", meaning: "kind" },
  { word: "げんきな／元気な", meaning: "healthy" },
  { word: "まじめな／真面目な", meaning: "diligent" },
  { word: "ていねいな／丁寧な", meaning: "polite" },
  { word: "へんな／変な", meaning: "strange" },
  { word: "いやな／嫌な", meaning: "nasty" }
];

// 變化形式
const iAdjectiveForms = [
  { name: "否定法", pattern: "くない", example: "おおきくない", key: "negative" },
  { name: "否定形（過去）", pattern: "くなかった", example: "おおきくなかった", key: "negative-past" },
  { name: "副詞法", pattern: "く", example: "おおきく", key: "adverb" },
  { name: "中止法", pattern: "くて", example: "おおきくて", key: "conjunctive" },
  { name: "過去法", pattern: "かった", example: "おおきかった", key: "past" },
  { name: "仮定形", pattern: "ければ", example: "おおきければ", key: "conditional" },
  { name: "推量法", pattern: "かろう", example: "おおきかろう", key: "presumptive" }
];

const naAdjectiveForms = [
  { name: "否定法", pattern: "でない", example: "ゆうめいでない", key: "negative" },
  { name: "否定形（過去）", pattern: "でなかった", example: "ゆうめいでなかった", key: "negative-past" },
  { name: "副詞法", pattern: "に", example: "ゆうめいに", key: "adverb" },
  { name: "中止法", pattern: "で", example: "ゆうめいで", key: "conjunctive" },
  { name: "過去法", pattern: "だった", example: "ゆうめいだった", key: "past" },
  { name: "仮定形", pattern: "なら(ば)", example: "ゆうめいなら", key: "conditional" },
  { name: "推量法", pattern: "だろう", example: "ゆうめいだろう", key: "presumptive" }
];

type Question = {
  id: number;
  type: 'i' | 'na';
  baseForm: string;
  meaning: string;
  formName: string;
  pattern: string;
  correctAnswer: string;
};

type UserAnswer = {
  questionId: number;
  question: string;
  userInput: string;
  correctAnswer: string;
  isCorrect: boolean;
};

const AdjectiveQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [finished, setFinished] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showAnswersDialog, setShowAnswersDialog] = useState(false);

  // 使用 useMemo 來生成穩定的問題列表
  const questions = useMemo(() => {
    if (!mode) return [];
    
    console.log('Generating questions for mode:', mode);
    
    // 根據模式篩選變化形式
    const getFormsForMode = (currentMode: string) => {
      const iForm = iAdjectiveForms.find(form => form.key === currentMode);
      const naForm = naAdjectiveForms.find(form => form.key === currentMode);
      
      return {
        i: iForm ? [iForm] : [],
        na: naForm ? [naForm] : []
      };
    };

    const allQuestions: Question[] = [];
    let id = 1;
    const forms = getFormsForMode(mode);

    // 生成い形容詞題目
    const shuffledIAdjectives = [...iAdjectiveData].sort(() => Math.random() - 0.5).slice(0, 15);
    shuffledIAdjectives.forEach(adj => {
      if (forms.i.length === 0) return;
      
      const randomForm = forms.i[Math.floor(Math.random() * forms.i.length)];
      const baseWord = adj.word.split('／')[0];
      let correctAnswer = "";
      
      if (baseWord === "いい" && randomForm.name !== "否定法" && randomForm.name !== "否定形（過去）") {
        switch (randomForm.name) {
          case "副詞法": correctAnswer = "よく"; break;
          case "中止法": correctAnswer = "よくて"; break;
          case "過去法": correctAnswer = "よかった"; break;
          case "仮定形": correctAnswer = "よければ"; break;
          case "推量法": correctAnswer = "よかろう"; break;
          default: correctAnswer = "よ" + randomForm.pattern;
        }
      } else if (baseWord === "いい" && (randomForm.name === "否定法" || randomForm.name === "否定形（過去）")) {
        if (randomForm.name === "否定法") {
          correctAnswer = "よくない";
        } else if (randomForm.name === "否定形（過去）") {
          correctAnswer = "よくなかった";
        }
      } else {
        const stem = baseWord.slice(0, -1);
        correctAnswer = stem + randomForm.pattern;
      }

      allQuestions.push({
        id: id++,
        type: 'i',
        baseForm: baseWord,
        meaning: adj.meaning,
        formName: randomForm.name,
        pattern: randomForm.pattern,
        correctAnswer
      });
    });

    // 生成な形容詞題目
    const shuffledNaAdjectives = [...naAdjectiveData].sort(() => Math.random() - 0.5).slice(0, 15);
    shuffledNaAdjectives.forEach(adj => {
      if (forms.na.length === 0) return;
      
      const randomForm = forms.na[Math.floor(Math.random() * forms.na.length)];
      const baseWord = adj.word.split('／')[0].replace('な', '');
      let correctAnswer = "";

      switch (randomForm.name) {
        case "否定法": correctAnswer = baseWord + "でない"; break;
        case "否定形（過去）": correctAnswer = baseWord + "でなかった"; break;
        case "副詞法": correctAnswer = baseWord + "に"; break;
        case "中止法": correctAnswer = baseWord + "で"; break;
        case "過去法": correctAnswer = baseWord + "だった"; break;
        case "仮定形": correctAnswer = baseWord + "なら"; break;
        case "推量法": correctAnswer = baseWord + "だろう"; break;
        default: correctAnswer = baseWord + randomForm.pattern;
      }

      allQuestions.push({
        id: id++,
        type: 'na',
        baseForm: baseWord,
        meaning: adj.meaning,
        formName: randomForm.name,
        pattern: randomForm.pattern,
        correctAnswer
      });
    });

    return allQuestions.sort(() => Math.random() - 0.5);
  }, [mode]); // 只依賴 mode

  if (!mode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">選擇練習模式</h1>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/adjective-quiz?mode=negative")} 
              variant="outline" 
              className="w-full h-12 text-left justify-start"
            >
              否定形練習（くない / でない）
            </Button>
            
            <Button 
              onClick={() => navigate("/adjective-quiz?mode=negative-past")} 
              variant="outline" 
              className="w-full h-12 text-left justify-start"
            >
              否定形（過去）練習（くなかった / でなかった）
            </Button>
            
            <Button 
              onClick={() => navigate("/adjective-quiz?mode=conjunctive")} 
              variant="outline" 
              className="w-full h-12 text-left justify-start"
            >
              中止形練習（くて / で）
            </Button>
            
            <Button 
              onClick={() => navigate("/adjective-quiz?mode=conditional")} 
              variant="outline" 
              className="w-full h-12 text-left justify-start"
            >
              仮定形練習（ければ / なら）
            </Button>
            
            <Button 
              onClick={() => navigate("/adjective-quiz?mode=presumptive")} 
              variant="outline" 
              className="w-full h-12 text-left justify-start"
            >
              推量法練習（かろう / だろう）
            </Button>
            
            <Button 
              onClick={() => navigate("/adjective-quiz?mode=past")} 
              variant="outline" 
              className="w-full h-12 text-left justify-start"
            >
              過去法練習（かった / だった）
            </Button>
            
            <Button 
              onClick={() => navigate("/adjective-quiz?mode=adverb")} 
              variant="outline" 
              className="w-full h-12 text-left justify-start"
            >
              副詞法練習（く / に）
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentQuestion) return;

    const isCorrect = userInput.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    const userAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      question: `${currentQuestion.baseForm}（${currentQuestion.meaning}）→ ${currentQuestion.formName}`,
      userInput: userInput.trim(),
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    };

    setUserAnswers(prev => [...prev, userAnswer]);
    setUserInput("");
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserInput("");
    setUserAnswers([]);
    setFinished(false);
    // 問題會自動重新生成，因為 useMemo 會在 mode 改變時重新計算
  };

  const handleBack = () => navigate("/adjective-quiz");

  const handleExit = () => {
    setShowExitDialog(false);
    setShowAnswersDialog(true);
  };

  const wrongAnswers = userAnswers.filter(answer => !answer.isCorrect);
  const correctCount = userAnswers.filter(answer => answer.isCorrect).length;

  if (!currentQuestion && !finished) {
    return <div>載入中...</div>;
  }

  const getModeName = (mode: string) => {
    const modeNames: { [key: string]: string } = {
      'negative': '否定形',
      'negative-past': '否定形（過去）',
      'conjunctive': '中止形',
      'conditional': '仮定形',
      'presumptive': '推量法',
      'past': '過去法',
      'adverb': '副詞法'
    };
    return modeNames[mode] || '形容詞變化';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{getModeName(mode)}練習</h1>
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
                第 {currentIndex + 1} / {questions.length} 題
              </div>
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-lg font-medium mb-2">
                  {currentQuestion.baseForm}（{currentQuestion.meaning}）
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {currentQuestion.type === 'i' ? 'い形容詞' : 'な形容詞'} - {currentQuestion.formName}
                </div>
                <div className="text-sm">
                  請填入變化後的形式：{currentQuestion.baseForm} → ?
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="請輸入變化後的形容詞"
                  className="mb-4"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  autoFocus
                />
                <Button type="submit" disabled={userInput.trim() === ""} className="w-full">
                  {currentIndex === questions.length - 1 ? "完成" : "下一題"}
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
              <p className="text-red-600">答錯：{wrongAnswers.length} 題</p>
              <p>正確率：{userAnswers.length > 0 ? Math.round((correctCount / userAnswers.length) * 100) : 0}%</p>
            </div>
            
            {wrongAnswers.length > 0 && (
              <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-lg font-bold mb-3 text-red-700 dark:text-red-300">錯誤題目：</h3>
                {wrongAnswers.map((answer, index) => (
                  <div key={index} className="mb-3 p-3 bg-white dark:bg-card rounded border">
                    <p className="font-medium">{answer.question}</p>
                    <p className="text-red-600">你的答案：{answer.userInput || "未填寫"}</p>
                    <p className="text-green-600">正確答案：{answer.correctAnswer}</p>
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
              已完成 {userAnswers.length} 題，答對 {correctCount} 題，答錯 {wrongAnswers.length} 題
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {userAnswers.map((answer, index) => (
              <div key={index} className={`p-4 rounded-lg border ${answer.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                <p className="font-medium mb-2">{answer.question}</p>
                <p className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                  你的答案：{answer.userInput || "未填寫"}
                </p>
                <p className="text-green-600">正確答案：{answer.correctAnswer}</p>
              </div>
            ))}
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

export default AdjectiveQuiz;
