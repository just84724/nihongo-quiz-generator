
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const questions: Question[] = [
  {
    question: "新しいパソコン（＿）欲しい",
    options: ["A が", "B で", "C に", "D を"],
    answer: "A が",
  },
  {
    question: "あそこ（＿）白いビル（＿）あります",
    options: ["A に、を", "B で、が", "C に、が", "D を、で"],
    answer: "C に、が",
  },
  {
    question: "彼女と銀行の前(＿)会いました",
    options: ["A に", "B で", "C へ", "D を"],
    answer: "B で",
  },
  {
    question: "友達は日曜日に家（＿）来ました",
    options: ["A で", "B を", "C に", "D は"],
    answer: "C に",
  },
  {
    question: "電子レンジ(＿)肉饅を温める",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で",
  },
  {
    question: "動物の中(＿)鼠が一番嫌いです",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で",
  },
  {
    question: "これは皆(＿)頑張った結果です",
    options: ["A に", "B で", "C が", "D を"],
    answer: "B で",
  },
  {
    question: "朝ご飯は  たまご(＿)ソーセージです",
    options: ["A と", "B で", "C に", "D を"],
    answer: "A と",
  },
  {
    question: "毎日7時(＿)　おきます",
    options: ["A で", "B を", "C に", "D が"],
    answer: "C に",
  },
  {
    question: "私は車(＿)　ありません",
    options: ["A が", "B で", "C に", "D を"],
    answer: "A が",
  },
  {
    question: "毎日コーヒー(＿)飲みます",
    options: ["A が", "B で", "C に", "D を"],
    answer: "D を",
  },
  {
    question: "昨日レストラン(＿)晩ご飯を食べました",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で",
  },
  {
    question: "休みに どこ(＿)行きますか",
    options: ["A を", "B で", "C へ", "D が"],
    answer: "C へ",
  },
  {
    question: "仕事は午前9時から午後6時(＿)です",
    options: ["A で", "B が", "C に", "D まで"],
    answer: "D まで",
  },
  {
    question: "私は今学校(＿) います",
    options: ["A が", "B で", "C に", "D を"],
    answer: "C に",
  },
  {
    question: "友達(＿) 日本人です",
    options: ["A は", "B が", "C で", "D を"],
    answer: "A は",
  },
  {
    question: "母は寿司(＿) 好きです",
    options: ["A と", "B は", "C が", "D を"],
    answer: "C が",
  },
  {
    question: "ここでバス（＿）のります",
    options: ["A を", "B が", "C に", "D と"],
    answer: "C に",
  },
  {
    question: "銀行の前でバス（＿）おります",
    options: ["A を", "B が", "C に", "D を"],
    answer: "D を",
  },
  {
    question: "母（＿）朝ご飯を作ってもらいました",
    options: ["A は", "B が", "C に", "D を"],
    answer: "C に",
  },
  {
    question: "そこ（＿）ゴミ箱（＿）置いてある",
    options: ["A で、を", "B が、に", "C に、が", "D を、が"],
    answer: "C に、が",
  },
  {
    question: "来週、家（＿）パーティーをやります",
    options: ["A で", "B で", "C に", "D と"],
    answer: "B で",
  },
  {
    question: "カットだけで２万円（＿）かかりますか",
    options: ["A に", "B も", "C で", "D を"],
    answer: "B も",
  },
  {
    question: "子供の頃のこと（＿）覚えていますか",
    options: ["A で", "B が", "C に", "D を"],
    answer: "D を",
  },
  {
    question: "道（＿）迷ったら怖いよ",
    options: ["A を", "B が", "C に", "D で"],
    answer: "C に",
  },
  {
    question: "バス(＿)遅れないように、早く起きました",
    options: ["A が", "B で", "C に", "D を"],
    answer: "C に",
  },
  // 為了篇幅考量，只先放入部分題目，如需全部題庫請再提出
];

const Index: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[step];

  const handleSelect = (option: string) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === current.answer) {
      setScore(score + 1);
    }
    setSelected(null);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">日文選擇題練習網站</h1>
        {!finished ? (
          <>
            <div className="mb-4">
              <div className="text-base mb-2">第 {step + 1} / {questions.length} 題</div>
              <div className="text-xl font-medium mb-4 text-center"> {current.question}</div>
              <div className="space-y-2">
                {current.options.map((option) => (
                  <Button
                    key={option}
                    variant={selected === option ? "secondary" : "outline"}
                    className="w-full text-base"
                    onClick={() => handleSelect(option)}
                    disabled={!!selected}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            {selected && (
              <div className="flex justify-between items-center mt-4">
                <div>
                  {selected === current.answer ? (
                    <span className="text-green-600 font-medium">答對了！</span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      答錯了，正確答案是 {current.answer}
                    </span>
                  )}
                </div>
                <Button variant="default" onClick={handleNext}>
                  {step === questions.length - 1 ? "看分數" : "下一題"}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-6">
              完成！你的分數：{score} / {questions.length}
            </div>
            <Button onClick={handleRestart} variant="outline">
              再練一次
            </Button>
          </div>
        )}
      </div>
      <div className="mt-3 text-sm text-muted-foreground">
        題目來源：您自訂的日文語法選擇題
      </div>
    </div>
  );
};

export default Index;
