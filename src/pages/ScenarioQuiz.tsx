
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plane, Home, ShoppingBag, Camera, Coffee, Globe } from "lucide-react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// 情境題型別定義
type ScenarioQuestion = {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  dialogue: string[];
  answer: string[];
};

// 情境題題庫
const scenarioQuestions: ScenarioQuestion[] = [
  {
    id: 1,
    title: "場景一：機場",
    icon: Plane,
    dialogue: [
      "A： 對不起。",
      "B：你遲到了啊。",
      "A：嗯，路上有點堵車。",
      "B：啊，我的護照不見了。",
      "A：不在你的包包里嗎？",
      "B：不在啊，剛剛還在拿出來看過。",
      "A：哦，我看到了，在椅子下面。",
      "B：啊，在這里。現在幾點了？",
      "A：12點了。",
      "B：差不多該check in了。",
      "A：嗯。走吧。"
    ],
    answer: [
      "A： 對不起。",
      "すみません・・・",
      "B：你遲到了啊。",
      "遅（おく）れたよね？",
      "A：嗯，路上有點堵車。",
      "そうです。道（みち）がすごく渋滯（じゅうたい）してたの・・・",
      "B：啊，我的護照不見了。",
      "しまった。。私のパスポートがなくなったんだ。",
      "A：不在你的包包里嗎？",
      "カバンの中にあるんじゃないの？",
      "B：不在啊，剛剛還在拿出來看過。",
      "ないよ。先まだ出して見たのに・・",
      "A：哦，我看到了，在椅子下面。",
      "ほら、見つかったよ。椅子の下に落（お）ちてる・・・",
      "B：啊，在這里。現在幾點了？",
      "あ、ここだ。今は何時なの？",
      "A：12點了。",
      "もう十二時（じゅうにじ）になったよ。",
      "B：差不多該check in了。",
      "もうそろそろチェックインだね・・",
      "A：嗯。走吧。",
      "そうだね。行（い）こう。。。"
    ]
  },
  {
    id: 2,
    title: "場景二：飛機上",
    icon: Plane,
    dialogue: [
      "A：起來啦，陪我說說話把。",
      "B：哎，我有點困啊。",
      "A：你昨天晚上幹什麽了啊？",
      "B：一直在玩電腦遊戲呢。太興奮了，睡不著。",
      "A：我們來計劃下我們的假期吧。",
      "B：好啊。",
      "A：今天是星期五，那這個星期日有時間嘛？",
      "B：星期日啊，沒有哎。",
      "A：那下個星期三咧？",
      "B：星期三可以啊。",
      "A：恩，那就星期三早上10點，麥當勞門口見。",
      "B：好，到時見。",
      "（廣播里播報：飛機即將降落，請乘客做好準備。今天時間是7月15號，星期五，室外溫度35攝氏度。祝旅途愉快。）"
    ],
    answer: [
      "A：起來啦，陪我說說話把。",
      "起（お）きなさい。私となんか話（はなし）をしましょうよ・。。",
      "B：哎，我有點困啊。",
      "え・・・眠（ねむ）いだもの",
      "A：你昨天晚上幹什麽了啊？",
      "昨夜、あなたはなにをしてたの？",
      "B：一直在玩電腦遊戲呢。太興奮了，睡不著。",
      "ずっとパソコンゲームを遊（あそ）んでたので、なかなか眠（ねむ）れなかった。。",
      "A：我們來計劃下我們的假期吧。",
      "これからの夏休（なつやす）みスケジュールを組（く）みましょう・・",
      "B：好啊。",
      "いいですよ。",
      "A：今天是星期五，那這個星期日有時間嘛？",
      "今日は金曜日だけど、日曜日なら暇（ひま）があるの？",
      "B：星期日啊，沒有哎。",
      "日曜日？ごめん、ちっょと用事（ようじ）がある・・",
      "A：那下個星期三咧？",
      "だったら來周（らいしゅう）の水曜日は？",
      "B：星期三可以啊。",
      "水曜日なら大丈夫（だいじょうぶ）だよ。。。",
      "A：恩，那就星期三早上10點，麥當勞門口見。",
      "分（わか）った。そしたら水曜日の朝十時（あさじゅうじ）頃（ごろ）、マックの前に會いましょう、、",
      "B：好，到時見。",
      "はい、約束（やくそく）します。。。",
      "（廣播里播報：飛機即將降落，請乘客做好準備。今天時間是7月15號，星期 五，室外溫度35攝氏度。祝旅途愉快。）"
    ]
  },
  {
    id: 3,
    title: "場景三：家里",
    icon: Home,
    dialogue: [
      "A：早上好！你起得可真早！",
      "B：恩，我今天要和朋友一起去逛街。",
      "A：今天可能會下雨哦，記得帶傘啊。",
      "B：嗯，知道啦。",
      "A：晚上幾點回來啊？",
      "B：大概晚上7點左右。",
      "A：晚飯回來吃嗎？",
      "B：不了，我們在外面吃呢。",
      "A：好，玩的開心點。",
      "B：拜拜。"
    ],
    answer: [
      "A：早上好！你起得可真早！",
      "おはよう。早いですね・・・",
      "B：恩，我今天要和朋友一起去逛街。",
      "え。今日友達と約束して、一緒に買い物でも行こうかなと思ってます。。",
      "A：今天可能會下雨哦，記得帶傘啊。",
      "今日たぶん雨が降るなので、傘を持って行くのを忘（わす）れないでね・・",
      "B：嗯，知道啦。",
      "はい、分った。。。",
      "A：晚上幾點回來啊？",
      "夜何時頃（なんじごろ）に帰って來るんですか？",
      "B：大概晚上7點左右。",
      "たぶん七時頃かな・・・",
      "A：晚飯回來吃嗎？",
      "晩禦飯（ばんごはん）は？",
      "B：不了，我們在外面吃呢。",
      "たぶん外で食べるよ・・",
      "A：好，玩的開心點。",
      "分った。お楽（たの）しみ・・・",
      "B：拜拜。",
      "バイバイ"
    ]
  },
  {
    id: 4,
    title: "場景四：商場",
    icon: ShoppingBag,
    dialogue: [
      "A：早上好！",
      "B：早上好！",
      "A：二樓是賣包包的，我們一起去看看吧。",
      "B：好啊！",
      "A：看這個包包，好可愛啊。",
      "B：恩，真的哎，多少錢啊？",
      "A：2100yen。",
      "B：哇，有點貴呢。",
      "A：那個也不錯哦。",
      "B：恩，去看看。",
      "A：哇。這個更貴。",
      "B：我這的這個挺好哦。",
      "A：好漂亮呢，也很便宜，就買這個吧。",
      "B：嗯，好。",
      "A：接下來去哪呢？",
      "B：去看電影吧。",
      "A：好啊。"
    ],
    answer: [
      "A：早上好！",
      "おはよう",
      "B：早上好！",
      "おはよう",
      "A：二樓是賣包包的，我們一起去看看吧。",
      "二階（にかい）はバッグ売り場（うりば）だから、一緒に見に行こう。。。",
      "B：好啊！",
      "いいですよ。。。",
      "A：看這個包包，好可愛啊。",
      "このバッグすごく可愛（かわい）い。。",
      "B：恩，真的哎，多少錢啊？",
      "そうだね。いくらぐらいなの？",
      "A：2100yen。",
      "二千百円（にせんひゃくえん）",
      "B：哇，有點貴呢。",
      "ちっょと高いですね・・・",
      "A：那個也不錯哦。",
      "あれもいいですね、、、",
      "B：恩，去看看。",
      "そうですね。見に行こう・・",
      "A：哇。這個更貴。",
      "わぁ、、これはもっと高い・・",
      "B：我這的這個挺好哦。",
      "これでいいと思います。",
      "A：好漂亮呢，也很便宜，就買這個吧。",
      "綺麗（きれい）だね。。ちなみに値段（ねだん）も安いし、これを買った方がいいよ・・・",
      "B：嗯，好。",
      "はい。",
      "A：接下來去哪呢？",
      "これからどこに行こうかな？",
      "B：去看電影吧。",
      "映畫を見に行こうよ・・",
      "A：好啊。",
      "はい、行こう。。"
    ]
  },
  {
    id: 5,
    title: "場景五：從電影院出來",
    icon: Camera,
    dialogue: [
      "A：好無聊的電影啊。",
      "B：嗯，我都快睡著了。",
      "A：肚子有點餓了呢，我們去完晚飯在回家吧。",
      "B：好啊，你想吃什麽？",
      "A：吃壽司吧？",
      "B：不要，昨天剛吃過呢。要不我們吃牛排吧？",
      "A：好啊。",
      "B：最後甜點我要吃抹茶冰欺淩。",
      "A：嗯，抹茶冰欺淩很好吃，我也最喜歡。",
      "B：走吧。"
    ],
    answer: [
      "A：好無聊的電影啊。",
      "つまらない映畫だったね・・",
      "B：嗯，我都快睡著了。",
      "そう、見てるうちに眠くなったよ。。",
      "A：肚子有點餓了呢，我們去完晚飯在回家吧。",
      "お腹（なか）も空（す）いたので、一緒に食事（しょくじ）を食（た）べ終（お）わったら帰りましょう・・・",
      "B：好啊，你想吃什麽？",
      "いいですよ。なにを食べたいの？",
      "A：吃壽司吧？",
      "お壽司にしようか？",
      "B：不要，昨天剛吃過呢。要不我們吃牛排吧？",
      "昨日食べたばっかりなのに。。やっぱりステーキにしよう。",
      "A：好啊。",
      "いいですよ。",
      "B：最後甜點我要吃抹茶冰欺淩。",
      "最後（さいご）のデザートは抹茶（まっちゃ）クリームを食べたい・・",
      "A：嗯，抹茶冰欺淩很好吃，我也最喜歡。",
      "そうですね。。抹茶クリームは美味しいね。私も好きだよ。",
      "B：走吧。",
      "行こう・・"
    ]
  },
  {
    id: 6,
    title: "場景六：機場",
    icon: Globe,
    dialogue: [
      "A：假期過得好快啊。",
      "B：是啊，不過也很開心呢。",
      "A：這個假期你都到哪里去玩了啊？",
      "B：去北京旅遊了一趟。好熱啊。後來就一直呆在家里看電視，上網。你呢？",
      "A：我哪里都沒去呢。平常就一個人在家。偶爾周末和爸媽去公園玩。",
      "B：聽起來也不錯啦。",
      "（廣播：乘坐AC087航班的顧客注意了，飛機即將起飛，請乘客們到17號登機口準備登機。）",
      "A：枯燥的日子又要開始了。",
      "B：哎，是啊，真是期待下一個假期啊。"
    ],
    answer: [
      "A：假期過得好快啊。",
      "夏休みって過（す）ごすのは早いだね・・・",
      "B：是啊，不過也很開心呢。",
      "そうだね。とても楽しかったよ。",
      "A：這個假期你都到哪里去玩了啊？",
      "夏休みの間にどこで遊んでいたの？",
      "B：去北京旅遊了一趟。好熱啊。後來就一直呆在家里看電視，上網。你呢？",
      "北京へ旅行に行って、気溫があまり暑いなので、帰った來たらずっと家でテレビを見たりパソコンで遊んだりしていた。あなたは？",
      "A：我哪里都沒去呢。平常就一個人在家。偶爾周末和爸媽去公園玩。",
      "どこも行かなかった。普段（ふだん）の日、一人でのんびりして、たまに周末になると、両親と公園で散歩（さんぽ）していた。",
      "B：聽起來也不錯啦。",
      "いいですね。。。",
      "（廣播：乘坐AC087航班的顧客注意了，飛機即將起飛，請乘客們到17號登機口準備登機。）",
      "A：枯燥的日子又要開始了。",
      "退屈（たいくつ）の日はまだ始（はじ）まるよね。。。",
      "B：哎，是啊，真是期待下一個假期啊",
      "そうだね。今度の休みを期待（きたい）してるよね。。"
    ]
  }
];

const ScenarioQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [randomizedQuestions, setRandomizedQuestions] = useState<ScenarioQuestion[]>([]);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  // 隨機排列題目
  useEffect(() => {
    const shuffled = [...scenarioQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
  }, []);

  const current = randomizedQuestions[step];

  const handleStart = () => setStarted(true);
  
  const handleNext = () => {
    if (step < randomizedQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleRestart = () => {
    const shuffled = [...scenarioQuestions].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
    setStep(0);
    setStarted(false);
    setFinished(false);
    setShowExitDialog(false);
    setShowAnswers(false);
  };

  const handleBack = () => navigate("/");

  const handleExit = () => {
    setShowExitDialog(false);
    setStarted(false);
    setStep(0);
  };

  const handleShowAnswers = () => setShowAnswers(true);
  const handleHideAnswers = () => setShowAnswers(false);

  if (!current && !finished && started) {
    return <div>載入中...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-4xl w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">情境練習題</h1>
        </div>
        
        {!started ? (
          <div className="flex flex-col items-center">
            <div className="text-lg mb-6 text-center">
              <p>歡迎來到情境練習！</p>
              <p>這裡有 6 個不同場景的日文對話，讓您練習日常會話。</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6 w-full">
              {scenarioQuestions.map((scenario) => {
                const IconComponent = scenario.icon;
                return (
                  <div key={scenario.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center mb-2">
                      <IconComponent className="h-5 w-5 mr-2" />
                      <span className="font-medium">{scenario.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {scenario.dialogue.length} 段對話
                    </p>
                  </div>
                );
              })}
            </div>
            
            <Button onClick={handleStart} className="w-full" size="lg">
              開始練習
            </Button>
          </div>
        ) : !finished ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <div className="text-base">
                場景 {step + 1} / {randomizedQuestions.length}
              </div>
              <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    退出練習
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>確認退出？</AlertDialogTitle>
                    <AlertDialogDescription>
                      您確定要退出情境練習嗎？進度將會重置。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>繼續練習</AlertDialogCancel>
                    <AlertDialogAction onClick={handleExit}>
                      確認退出
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <current.icon className="h-6 w-6 mr-3" />
                <h2 className="text-xl font-semibold">{current.title}</h2>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                {current.dialogue.map((line, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <p className="text-base leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={handlePrevious} 
                variant="outline"
                disabled={step === 0}
              >
                上一個場景
              </Button>
              <Button onClick={handleNext}>
                {step === randomizedQuestions.length - 1 ? "完成練習" : "下一個場景"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-4">練習完成！</div>
            <div className="text-lg mb-6 text-center">
              <p>恭喜您完成了所有 {randomizedQuestions.length} 個情境練習！</p>
              <p>希望這些對話場景對您的日文學習有幫助。</p>
            </div>
            
            {!showAnswers ? (
              <div className="space-y-2 w-full">
                <Button onClick={handleShowAnswers} variant="default" className="w-full">
                  查看所有答案
                </Button>
                <Button onClick={handleRestart} variant="outline" className="w-full">
                  重新練習
                </Button>
                <Button onClick={handleBack} variant="secondary" className="w-full">
                  回到首頁
                </Button>
              </div>
            ) : (
              <div className="w-full">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-bold">所有場景答案</h2>
                  <Button onClick={handleHideAnswers} variant="outline" size="sm">
                    隱藏答案
                  </Button>
                </div>
                
                <div className="space-y-6 mb-6 max-h-96 overflow-y-auto">
                  {randomizedQuestions.map((scenario, index) => (
                    <div key={scenario.id} className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <scenario.icon className="h-5 w-5 mr-2" />
                        <h3 className="font-semibold">{scenario.title}</h3>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
                        {scenario.answer.map((line, lineIndex) => (
                          <div key={lineIndex} className="mb-2 last:mb-0">
                            <p className="text-sm leading-relaxed">{line}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Button onClick={handleRestart} variant="outline" className="w-full">
                    重新練習
                  </Button>
                  <Button onClick={handleBack} variant="default" className="w-full">
                    回到首頁
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioQuiz;
