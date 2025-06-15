
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BlankQuizProps {
  question: string;
  onSubmit: () => void;
  disabled?: boolean;
}

const BlankQuiz: React.FC<BlankQuizProps> = ({ question, onSubmit, disabled }) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValue("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-xl font-medium mb-4 text-center">{question}</div>
      <Input
        placeholder="請輸入答案"
        className="mb-4"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        autoFocus
      />
      <Button type="submit" disabled={disabled || value === ""} className="w-full">送出</Button>
    </form>
  );
};
export default BlankQuiz;
