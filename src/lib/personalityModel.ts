// MBTI（ユング心理学に基づく4次元の二項対立モデル）準拠
// 人柄・行動特性の完全MECE（モレなくダブりのない）マスタ定義

export interface PersonalityAxis {
  id: "EI" | "SN" | "TF" | "JP";
  name: string;
  description: string;
  optionA: {
    code: "E" | "S" | "T" | "J";
    label: string;
    subLabel: string;
    summary: string;
    badgeColor: string;
  };
  optionB: {
    code: "I" | "N" | "F" | "P";
    label: string;
    subLabel: string;
    summary: string;
    badgeColor: string;
  };
}

export const PERSONALITY_AXES: PersonalityAxis[] = [
  {
    id: "EI",
    name: "エネルギーの方向",
    description: "行動や対人関係でどのようにエネルギーを発揮するか",
    optionA: {
      code: "E",
      label: "発信・オープン型",
      subLabel: "Extravert",
      summary: "自ら積極的に発信し、周囲を巻き込んで場を推進する",
      badgeColor: "bg-blue-50 text-blue-900 border-blue-200",
    },
    optionB: {
      code: "I",
      label: "傾聴・集中型",
      subLabel: "Introvert",
      summary: "相手の話を深く受け止め、1つの課題にじっくり深く集中する",
      badgeColor: "bg-indigo-50 text-indigo-900 border-indigo-200",
    },
  },
  {
    id: "SN",
    name: "着眼点・情報認識",
    description: "物事や課題をどのような視点から捉えるか",
    optionA: {
      code: "S",
      label: "現実・着実型",
      subLabel: "Sensing",
      summary: "目の前の事実やデータを重んじ、具体的に一歩一歩積み上げる",
      badgeColor: "bg-emerald-50 text-emerald-900 border-emerald-200",
    },
    optionB: {
      code: "N",
      label: "ビジョン・発想型",
      subLabel: "Intuition",
      summary: "全体像や新しい可能性にワクワクし、本質やアイデアを追求する",
      badgeColor: "bg-teal-50 text-teal-900 border-teal-200",
    },
  },
  {
    id: "TF",
    name: "判断・意思決定基準",
    description: "チームや仕事で判断を下す際に何を最も重視するか",
    optionA: {
      code: "T",
      label: "論理・合理型",
      subLabel: "Thinking",
      summary: "筋道や客観的なファクトを重んじ、合理的に課題を解決する",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    },
    optionB: {
      code: "F",
      label: "共感・調和型",
      subLabel: "Feeling",
      summary: "人の気持ちやチームの調和を最優先し、温かく寄り添う",
      badgeColor: "bg-rose-50 text-rose-900 border-rose-200",
    },
  },
  {
    id: "JP",
    name: "行動様式・進め方",
    description: "目標達成やスケジュールに対してどう進めるか",
    optionA: {
      code: "J",
      label: "計画・完遂型",
      subLabel: "Judging",
      summary: "計画を立て、決めたことを最後まで規律正しくやり切る",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
    },
    optionB: {
      code: "P",
      label: "柔軟・スピード型",
      subLabel: "Perceiving",
      summary: "状況変化に臨機応変に対応し、フットワーク軽く即応する",
      badgeColor: "bg-cyan-50 text-cyan-900 border-cyan-200",
    },
  },
];

export interface PersonalityProfile {
  code: string; // 例: "ESTJ", "INFP"
  title: string;
  catchphrase: string;
}

export const PERSONALITY_16_TYPES: Record<string, PersonalityProfile> = {
  ESTJ: { code: "ESTJ", title: "実行推進リーダー", catchphrase: "計画性と実行力で組織を力強く牽引するリーダー" },
  ESTP: { code: "ESTP", title: "実践スピード開拓者", catchphrase: "圧倒的な行動力と臨機応変さで道を切り拓く実力派" },
  ESFJ: { code: "ESFJ", title: "信頼の調和オーガナイザー", catchphrase: "周囲への気配りと責任感でチームの一体感を創る" },
  ESFP: { code: "ESFP", title: "情熱ムードメーカー", catchphrase: "持ち前の明るさと柔軟性で周囲に活力を与える" },
  ENTJ: { code: "ENTJ", title: "戦略ビジョナリー", catchphrase: "高い視座と論理的思考で大きな目標を具現化する" },
  ENTP: { code: "ENTP", title: "アイデア創出イノベーター", catchphrase: "柔軟な発想力と知的好奇心で新しい可能性を切り拓く" },
  ENFJ: { code: "ENFJ", title: "共感インスパイア", catchphrase: "人の成長とビジョンを信じ、チームを温かく導く" },
  ENFP: { code: "ENFP", title: "熱中型チャレンジャー", catchphrase: "豊かな発想とポジティブな行動力で周囲を巻き込む" },
  ISTJ: { code: "ISTJ", title: "堅実完遂プロフェッショナル", catchphrase: "徹底した誠実さと責任感で確実に成果を積み上げる" },
  ISTP: { code: "ISTP", title: "冷静沈着エンジニア", catchphrase: "高い集中力と柔軟な問題解決力で着実に結果を出す" },
  ISFJ: { code: "ISFJ", title: "温厚サポーター", catchphrase: "細やかな気配りと着実な実行力で組織を支える" },
  ISFP: { code: "ISFP", title: "自然体クリエイター", catchphrase: "独自の感性と温かい心で調和と価値を生み出す" },
  INTJ: { code: "INTJ", title: "論理アーキテクト", catchphrase: "本質を見抜く洞察力と戦略性で課題を抜本解決する" },
  INTP: { code: "INTP", title: "探求アナリスト", catchphrase: "深い論理的思考と好奇心で複雑な課題の解を見出す" },
  INFJ: { code: "INFJ", title: "信念のガイド", catchphrase: "深い共感力と明確な信念で理想の実現に尽力する" },
  INFP: { code: "INFP", title: "誠実な理想追求者", catchphrase: "自らの価値観を大切にし、誠実に向き合い続ける" },
};

// 4つの選択からMBTIコード（"ESTJ"など）を算出
export function calculatePersonalityCode(selections: {
  EI: "E" | "I";
  SN: "S" | "N";
  TF: "T" | "F";
  JP: "J" | "P";
}): string {
  return `${selections.EI}${selections.SN}${selections.TF}${selections.JP}`;
}

// コードからラベル配列（タグ名）を取得
export function getPersonalityLabelsFromCode(code: string): string[] {
  const result: string[] = [];
  if (!code || code.length < 4) return ["発信・オープン型", "現実・着実型", "共感・調和型", "柔軟・スピード型"];

  const ei = code[0] === "E" ? "発信・オープン型" : "傾聴・集中型";
  const sn = code[1] === "S" ? "現実・着実型" : "ビジョン・発想型";
  const tf = code[2] === "T" ? "論理・合理型" : "共感・調和型";
  const jp = code[3] === "J" ? "計画・完遂型" : "柔軟・スピード型";

  return [ei, sn, tf, jp];
}
