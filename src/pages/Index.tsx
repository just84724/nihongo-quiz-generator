
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BlankQuiz from "@/components/BlankQuiz";

// 題型型別
type QuizType = "choice" | "blank";
type BaseQuestion = { question: string; type: QuizType; };

// 有選項、有標準解答的選擇題
type ChoiceQuestion = BaseQuestion & { type: "choice"; options: string[]; answer: string };

// 無標準解答、不顯示答案的填空題
type BlankQuestion = BaseQuestion & { type: "blank" }; // 你可以未來擴充答案檢查

type Question = ChoiceQuestion | BlankQuestion;

// 題庫
const questions: Question[] = [
  // 選擇題舊題庫，給一題示範
  {
    question: "新しいパソコン（＿）欲しい",
    options: ["A が", "B で", "C に", "D を"],
    answer: "A が",
    type: "choice"
  },
  // ...可繼續保留更多舊有選擇題

  // 以下為你給的填空題型
  { question: "あそこ（＿）白いビル（＿）あります", type: "blank" },
  { question: "彼女と銀行の前(＿)会いました", type: "blank" },
  { question: "友達は日曜日に家（＿）来ました", type: "blank" },
  { question: "電子レンジ(＿)肉饅を温める", type: "blank" },
  { question: "動物の中(＿)鼠が一番嫌いです", type: "blank" },
  { question: "これは皆(＿)頑張った結果です", type: "blank" },
  { question: "朝ご飯は  たまご(＿)ソーセージです", type: "blank" },
  { question: "毎日7時(＿)　おきます", type: "blank" },
  { question: "私は車(＿)　ありません", type: "blank" },
  { question: "毎日コーヒー(＿)飲みます", type: "blank" },
  { question: "昨日レストラン(＿)晩ご飯を食べました", type: "blank" },
  { question: "休みに どこ(＿)行きますか", type: "blank" },
  { question: "仕事は午前9時から午後6時(＿)です", type: "blank" },
  { question: "私は今学校(＿) います", type: "blank" },
  { question: "友達(＿) 日本人です", type: "blank" },
  { question: "母は寿司(＿) 好きです", type: "blank" },
  { question: "ここでバス（＿）のります", type: "blank" },
  { question: "銀行の前でバス（＿）おります", type: "blank" },
  { question: "母（＿）朝ご飯を作ってもらいました", type: "blank" },
  { question: "そこ（＿）ゴミ箱（＿）置いてある", type: "blank" },
  // ...可繼續擴充你的題庫
];

const Index: React.FC = () => {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[step];

  // 選擇題
  const handleSelect = (option: string) => setSelected(option);
  const handleNext = () => {
    if (current.type === "choice" && "answer" in current) {
      if (selected === current.answer) setScore(score + 1);
    }
    setSelected(null);
    if (step < questions.length - 1) setStep(step + 1);
    else setFinished(true);
  };

  // 填空題直接進下題，不顯示分數
  const handleBlankNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else setFinished(true);
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
        <h1 className="text-2xl font-bold mb-4 text-center">日文練習網站</h1>
        {!finished ? (
          <>
            <div className="mb-4">
              <div className="text-base mb-2">
                第 {step + 1} / {questions.length} 題
              </div>
              {current.type === "choice" && "options" in current ? (
                <>
                  <div className="text-xl font-medium mb-4 text-center">{current.question}</div>
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
                        下一題
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <BlankQuiz
                  question={current.question}
                  onSubmit={handleBlankNext}
                  disabled={false}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-6">
              {questions.some((q) => q.type === "choice")
                ? <>完成！你的分數：{score} / {questions.filter(q => q.type === "choice").length}</>
                : <>練習完成！</>
              }
            </div>
            <Button onClick={handleRestart} variant="outline">
              再練一次
            </Button>
          </div>
        )}
      </div>
      <div className="mt-3 text-sm text-muted-foreground">
        題目來源：您自訂的日文語法練習題
      </div>
    </div>
  );
};

export default Index;
