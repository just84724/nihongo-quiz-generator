
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 選擇題型別定義
type ChoiceQuestion = {
  question: string;
  options: string[];
  answer: string;
};

// 選擇題題庫
const choiceQuestions: ChoiceQuestion[] = [
  {
    question: "新しいパソコン（＿）欲しい",
    options: ["A が", "B で", "C に", "D を"],
    answer: "A が"
  },
  {
    question: "あそこ（＿）白いビル（＿）あります",
    options: ["A に、が", "B で、は", "C が、に", "D を、で"],
    answer: "A に、が"
  },
  {
    question: "彼女と銀行の前（＿）会いました",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で"
  },
  {
    question: "友達は日曜日に家（＿）来ました",
    options: ["A が", "B で", "C に", "D を"],
    answer: "C に"
  },
  {
    question: "電子レンジ（＿）肉饅を温める",
    options: ["A が", "B で", "C に", "D を"],
    answer: "B で"
  }
];

const ChoiceQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = choiceQuestions[step];

  const handleSelect = (option: string) => setSelected(option);
  
  const handleNext = () => {
    if (selected === current.answer) setScore(score + 1);
    setSelected(null);
    if (step < choiceQuestions.length - 1) setStep(step + 1);
    else setFinished(true);
  };

  const handleRestart = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  const handleBack = () => navigate("/");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full bg-white dark:bg-card text-foreground shadow-lg rounded-lg p-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">助詞練習題（選擇題）</h1>
        </div>
        
        {!finished ? (
          <>
            <div className="mb-4">
              <div className="text-base mb-2">
                第 {step + 1} / {choiceQuestions.length} 題
              </div>
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
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-6">
              完成！你的分數：{score} / {choiceQuestions.length}
            </div>
            <div className="space-y-2">
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
    </div>
  );
};

export default ChoiceQuiz;
