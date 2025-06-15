
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 填空題型別定義
type BlankQuestion = {
  question: string;
};

// 填空題題庫
const blankQuestions: BlankQuestion[] = [
  { question: "新しいパソコン（＿）欲しい" },
  { question: "あそこ（＿）白いビル（＿）あります" },
  { question: "彼女と銀行の前（＿）会いました" },
  { question: "友達は日曜日に家（＿）来ました" },
  { question: "電子レンジ（＿）肉饅を温める" },
  { question: "動物の中（＿）鼠が一番嫌いです" },
  { question: "これは皆（＿）頑張った結果です" },
  { question: "朝ご飯は たまご（＿）ソーセージです" },
  { question: "毎日7時（＿）おきます" },
  { question: "私は車（＿）ありません" },
  { question: "毎日コーヒー（＿）飲みます" },
  { question: "昨日レストラン（＿）晩ご飯を食べました" },
  { question: "休みに どこ（＿）行きますか" },
  { question: "仕事は午前9時から午後6時（＿）です" },
  { question: "私は今学校（＿）います" },
  { question: "友達（＿）日本人です" },
  { question: "母は寿司（＿）好きです" },
  { question: "ここでバス（＿）のります" },
  { question: "銀行の前でバス（＿）おります" },
  { question: "母（＿）朝ご飯を作ってもらいました" }
];

const BlankQuizComponent: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [finished, setFinished] = useState(false);

  const current = blankQuestions[step];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValue("");
    if (step < blankQuestions.length - 1) setStep(step + 1);
    else setFinished(true);
  };

  const handleRestart = () => {
    setStep(0);
    setValue("");
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
          <h1 className="text-2xl font-bold">助詞練習題（填充題）</h1>
        </div>
        
        {!finished ? (
          <>
            <div className="mb-4">
              <div className="text-base mb-2">
                第 {step + 1} / {blankQuestions.length} 題
              </div>
              <form onSubmit={handleSubmit}>
                <div className="text-xl font-medium mb-4 text-center">{current.question}</div>
                <Input
                  placeholder="請輸入助詞"
                  className="mb-4"
                  value={value}
                  onChange={handleChange}
                  autoFocus
                />
                <Button type="submit" disabled={value === ""} className="w-full">
                  下一題
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold mb-6">
              練習完成！
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

export default BlankQuizComponent;
