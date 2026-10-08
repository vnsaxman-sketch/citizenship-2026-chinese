export type Topic =
  | "government"
  | "rights"
  | "history"
  | "geography"
  | "symbols"
  | "holidays";

export interface CitizenshipQuestion {
  id: number;
  topic: Topic;
  questionEn: string;
  questionZh: string;
  acceptedAnswersEn: string[];
  answerZh: string;
  explanationEn: string;
  explanationZh: string;
  studyTipEn: string;
  studyTipZh: string;
  isSixtyFiveTwenty: boolean;
  needsCurrentOfficial: boolean;
  lastVerified: string;
}

