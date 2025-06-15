
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ChoiceQuiz from "./pages/ChoiceQuiz";
import BlankQuiz from "./pages/BlankQuiz";
import ScenarioQuiz from "./pages/ScenarioQuiz";
import AdjectiveQuiz from "./pages/AdjectiveQuiz";
import GivingReceivingQuiz from "./pages/GivingReceivingQuiz";
import AuxiliaryVerbQuiz from "./pages/AuxiliaryVerbQuiz";
import TranslationQuiz from "./pages/TranslationQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/choice-quiz" element={<ChoiceQuiz />} />
            <Route path="/blank-quiz" element={<BlankQuiz />} />
            <Route path="/scenario-quiz" element={<ScenarioQuiz />} />
            <Route path="/adjective-quiz" element={<AdjectiveQuiz />} />
            <Route path="/giving-receiving-quiz" element={<GivingReceivingQuiz />} />
            <Route path="/auxiliary-verb-quiz" element={<AuxiliaryVerbQuiz />} />
            <Route path="/translation-quiz" element={<TranslationQuiz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
