/**
 * JobSwipe 志望職種マスター定義
 */

export const JOB_CATEGORIES = [
  "総合職・ビジネス総合",
  "法人営業・ソリューション提案",
  "エンジニア・IT技術職",
  "マーケティング・SNS・広報",
  "企画・ディレクター",
  "デザイナー・クリエイティブ",
  "コンサルタント",
  "事務・バックオフィス",
  "職種問わず（ポテンシャル採用）",
] as const;

export type JobCategory = typeof JOB_CATEGORIES[number];

export interface JobFilterTab {
  id: string;
  label: string;
  matchCategories?: string[];
}

export const SWIPE_JOB_FILTERS: JobFilterTab[] = [
  { id: "all", label: "すべての職種" },
  { id: "sales", label: "営業・総合職", matchCategories: ["法人営業・ソリューション提案", "総合職・ビジネス総合"] },
  { id: "engineer", label: "エンジニア", matchCategories: ["エンジニア・IT技術職"] },
  { id: "marketing", label: "マーケ・広報", matchCategories: ["マーケティング・SNS・広報"] },
  { id: "planning", label: "企画・クリエイティブ", matchCategories: ["企画・ディレクター", "デザイナー・クリエイティブ"] },
  { id: "consulting", label: "コンサル・事務", matchCategories: ["コンサルタント", "事務・バックオフィス"] },
];
