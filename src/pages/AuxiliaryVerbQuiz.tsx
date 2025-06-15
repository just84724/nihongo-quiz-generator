
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Question {
  id: number;
  chinese: string;
  japanese: string;
  answer: string;
  hint?: string;
  category: string;
}

const allQuestions: Question[] = [
  // てしまう questions
  { id: 1, chinese: "巴士開走了。", japanese: "バスが行って＿＿＿＿＿", answer: "しまった", hint: "表示自己不願意但又不可能挽回之意", category: "てしまう" },
  { id: 2, chinese: "(它)被擦掉了。", japanese: "消して＿＿＿＿＿", answer: "しまった", hint: "表示動作已完全完成", category: "てしまう" },
  { id: 3, chinese: "沒趕上公車了。", japanese: "バスに乗り遅れて＿＿＿＿＿", answer: "しまった", hint: "表示不願意的結果", category: "てしまう" },
  { id: 4, chinese: "(我)很頭痛。", japanese: "困って＿＿＿＿＿", answer: "しまった", hint: "表示困擾的狀態", category: "てしまう" },
  { id: 5, chinese: "(我)掉了錢包。", japanese: "財布をなくして＿＿＿＿＿", answer: "しまった", hint: "表示不好的結果", category: "てしまう" },
  { id: 6, chinese: "掉到水裡了。", japanese: "水に落ちて＿＿＿＿＿", answer: "しまった", hint: "表示意外的結果", category: "てしまう" },
  { id: 7, chinese: "(它)被吃掉了。", japanese: "食べられて＿＿＿＿＿", answer: "しまった", hint: "被動+完成", category: "てしまう" },
  { id: 8, chinese: "(我)忘掉了。", japanese: "忘れて＿＿＿＿＿", answer: "しまった", hint: "表示完全忘記", category: "てしまう" },
  
  // ておく questions
  { id: 9, chinese: "(我們)要把車子停在停車場嗎？", japanese: "駐車場に車を＿＿＿＿＿ますか？", answer: "置き", hint: "原本動詞「置く」的意思", category: "ておく" },
  { id: 10, chinese: "好好考慮之後再做吧！", japanese: "よく考えて＿＿＿＿＿からやりましょう。", answer: "おいて", hint: "事先做某事", category: "ておく" },
  { id: 11, chinese: "請把門關好。", japanese: "戸を閉めて＿＿＿＿＿下さい。", answer: "おいて", hint: "維持關門的狀態", category: "ておく" },
  { id: 12, chinese: "想說話的傢伙讓他說吧！", japanese: "言いたい奴には言わせて＿＿＿＿＿ましょう。", answer: "おき", hint: "放任其為", category: "ておく" },
  { id: 13, chinese: "名字就先假定為田中。", japanese: "名前は田中として＿＿＿＿＿", answer: "おく", hint: "姑且、暫且", category: "ておく" },
  { id: 14, chinese: "客人來之前先買好糕點。", japanese: "お客さんが来る前にお菓子を買って＿＿＿＿＿ます。", answer: "おき", hint: "事先準備", category: "ておく" },
  { id: 15, chinese: "客人來之前先整理好房間。", japanese: "客が来る前に部屋を片付けて＿＿＿＿＿ます。", answer: "おき", hint: "事先整理", category: "ておく" },
  { id: 16, chinese: "客人來之前先準備好餐食。", japanese: "客が来る前に食事を用意して＿＿＿＿＿ます。", answer: "おき", hint: "事先準備", category: "ておく" },
  { id: 17, chinese: "客人來之前先打掃好。", japanese: "客が来る前に掃除して＿＿＿＿＿ます。", answer: "おき", hint: "事先打掃", category: "ておく" },
  { id: 18, chinese: "客人來之前先把行李拿到外面。", japanese: "客が来る前に荷物を外へ出して＿＿＿＿＿ます。", answer: "おき", hint: "事先移動", category: "ておく" },
  
  // てみる questions  
  { id: 19, chinese: "看電影看看。", japanese: "映画をみて＿＿＿＿＿。", answer: "みる", hint: "試著看看", category: "てみる" },
  { id: 20, chinese: "試一試看看。", japanese: "試して＿＿＿＿＿。", answer: "みる", hint: "嘗試的意思", category: "てみる" },
  { id: 21, chinese: "吃看看吧！", japanese: "食べて＿＿＿＿＿よう。", answer: "み", hint: "試著吃", category: "てみる" },
  { id: 22, chinese: "喝看看吧！", japanese: "飲んで＿＿＿＿＿よう。", answer: "み", hint: "試著喝", category: "てみる" },
  { id: 23, chinese: "找找看看吧！", japanese: "探して＿＿＿＿＿よう。", answer: "み", hint: "試著找", category: "てみる" },
  { id: 24, chinese: "努力看看吧！", japanese: "頑張って＿＿＿＿＿よう。", answer: "み", hint: "試著努力", category: "てみる" },
  { id: 25, chinese: "不去看看，是不會知道的。", japanese: "行って＿＿＿＿＿なければ分かるはずはない。", answer: "みる", hint: "試著去", category: "てみる" },
  { id: 26, chinese: "不讀看看，是不會知道的。", japanese: "読んで＿＿＿＿＿なければ分かるはずはない。", answer: "みる", hint: "試著讀", category: "てみる" },
  { id: 27, chinese: "不研究看看，是不會知道的。", japanese: "研究して＿＿＿＿＿なければ分かるはずはない。", answer: "みる", hint: "試著研究", category: "てみる" },
  
  // てくる questions
  { id: 28, chinese: "船進港了。", japanese: "船が入って＿＿＿＿＿ました。", answer: "き", hint: "由遠而近的移動", category: "てくる" },
  { id: 29, chinese: "問題變的複雜起來了。", japanese: "問題が複雑になって＿＿＿＿＿た。", answer: "き", hint: "變化的過程", category: "てくる" },
  { id: 30, chinese: "一直說到現在。", japanese: "今までしゃべって＿＿＿＿＿た。", answer: "き", hint: "持續到現在", category: "てくる" },
  { id: 31, chinese: "出現了種種的問題。", japanese: "いろいろな問題が出て＿＿＿＿＿ました。", answer: "き", hint: "新事物的出現", category: "てくる" },
  { id: 32, chinese: "雨開始下起來了。", japanese: "雨が降って＿＿＿＿＿ました。", answer: "き", hint: "動作的開始", category: "てくる" },
  { id: 33, chinese: "把忘了帶來的東西去拿來。", japanese: "忘れ物を取って＿＿＿＿＿。", answer: "くる", hint: "做完動作後回來", category: "てくる" },
  { id: 34, chinese: "父親昨天從日本回來了。", japanese: "昨日父は日本から帰って＿＿＿＿＿た。", answer: "き", hint: "由遠而近回來", category: "てくる" },
  { id: 35, chinese: "會越來越熱。", japanese: "暑くなって＿＿＿＿＿。", answer: "くる", hint: "變化的趨勢", category: "てくる" },
  { id: 36, chinese: "我去買書後回來。", japanese: "本を買って＿＿＿＿＿。", answer: "くる", hint: "做完動作後回來", category: "てくる" },
  
  // ていく questions
  { id: 37, chinese: "他回日本去了。", japanese: "あの人は日本へ帰って＿＿＿＿＿ました。", answer: "いき", category: "ていく" },
  { id: 38, chinese: "要一個人活下去。", japanese: "一人で生きて＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 39, chinese: "人是會死的。", japanese: "人間は死んで＿＿＿＿＿。", answer: "いく", category: "ていく" },
  { id: 40, chinese: "天氣會越來越暖和。", japanese: "天気が温まって＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 41, chinese: "(我)結婚以後會繼續工作下去。", japanese: "結婚してからも仕事を続けて＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 42, chinese: "車子漸漸遠去。", japanese: "車が遠ざかって＿＿＿＿＿った。", answer: "い", category: "ていく" },
  { id: 43, chinese: "(我)今後會越加用功。", japanese: "今後も頑張って＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 44, chinese: "身體會越來越強健。", japanese: "体が強くなって＿＿＿＿＿。", answer: "いく", category: "ていく" },
  { id: 45, chinese: "我想要繼續學習日文下去。", japanese: "日本語の勉強を続けて＿＿＿＿＿うと思います。", answer: "いこ", category: "ていく" }
];

const AuxiliaryVerbQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // 隨機抽取20題
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswerChange = (value: string) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
    setShowResults(false);
    setShowHints({});
    // 重新隨機抽取20題
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
    setShuffledQuestions(shuffled);
  };

  const toggleHint = (questionId: number) => {
    setShowHints(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const calculateResults = () => {
    let correct = 0;
    shuffledQuestions.forEach(question => {
      const userAnswer = userAnswers[question.id]?.trim() || '';
      if (userAnswer === question.answer) {
        correct++;
      }
    });
    return {
      total: shuffledQuestions.length,
      correct,
      incorrect: shuffledQuestions.length - correct,
      accuracy: Math.round((correct / shuffledQuestions.length) * 100)
    };
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const results = calculateResults();

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <div className="max-w-2xl w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">{t('practiceCompleted')}</h1>
          
          <div className="bg-muted p-6 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{results.total}</div>
                <div className="text-sm text-muted-foreground">{t('totalQuestions')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{results.correct}</div>
                <div className="text-sm text-muted-foreground">{t('correct')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{results.incorrect}</div>
                <div className="text-sm text-muted-foreground">{t('incorrect')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{results.accuracy}%</div>
                <div className="text-sm text-muted-foreground">{t('accuracy')}</div>
              </div>
            </div>
          </div>

          {results.incorrect > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">{t('incorrectQuestions')}</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {shuffledQuestions.map(question => {
                  const userAnswer = userAnswers[question.id]?.trim() || '';
                  const isIncorrect = userAnswer !== question.answer;
                  
                  if (!isIncorrect) return null;
                  
                  return (
                    <div key={question.id} className="p-3 bg-red-50 dark:bg-red-900/20 rounded border-l-4 border-red-500">
                      <div className="text-sm">
                        <div className="font-medium">{question.chinese}</div>
                        <div className="text-muted-foreground mb-1">{question.japanese}</div>
                        <div className="text-red-600">{t('yourAnswer')}{userAnswer || t('notFilled')}</div>
                        <div className="text-green-600">{t('correctAnswer')}{question.answer}</div>
                        {question.hint && question.category !== 'ていく' && (
                          <div className="text-blue-600 text-xs mt-1">💡 {question.hint}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button onClick={handleRestart} className="flex-1">
              {t('practiceAgain')}
            </Button>
            <Button onClick={() => navigate('/')} variant="outline" className="flex-1">
              {t('backToHome')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">{t('auxiliaryVerbPractice')}</h1>
          <div className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1}/{shuffledQuestions.length}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-sm text-blue-600 font-medium mb-2">
              {currentQuestion.category}
            </div>
            <div className="text-lg font-medium mb-2">
              {currentQuestion.chinese}
            </div>
            <div className="text-lg mb-4 font-mono">
              {currentQuestion.japanese}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder={t('enterAuxiliaryVerb')}
                className="flex-1"
              />
              {currentQuestion.hint && currentQuestion.category !== 'ていく' && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => toggleHint(currentQuestion.id)}
                  title="顯示提示"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              )}
            </div>

            {showHints[currentQuestion.id] && currentQuestion.hint && currentQuestion.category !== 'ていく' && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  💡 {currentQuestion.hint}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleNext}
              className="flex-1"
            >
              {currentQuestionIndex === shuffledQuestions.length - 1 ? t('finish') : t('next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuxiliaryVerbQuiz;
