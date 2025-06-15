
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Question {
  id: number;
  chineseKey: string;
  japanese: string;
  answer: string;
  hintKey?: string;
  category: string;
}

const allQuestions: Question[] = [
  // てしまう questions
  { id: 1, chineseKey: "avq1_chinese", japanese: "バスが行って＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_unwilling", category: "てしまう" },
  { id: 2, chineseKey: "avq2_chinese", japanese: "消して＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_complete", category: "てしまう" },
  { id: 3, chineseKey: "avq3_chinese", japanese: "バスに乗り遅れて＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_unwilling_result", category: "てしまう" },
  { id: 4, chineseKey: "avq4_chinese", japanese: "困って＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_trouble", category: "てしまう" },
  { id: 5, chineseKey: "avq5_chinese", japanese: "財布をなくして＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_bad_result", category: "てしまう" },
  { id: 6, chineseKey: "avq6_chinese", japanese: "水に落ちて＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_accident", category: "てしまう" },
  { id: 7, chineseKey: "avq7_chinese", japanese: "食べられて＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_passive_complete", category: "てしまう" },
  { id: 8, chineseKey: "avq8_chinese", japanese: "忘れて＿＿＿＿＿", answer: "しまった", hintKey: "avq_hint_completely_forget", category: "てしまう" },
  
  // ておく questions
  { id: 9, chineseKey: "avq9_chinese", japanese: "駐車場に車を＿＿＿＿＿ますか？", answer: "置き", hintKey: "avq_hint_place_verb", category: "ておく" },
  { id: 10, chineseKey: "avq10_chinese", japanese: "よく考えて＿＿＿＿＿からやりましょう。", answer: "おいて", hintKey: "avq_hint_beforehand", category: "ておく" },
  { id: 11, chineseKey: "avq11_chinese", japanese: "戸を閉めて＿＿＿＿＿下さい。", answer: "おいて", hintKey: "avq_hint_maintain_state", category: "ておく" },
  { id: 12, chineseKey: "avq12_chinese", japanese: "言いたい奴には言わせて＿＿＿＿＿ましょう。", answer: "おき", hintKey: "avq_hint_let_it_be", category: "ておく" },
  { id: 13, chineseKey: "avq13_chinese", japanese: "名前は田中として＿＿＿＿＿", answer: "おく", hintKey: "avq_hint_temporarily", category: "ておく" },
  { id: 14, chineseKey: "avq14_chinese", japanese: "お客さんが来る前にお菓子を買って＿＿＿＿＿ます。", answer: "おき", hintKey: "avq_hint_prepare", category: "ておく" },
  { id: 15, chineseKey: "avq15_chinese", japanese: "客が来る前に部屋を片付けて＿＿＿＿＿ます。", answer: "おき", hintKey: "avq_hint_prepare_clean", category: "ておく" },
  { id: 16, chineseKey: "avq16_chinese", japanese: "客が来る前に食事を用意して＿＿＿＿＿ます。", answer: "おき", hintKey: "avq_hint_prepare_meal", category: "ておく" },
  { id: 17, chineseKey: "avq17_chinese", japanese: "客が来る前に掃除して＿＿＿＿＿ます。", answer: "おき", hintKey: "avq_hint_clean_beforehand", category: "ておく" },
  { id: 18, chineseKey: "avq18_chinese", japanese: "客が来る前に荷物を外へ出して＿＿＿＿＿ます。", answer: "おき", hintKey: "avq_hint_move_beforehand", category: "ておく" },
  
  // てみる questions  
  { id: 19, chineseKey: "avq19_chinese", japanese: "映画をみて＿＿＿＿＿。", answer: "みる", hintKey: "avq_hint_try_watch", category: "てみる" },
  { id: 20, chineseKey: "avq20_chinese", japanese: "試して＿＿＿＿＿。", answer: "みる", hintKey: "avq_hint_try", category: "てみる" },
  { id: 21, chineseKey: "avq21_chinese", japanese: "食べて＿＿＿＿＿よう。", answer: "み", hintKey: "avq_hint_try_eat", category: "てみる" },
  { id: 22, chineseKey: "avq22_chinese", japanese: "飲んで＿＿＿＿＿よう。", answer: "み", hintKey: "avq_hint_try_drink", category: "てみる" },
  { id: 23, chineseKey: "avq23_chinese", japanese: "探して＿＿＿＿＿よう。", answer: "み", hintKey: "avq_hint_try_find", category: "てみる" },
  { id: 24, chineseKey: "avq24_chinese", japanese: "頑張って＿＿＿＿＿よう。", answer: "み", hintKey: "avq_hint_try_effort", category: "てみる" },
  { id: 25, chineseKey: "avq25_chinese", japanese: "行って＿＿＿＿＿なければ分かるはずはない。", answer: "みる", hintKey: "avq_hint_try_go", category: "てみる" },
  { id: 26, chineseKey: "avq26_chinese", japanese: "読んで＿＿＿＿＿なければ分かるはずはない。", answer: "みる", hintKey: "avq_hint_try_read", category: "てみる" },
  { id: 27, chineseKey: "avq27_chinese", japanese: "研究して＿＿＿＿＿なければ分かるはずはない。", answer: "みる", hintKey: "avq_hint_try_research", category: "てみる" },
  
  // てくる questions
  { id: 28, chineseKey: "avq28_chinese", japanese: "船が入って＿＿＿＿＿ました。", answer: "き", hintKey: "avq_hint_towards_speaker", category: "てくる" },
  { id: 29, chineseKey: "avq29_chinese", japanese: "問題が複雑になって＿＿＿＿＿た。", answer: "き", hintKey: "avq_hint_change_process", category: "てくる" },
  { id: 30, chineseKey: "avq30_chinese", japanese: "今までしゃべって＿＿＿＿＿た。", answer: "き", hintKey: "avq_hint_continue_until_now", category: "てくる" },
  { id: 31, chineseKey: "avq31_chinese", japanese: "いろいろな問題が出て＿＿＿＿＿ました。", answer: "き", hintKey: "avq_hint_emergence", category: "てくる" },
  { id: 32, chineseKey: "avq32_chinese", japanese: "雨が降って＿＿＿＿＿ました。", answer: "き", hintKey: "avq_hint_start_action", category: "てくる" },
  { id: 33, chineseKey: "avq33_chinese", japanese: "忘れ物を取って＿＿＿＿＿。", answer: "くる", hintKey: "avq_hint_action_return", category: "てくる" },
  { id: 34, chineseKey: "avq34_chinese", japanese: "昨日父は日本から帰って＿＿＿＿＿た。", answer: "き", hintKey: "avq_hint_return_towards", category: "てくる" },
  { id: 35, chineseKey: "avq35_chinese", japanese: "暑くなって＿＿＿＿＿。", answer: "くる", hintKey: "avq_hint_change_trend", category: "てくる" },
  { id: 36, chineseKey: "avq36_chinese", japanese: "本を買って＿＿＿＿＿。", answer: "くる", hintKey: "avq_hint_action_return", category: "てくる" },
  
  // ていく questions
  { id: 37, chineseKey: "avq37_chinese", japanese: "あの人は日本へ帰って＿＿＿＿＿ました。", answer: "いき", category: "ていく" },
  { id: 38, chineseKey: "avq38_chinese", japanese: "一人で生きて＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 39, chineseKey: "avq39_chinese", japanese: "人間は死んで＿＿＿＿＿。", answer: "いく", category: "ていく" },
  { id: 40, chineseKey: "avq40_chinese", japanese: "天気が温まって＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 41, chineseKey: "avq41_chinese", japanese: "結婚してからも仕事を続けて＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 42, chineseKey: "avq42_chinese", japanese: "車が遠ざかって＿＿＿＿＿った。", answer: "い", category: "ていく" },
  { id: 43, chineseKey: "avq43_chinese", japanese: "今後も頑張って＿＿＿＿＿ます。", answer: "いき", category: "ていく" },
  { id: 44, chineseKey: "avq44_chinese", japanese: "体が強くなって＿＿＿＿＿。", answer: "いく", category: "ていく" },
  { id: 45, chineseKey: "avq45_chinese", japanese: "日本語の勉強を続けて＿＿＿＿＿うと思います。", answer: "いこ", category: "ていく" }
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
                        <div className="font-medium">{t(question.chineseKey)}</div>
                        <div className="text-muted-foreground mb-1">{question.japanese}</div>
                        <div className="text-red-600">{t('yourAnswer')}{userAnswer || t('notFilled')}</div>
                        <div className="text-green-600">{t('correctAnswer')}{question.answer}</div>
                        {question.hintKey && question.category !== 'ていく' && (
                          <div className="text-blue-600 text-xs mt-1">💡 {t(question.hintKey)}</div>
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
              {t(currentQuestion.chineseKey)}
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
              {currentQuestion.hintKey && currentQuestion.category !== 'ていく' && (
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

            {showHints[currentQuestion.id] && currentQuestion.hintKey && currentQuestion.category !== 'ていく' && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-500">
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  💡 {t(currentQuestion.hintKey)}
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
