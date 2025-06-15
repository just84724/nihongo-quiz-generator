import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations = {
  zh: {
    // 網站標題和描述
    siteTitle: "日語助詞與形容詞練習平台",
    siteDescription: "專業的日語學習工具",
    chooseMode: "選擇練習模式",
    
    // 練習模式
    particleChoice: "助詞練習題（選擇題）",
    particleFillBlank: "助詞練習題（填充題）",
    scenarioPractice: "情境練習題",
    adjectivePractice: "形容詞變化練習",
    givingReceivingPractice: "授受動詞文法練習",
    
    // 描述文字
    practiceDescription: "練習日文助詞的使用方法",
    modeExplanation: "選擇題有標準答案，填充題為自由練習，情境練習題為對話場景",
    adjectiveExplanation: "形容詞變化練習可以學習い形容詞和な形容詞的各種變化形式",
    givingReceivingExplanation: "授受動詞練習包含くれる、あげる、もらう的用法練習",
    
    // 通用按鈕
    back: "返回",
    exit: "離開",
    restart: "重新開始",
    next: "下一題",
    finish: "完成",
    viewAnswers: "查看答案",
    
    // 情境練習
    scenarioWelcome: "歡迎來到情境練習！",
    scenarioDescription: "這裡有 6 個不同場景的日文對話，讓您練習日常會話。",
    startPractice: "開始練習",
    exitPractice: "退出練習",
    continuePractice: "繼續練習",
    confirmExit: "確認退出",
    exitConfirmMessage: "您確定要退出情境練習嗎？進度將會重置。",
    scenarioComplete: "練習完成！",
    scenarioCompleteMessage: "恭喜您完成了所有 {count} 個情境練習！",
    incorrectAnswersCount: "您有 {count} 處回答錯誤。",
    allCorrect: "太棒了，全部答對！",
    viewIncorrectAnswers: "查看錯誤答案",
    viewAllAnswers: "查看所有答案",
    restartPractice: "重新練習",
    backToHome: "回到首頁",
    hide: "隱藏",
    incorrectAnswersList: "錯誤答案列表",
    allScenarioAnswers: "所有場景答案",
    yourAnswer: "你的答案：",
    correctAnswer: "正確答案：",
    notFilled: "（未填寫）",
    enterJapaneseTranslation: "請輸入日文翻譯",
    nextScenario: "下一個場景",
    previousScenario: "上一個場景",
    finishPractice: "完成練習",
    dialogueSegments: "段對話",
    
    // 場景標題
    scenario1: "場景一：機場",
    scenario2: "場景二：飛機上",
    scenario3: "場景三：家里",
    scenario4: "場景四：商場",
    scenario5: "場景五：從電影院出來",
    scenario6: "場景六：機場",
    
    // 形容詞練習
    selectPracticeMode: "選擇練習模式",
    negativeForm: "否定形練習（くない / でない）",
    negativePastForm: "否定形（過去）練習（くなかった / でなかった）",
    conjunctiveForm: "中止形練習（くて / で）",
    conditionalForm: "仮定形練習（ければ / なら）",
    presumptiveForm: "推量法練習（かろう / だろう）",
    pastForm: "過去法練習（かった / だった）",
    adverbForm: "副詞法練習（く / に）",
    enterConjugatedAdjective: "請輸入變化後的形容詞",
    iAdjective: "い形容詞",
    naAdjective: "な形容詞",
    enterChangedForm: "請填入變化後的形式：{base} → ?",
    practiceCompleted: "練習完成！",
    totalQuestions: "總題數：",
    correct: "答對：",
    incorrect: "答錯：",
    accuracy: "正確率：",
    incorrectQuestions: "錯誤題目：",
    practiceAgain: "再練一次",
    exitQuestion: "你是否要退出？",
    exitMessage: "退出後將顯示你目前的答題情況和正確答案。",
    continueAnswering: "繼續答題",
    exitNow: "退出",
    previousAnswersTitle: "你之前寫的題目以及答案",
    completedStatus: "已完成 {answered} 題，答對 {correct} 題，答錯 {incorrect} 題",
    close: "關閉",
    
    // 選擇題
    choiceQuizTitle: "助詞練習題（選擇題）",
    
    // 填充題
    fillBlankQuizTitle: "助詞練習題（填充題）",
    
    // 404頁面
    pageNotFound: "頁面未找到"
  },
  en: {
    // 網站標題和描述
    siteTitle: "Japanese Particles & Adjectives Practice Platform",
    siteDescription: "Professional Japanese Learning Tool",
    chooseMode: "Choose Practice Mode",
    
    // 練習模式
    particleChoice: "Particle Practice (Multiple Choice)",
    particleFillBlank: "Particle Practice (Fill in the Blank)",
    scenarioPractice: "Scenario Practice",
    adjectivePractice: "Adjective Conjugation Practice",
    givingReceivingPractice: "Giving & Receiving Verbs Practice",
    
    // 描述文字
    practiceDescription: "Practice using Japanese particles correctly",
    modeExplanation: "Multiple choice has standard answers, fill-in-the-blank is free practice, scenario practice features dialogue situations",
    adjectiveExplanation: "Adjective conjugation practice helps you learn various forms of i-adjectives and na-adjectives",
    givingReceivingExplanation: "Practice the usage of giving and receiving verbs: kureru, ageru, morau",
    
    // 通用按鈕
    back: "Back",
    exit: "Exit",
    restart: "Restart",
    next: "Next",
    finish: "Finish",
    viewAnswers: "View Answers",
    
    // 情境練習
    scenarioWelcome: "Welcome to Scenario Practice!",
    scenarioDescription: "Here are 6 different Japanese dialogue scenarios for you to practice daily conversation.",
    startPractice: "Start Practice",
    exitPractice: "Exit Practice",
    continuePractice: "Continue Practice",
    confirmExit: "Confirm Exit",
    exitConfirmMessage: "Are you sure you want to exit scenario practice? Progress will be reset.",
    scenarioComplete: "Practice Complete!",
    scenarioCompleteMessage: "Congratulations! You've completed all {count} scenario practices!",
    incorrectAnswersCount: "You have {count} incorrect answers.",
    allCorrect: "Excellent, all correct!",
    viewIncorrectAnswers: "View Incorrect Answers",
    viewAllAnswers: "View All Answers",
    restartPractice: "Restart Practice",
    backToHome: "Back to Home",
    hide: "Hide",
    incorrectAnswersList: "Incorrect Answers List",
    allScenarioAnswers: "All Scenario Answers",
    yourAnswer: "Your answer: ",
    correctAnswer: "Correct answer: ",
    notFilled: "(Not filled)",
    enterJapaneseTranslation: "Enter Japanese translation",
    nextScenario: "Next Scenario",
    previousScenario: "Previous Scenario",
    finishPractice: "Finish Practice",
    dialogueSegments: "dialogue segments",
    
    // 場景標題
    scenario1: "Scenario 1: Airport",
    scenario2: "Scenario 2: On the Plane", 
    scenario3: "Scenario 3: At Home",
    scenario4: "Scenario 4: Shopping Mall",
    scenario5: "Scenario 5: Leaving the Cinema",
    scenario6: "Scenario 6: Airport",
    
    // Scenario dialogue translations
    scenario1_dialogue: [
      "A: Sorry.",
      "B: You're late.",
      "A: Yeah, there was some traffic.",
      "B: Oh no, I lost my passport.",
      "A: Isn't it in your bag?",
      "B: No, I just took it out to look at it.",
      "A: Oh, I see it, it's under the chair.",
      "B: Ah, here it is. What time is it now?",
      "A: It's 12 o'clock.",
      "B: It's almost time to check in.",
      "A: Yeah. Let's go."
    ],
    scenario2_dialogue: [
      "A: Wake up, chat with me.",
      "B: Ugh, I'm a bit sleepy.",
      "A: What did you do last night?",
      "B: I was playing computer games all night. Too excited, couldn't sleep.",
      "A: Let's plan our vacation.",
      "B: Sure.",
      "A: Today is Friday, do you have time this Sunday?",
      "B: Sunday? No, I don't.",
      "A: How about next Wednesday?",
      "B: Wednesday is fine.",
      "A: Okay, let's meet at 10 AM Wednesday at McDonald's entrance.",
      "B: Alright, see you then.",
      "(Announcement: The plane is about to land, please prepare. Today is July 15th, Friday, outdoor temperature is 35°C. Have a pleasant journey.)"
    ],
    scenario3_dialogue: [
      "A: Good morning! You're up early!",
      "B: Yeah, I'm going shopping with friends today.",
      "A: It might rain today, remember to bring an umbrella.",
      "B: Okay, got it.",
      "A: What time will you be back tonight?",
      "B: Around 7 PM.",
      "A: Will you come back for dinner?",
      "B: No, we'll eat out.",
      "A: Okay, have fun.",
      "B: Bye."
    ],
    scenario4_dialogue: [
      "A: Good morning!",
      "B: Good morning!",
      "A: The second floor sells bags, let's go take a look.",
      "B: Sure!",
      "A: Look at this bag, it's so cute.",
      "B: Yeah, really! How much is it?",
      "A: 2100 yen.",
      "B: Wow, a bit expensive.",
      "A: That one's not bad either.",
      "B: Yeah, let's go look.",
      "A: Wow, this one's even more expensive.",
      "B: I think this one's pretty good.",
      "A: It's beautiful and cheap, let's buy this one.",
      "B: Okay, good.",
      "A: Where should we go next?",
      "B: Let's go watch a movie.",
      "A: Sure."
    ],
    scenario5_dialogue: [
      "A: What a boring movie.",
      "B: Yeah, I almost fell asleep.",
      "A: I'm a bit hungry, let's go eat dinner before going home.",
      "B: Sure, what do you want to eat?",
      "A: How about sushi?",
      "B: No, we just had it yesterday. How about steak?",
      "A: Sure.",
      "B: For dessert, I want matcha ice cream.",
      "A: Yeah, matcha ice cream is delicious, it's my favorite too.",
      "B: Let's go."
    ],
    scenario6_dialogue: [
      "A: The vacation went by so fast.",
      "B: Yeah, but it was also very enjoyable.",
      "A: Where did you go during this vacation?",
      "B: I traveled to Beijing. It was so hot. Then I just stayed home watching TV and surfing the internet. How about you?",
      "A: I didn't go anywhere. Usually just stayed home alone. Occasionally went to the park with my parents on weekends.",
      "B: That sounds nice too.",
      "(Announcement: Passengers on flight AC087, the plane is about to take off, please go to gate 17 to prepare for boarding.)",
      "A: The boring days are about to start again.",
      "B: Sigh, yeah, really looking forward to the next vacation."
    ]
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = translations[language][key as keyof typeof translations.zh] || key;
    
    // Replace parameters in the text
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
