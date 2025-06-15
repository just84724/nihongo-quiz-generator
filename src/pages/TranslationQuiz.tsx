
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Question {
  chinese: string;
  japanese: string;
}

const questions: Question[] = [
  { chinese: "昨天收到女朋友給我的禮物非常漂亮", japanese: "昨日彼女からもらったプレゼントはとてもきれいでした" },
  { chinese: "我被媽媽罵了", japanese: "お母さんに怒られました" },
  { chinese: "我不想吃她昨天吃過的拉麵", japanese: "彼女が昨日食べたラーメンは食べたくない" },
  { chinese: "這個周末要和朋友一起去爬山", japanese: "今度の週末は友達と一緒に山に登ります" },
  { chinese: "公司裡有15個社員", japanese: "会社に15人の社員がいます" },
  { chinese: "要不要幫忙？", japanese: "手伝いましょうか" },
  { chinese: "昨天晚上加班到11點", japanese: "昨日の夜は11時まで残業しました" },
  { chinese: "回到家之後什麼都不想做", japanese: "家に帰ってから何もしたくない" },
  { chinese: "幾乎沒有念日文的時間", japanese: "日本語を勉強する時間がほとんどない" },
  { chinese: "好想去日本", japanese: "日本に行きたい" },
  { chinese: "去日本的時候想吃好吃的拉麵", japanese: "日本に行った時においしいラーメンを食べたい" },
  { chinese: "不運動的話會變胖", japanese: "運動しないと太ります" },
  { chinese: "有沒有什麼想去的地方？", japanese: "何か行きたいところはありますか" },
  { chinese: "就算跟課長說他也不會聽", japanese: "課長に言っても聞いてくれません" },
  { chinese: "我姐說他要待在家，哪裡都不想去", japanese: "姉は家にいて、どこにも行きたくないと言いました" },
  { chinese: "明天有事要去銀行", japanese: "明日用事があって銀行に行きます" },
  { chinese: "現在住的地方很方便", japanese: "今住んでいるところはとても便利です" },
  { chinese: "現在會議室沒人", japanese: "今会議室には誰もいません" },
  { chinese: "一到了夏天就很想吃冰", japanese: "夏になるとアイスが食べたくなります" },
  { chinese: "昨天的考試很難嗎？", japanese: "昨日の試験は難しかったですか" },
  { chinese: "我在製作玩具的公司上班", japanese: "おもちゃを作る会社で働いています" },
  { chinese: "今天比昨天熱好多", japanese: "今日は昨日よりずっと暑い" },
  { chinese: "不知道朋友的生日禮物要買什麼才好", japanese: "友達の誕生日プレゼントに何を買ったらいいかわからない" },
  { chinese: "變得可以去日本的話，最想去的地方是哪裡？", japanese: "日本に行けるようになったら、一番行きたいところはどこですか" },
  { chinese: "可以幫我轉告課長明天下午3點有會議嗎？", japanese: "課長に明日の午後3時に会議があることを伝えてもらえますか" },
  { chinese: "田中現在不在位子上", japanese: "田中さんは今席にいません" },
  { chinese: "看起來好像要下雨", japanese: "雨が降りそうです" },
  { chinese: "我覺得帶著傘出門比較好", japanese: "傘を持って出かけた方がいいと思います" },
  { chinese: "最近完全沒有出門，待在家裡", japanese: "最近全く外出せず、家にいます" },
  { chinese: "來台灣玩的話，我覺得秋天比較好", japanese: "台湾に遊びに来るなら、秋の方がいいと思います" },
  { chinese: "不想去學校的話，不去也沒關係", japanese: "学校に行きたくなければ、行かなくてもいいです" },
  { chinese: "關於這件事情要問誰才好", japanese: "このことについて誰に聞いたらいいですか" },
  { chinese: "一邊看電視一邊運動", japanese: "テレビを見ながら運動します" },
  { chinese: "我覺得先預約比較好", japanese: "先に予約した方がいいと思います" },
  { chinese: "又很喜歡這家店的氣氛，咖啡又很好喝，所以經常來", japanese: "この店の雰囲気も好きだし、コーヒーもおいしいので、よく来ます" },
  { chinese: "已經變得不想自己煮了", japanese: "もう自分で料理したくなくなりました" },
  { chinese: "明天一定要倒垃圾", japanese: "明日は必ずゴミを出さなければなりません" },
  { chinese: "你有沒有想要喝什麼？", japanese: "何か飲みたいものはありますか" },
  { chinese: "一到11點就想睡覺", japanese: "11時になると眠くなります" },
  { chinese: "不知道明天能不能來", japanese: "明日来られるかどうかわかりません" },
  { chinese: "你放著就好", japanese: "そのままでいいです" },
  { chinese: "大學畢業之後，進了現在的公司，工作了三年", japanese: "大学を卒業してから、今の会社に入って、3年働いています" },
  { chinese: "暑假從什麼時候開始？", japanese: "夏休みはいつからですか" },
  { chinese: "下禮拜全家一起去旅行", japanese: "来週家族みんなで旅行に行きます" },
  { chinese: "這禮拜變得比較不忙", japanese: "今週はあまり忙しくなくなりました" },
  { chinese: "可以拍照嗎？", japanese: "写真を撮ってもいいですか" },
  { chinese: "吃晚餐了嗎", japanese: "夕食は食べましたか" },
  { chinese: "因為一起工作的同事辭職了，所以最近變忙了", japanese: "一緒に働いていた同僚が辞めたので、最近忙しくなりました" },
  { chinese: "方便的話要不要一起去吃飯？", japanese: "都合がよければ、一緒に食事に行きませんか" },
  { chinese: "熱的話要不要開冷氣", japanese: "暑かったらエアコンをつけませんか" },
  { chinese: "我沒有兄弟姐妹", japanese: "私には兄弟姉妹がいません" },
  { chinese: "田中不在辦公室", japanese: "田中さんはオフィスにいません" },
  { chinese: "今天太熱了，什麼都不想吃", japanese: "今日は暑すぎて、何も食べたくない" },
  { chinese: "交到新朋友很開心", japanese: "新しい友達ができて嬉しいです" },
  { chinese: "我覺得多喝水比較好", japanese: "水をたくさん飲んだ方がいいと思います" },
  { chinese: "想住在看得到富士山的飯店", japanese: "富士山が見えるホテルに泊まりたい" },
  { chinese: "朋友預計下個月結婚", japanese: "友達は来月結婚する予定です" },
  { chinese: "查單字很花時間", japanese: "単語を調べるのに時間がかかります" },
  { chinese: "還沒決定", japanese: "まだ決めていません" },
  { chinese: "冷氣壞掉了", japanese: "エアコンが壊れました" },
  { chinese: "一邊看youtube一邊吃飯", japanese: "YouTubeを見ながらご飯を食べます" },
  { chinese: "手機裡有很多太郎的照片", japanese: "携帯に太郎の写真がたくさんあります" },
  { chinese: "聽不清楚", japanese: "よく聞こえません" },
  { chinese: "你要怎麼過來？", japanese: "どうやって来ますか" },
  { chinese: "請在這裡寫下名字跟電話", japanese: "ここに名前と電話番号を書いてください" },
  { chinese: "這裡寫著禁菸", japanese: "ここに禁煙と書いてあります" },
  { chinese: "可以幫我擦一下桌子嗎？", japanese: "テーブルを拭いてもらえますか" },
  { chinese: "連假都在做什麼？", japanese: "連休は何をしていますか" },
  { chinese: "還沒報名考試", japanese: "まだ試験に申し込んでいません" },
  { chinese: "就算有地圖還是會把路弄錯", japanese: "地図があっても道を間違えてしまいます" },
  { chinese: "我覺得每天運動比較好", japanese: "毎日運動した方がいいと思います" },
  { chinese: "明天應該不會下雨吧", japanese: "明日は雨が降らないでしょう" },
  { chinese: "不懂的話請問我", japanese: "わからなかったら聞いてください" },
  { chinese: "剛剛回家的時候買了便當", japanese: "さっき家に帰る時にお弁当を買いました" },
  { chinese: "一打開書就會想睡覺", japanese: "本を開くと眠くなります" },
  { chinese: "那個戴眼鏡的人是誰？", japanese: "あのメガネをかけている人は誰ですか" },
  { chinese: "我在台南出生", japanese: "私は台南で生まれました" },
  { chinese: "現在住的地方房租很便宜", japanese: "今住んでいるところは家賃が安いです" },
  { chinese: "七月底要去日本", japanese: "7月の終わりに日本に行きます" },
  { chinese: "肚子餓的話要不要吃點什麼？", japanese: "お腹が空いたら何か食べませんか" },
  { chinese: "知道這部電影嗎？", japanese: "この映画を知っていますか" },
  { chinese: "有會中文的人嗎？", japanese: "中国語ができる人はいますか" }
];

const TranslationQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Shuffle questions and take only 20
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 20);
    setShuffledQuestions(shuffled);
    setUserAnswers(new Array(20).fill(''));
  }, []);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = value;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(20).fill(''));
    setIsCompleted(false);
    setShowAnswer(false);
    // Re-shuffle questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 20);
    setShuffledQuestions(shuffled);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <LanguageSwitcher />
        
        <div className="max-w-2xl w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">{t('practiceCompleted')}</h1>
          
          <div className="space-y-4 mb-8">
            <p className="text-lg">{t('totalQuestions')} 20</p>
            <div className="space-y-2">
              {shuffledQuestions.map((question, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-medium mb-2">{question.chinese}</p>
                  <p className="text-sm text-muted-foreground mb-1">{t('yourAnswer')}</p>
                  <p className="mb-2">{userAnswers[index] || t('notFilled')}</p>
                  <p className="text-sm text-muted-foreground mb-1">{t('correctAnswer')}</p>
                  <p className="text-green-600">{question.japanese}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button onClick={handleRestart} className="flex-1">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('practiceAgain')}
            </Button>
            <Button onClick={handleBack} variant="outline" className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('backToHome')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <LanguageSwitcher />
      
      <div className="max-w-2xl w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={handleBack} variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('back')}
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} / {shuffledQuestions.length}
          </span>
        </div>
        
        <h1 className="text-2xl font-bold mb-8 text-center">{t('translationPractice')}</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">{t('translateToJapanese')}</h2>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-lg">{currentQuestion.chinese}</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {t('enterJapaneseTranslation')}
            </label>
            <Textarea
              value={userAnswers[currentQuestionIndex]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={t('enterJapaneseTranslation')}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={() => setShowAnswer(!showAnswer)}
              variant="outline"
              size="sm"
            >
              {showAnswer ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showAnswer ? t('hide') : t('viewAnswers')}
            </Button>
          </div>
          
          {showAnswer && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t('correctAnswer')}</p>
              <p className="text-green-700 dark:text-green-300">{currentQuestion.japanese}</p>
            </div>
          )}
          
          <div className="flex gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="flex-1"
            >
              {t('previousScenario')}
            </Button>
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

export default TranslationQuiz;
