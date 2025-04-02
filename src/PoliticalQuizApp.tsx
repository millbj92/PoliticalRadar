import React, { JSX, useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

type Axis =
  | "economic_policy"
  | "cultural_values"
  | "authority_governance"
  | "social_safety"
  | "global_local"
  | "tech_eco_balance"
  | "change_tolerance"
  | "moral_foundations";

type Question = {
  id: number;
  question: string;
  axis_impact: Partial<Record<Axis, number>>;
  scale: string[];
};

type Archetype = {
  name: string;
  dominant_axes: Axis[];
  conditions: Partial<Record<Axis, "low" | "mid" | "high">>;
  description: string;
};

const axes: Axis[] = [
  "economic_policy", "cultural_values", "authority_governance",
  "social_safety", "global_local", "tech_eco_balance",
  "change_tolerance", "moral_foundations"
];

const questions: Question[] = [
    {
      id: 1,
      question: "Public services like healthcare, education, and transportation should be run by the government to ensure universal access.",
      axis_impact: { economic_policy: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 2,
      question: "Competition in the free market is the best way to improve quality and drive innovation.",
      axis_impact: { economic_policy: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 3,
      question: "Higher taxes on the wealthy are necessary to reduce economic inequality.",
      axis_impact: { economic_policy: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 4,
      question: "It is better for the government to regulate industries to prevent harm to the public, even if it limits economic freedom.",
      axis_impact: { economic_policy: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 5,
      question: "Corporate profits should be capped to ensure workers receive fair compensation.",
      axis_impact: { economic_policy: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 6,
      question: "Societies should continually challenge long-held customs to make space for progress.",
      axis_impact: { cultural_values: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 7,
      question: "Maintaining cultural traditions is crucial for a healthy society, even if it means resisting change.",
      axis_impact: { cultural_values: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 8,
      question: "The government should promote traditional family values, even if it means limiting personal freedoms.",
      axis_impact: { cultural_values: -1, authority_governance: 0.5 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 9,
      question: "Art and media should be censored when they conflict with societal moral standards.",
      axis_impact: { cultural_values: -1, authority_governance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 10,
      question: "It is important to challenge the status quo and push for progressive reforms.",
      axis_impact: { cultural_values: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 11,
      question: "In times of crisis, governments should have expanded powers to maintain order—even if it limits some freedoms.",
      axis_impact: { authority_governance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 12,
      question: "No individual or group should hold unchecked authority, regardless of the situation.",
      axis_impact: { authority_governance: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 13,
      question: "Police should have more authority to maintain public order and prevent crime, even if it means sacrificing civil liberties.",
      axis_impact: { authority_governance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 14,
      question: "A strong central government is necessary to ensure stability and protect the public from external threats.",
      axis_impact: { authority_governance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 15,
      question: "Governments should not impose laws that infringe on personal freedoms, even if they are meant to protect society as a whole.",
      axis_impact: { authority_governance: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 16,
      question: "Universal basic income should be implemented to ensure that no one falls below the poverty line.",
      axis_impact: { social_safety: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 17,
      question: "People should be given a safety net in times of economic hardship, regardless of the cause.",
      axis_impact: { social_safety: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 18,
      question: "The government should have the power to implement policies that promote wealth redistribution to achieve greater equality.",
      axis_impact: { social_safety: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 19,
      question: "Charity should replace government welfare programs to encourage personal responsibility and reduce dependency.",
      axis_impact: { social_safety: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 20,
      question: "Everyone should be responsible for their own success or failure; government involvement often makes things worse.",
      axis_impact: { social_safety: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 21,
      question: "National borders are outdated—we need to think globally to solve global problems.",
      axis_impact: { global_local: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 22,
      question: "Nations should prioritize their own citizens and protect their unique identity and interests first.",
      axis_impact: { global_local: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 23,
      question: "Global cooperation is essential to tackle issues like climate change, poverty, and war.",
      axis_impact: { global_local: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 24,
      question: "It is important to prioritize local businesses and workers over international trade agreements.",
      axis_impact: { global_local: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 25,
      question: "Internationalism should take precedence over national sovereignty in the pursuit of global peace and prosperity.",
      axis_impact: { global_local: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 26,
      question: "Technology will solve most of the world’s problems if we invest in it and embrace innovation.",
      axis_impact: { tech_eco_balance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 27,
      question: "Unchecked technological progress risks destroying the environment and alienating humanity.",
      axis_impact: { tech_eco_balance: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 28,
      question: "We should focus more on developing sustainable technologies that protect the environment rather than maximizing economic growth.",
      axis_impact: { tech_eco_balance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 29,
      question: "Technological advancements should be regulated to ensure they don’t have harmful consequences for society and the environment.",
      axis_impact: { tech_eco_balance: 1, authority_governance: 0.5 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 30,
      question: "The rapid advancement of artificial intelligence and biotechnology should be embraced, even if it leads to significant societal disruption.",
      axis_impact: { tech_eco_balance: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 31,
      question: "Revolutions are sometimes necessary to uproot systems of oppression.",
      axis_impact: { change_tolerance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 32,
      question: "Lasting progress comes from working within the system, not tearing it down.",
      axis_impact: { change_tolerance: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 33,
      question: "Major reforms should be implemented immediately to fix systemic issues like poverty and inequality.",
      axis_impact: { change_tolerance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 34,
      question: "Small, incremental changes are more effective than sweeping transformations.",
      axis_impact: { change_tolerance: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 35,
      question: "It’s better to challenge the system and push for radical change rather than trying to fit in and work with existing institutions.",
      axis_impact: { change_tolerance: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 36,
      question: "It’s more important to protect the vulnerable than to preserve tradition.",
      axis_impact: { moral_foundations: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 37,
      question: "Loyalty to your community and nation should take precedence over abstract ideals.",
      axis_impact: { moral_foundations: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 38,
      question: "Respect for authority and order is essential for a stable society, even if it means sacrificing some freedoms.",
      axis_impact: { moral_foundations: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 39,
      question: "Individuals should be free to express themselves however they like, even if it challenges social norms.",
      axis_impact: { moral_foundations: 1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    },
    {
      id: 40,
      question: "Maintaining purity (moral, religious, cultural) is vital to protecting society from corruption.",
      axis_impact: { moral_foundations: -1 },
      scale: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
    }
  ];

export default function PoliticalQuizApp(): JSX.Element {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [step, setStep] = useState<number>(0);
  const [results, setResults] = useState<any[] | null>(null);
  const [archetype, setArchetype] = useState<Archetype | null>(null);

  const handleAnswer = (score: number): void => {
    const q = questions[step];
    const next = { ...answers, [q.id]: score };
    setAnswers(next);

    if (step + 1 === questions.length) {
      calculateResults(next);
    } else {
      setStep(step + 1);
    }
  };

  const evaluateRange = (value: number): "low" | "mid" | "high" => {
    if (value <= -4) return "low";
    if (value >= 4) return "high";
    return "mid";
  };

  const calculateResults = (userAnswers: Record<number, number>): void => {
    const scores: Record<Axis, number> = Object.fromEntries(
      axes.map((axis) => [axis, 0])
    ) as Record<Axis, number>;

    questions.forEach((q) => {
      const userScore = userAnswers[q.id];
      for (const axis in q.axis_impact) {
        scores[axis as Axis] += (userScore - 2) * (q.axis_impact[axis as Axis] || 0);
      }
    });

    const evaluated: Record<Axis, "low" | "mid" | "high"> = Object.fromEntries(
      axes.map((axis) => [axis, evaluateRange(scores[axis])])
    ) as Record<Axis, "low" | "mid" | "high">;

    const archetypes: Archetype[] = [
      {
        name: "Techno-Progressive Localist",
        dominant_axes: ["cultural_values", "tech_eco_balance", "global_local"],
        conditions: {
          cultural_values: "high",
          tech_eco_balance: "high",
          global_local: "low"
        },
        description: "Embraces innovation and change, but believes in local solutions and preserving community identity."
      },
      {
        name: "Global Solidarity Advocate",
        dominant_axes: ["economic_policy", "social_safety", "global_local"],
        conditions: {
          economic_policy: "high",
          social_safety: "high",
          global_local: "high"
        },
        description: "Pushes for international justice, strong safety nets, and wealth equality through global cooperation."
      },
      {
        name: "Libertarian Reformist",
        dominant_axes: ["economic_policy", "authority_governance", "cultural_values"],
        conditions: {
          economic_policy: "low",
          authority_governance: "low",
          cultural_values: "high"
        },
        description: "Supports free markets and personal freedom, with moderate social reform."
      },
      {
        name: "Traditional Strong-State Nationalist",
        dominant_axes: ["cultural_values", "authority_governance", "global_local"],
        conditions: {
          cultural_values: "low",
          authority_governance: "high",
          global_local: "low"
        },
        description: "Emphasizes order, loyalty, and cultural preservation through centralized authority and nationalism."
      },
      {
        name: "Eco-Guardian Pragmatist",
        dominant_axes: ["tech_eco_balance", "change_tolerance", "economic_policy"],
        conditions: {
          tech_eco_balance: "low",
          change_tolerance: "low",
          economic_policy: "mid"
        },
        description: "Seeks a balanced approach between ecological sustainability and practical economic policies through slow reform."
      },
      {
        name: "Revolutionary Global Technocrat",
        dominant_axes: ["tech_eco_balance", "change_tolerance", "global_local"],
        conditions: {
          tech_eco_balance: "high",
          change_tolerance: "high",
          global_local: "high"
        },
        description: "Wants a radical global overhaul powered by science, technology, and international institutions."
      },
      {
        name: "Communitarian Conservative",
        dominant_axes: ["social_safety", "cultural_values", "change_tolerance"],
        conditions: {
          social_safety: "high",
          cultural_values: "low",
          change_tolerance: "low"
        },
        description: "Values community, tradition, and mutual support, favoring steady improvements to the existing order."
      },
      {
        name: "Radical Libertarian Disruptor",
        dominant_axes: ["authority_governance", "moral_foundations", "change_tolerance"],
        conditions: {
          authority_governance: "low",
          moral_foundations: "high",
          change_tolerance: "high"
        },
        description: "Wants to disrupt the system in pursuit of liberty and personal expression, with no tolerance for top-down control."
      },
      {
        name: "Moderate Centrist",
        dominant_axes: ["economic_policy", "social_safety", "authority_governance"],
        conditions: {
          economic_policy: "mid",
          social_safety: "mid",
          authority_governance: "mid"
        },
        description: "Advocates for balanced policies, avoiding extremes in economic, social, and governance issues."
      },
      {
        "name": "Cultural Preservationist",
        "dominant_axes": ["cultural_values", "global_local", "moral_foundations"],
        "conditions": {
          "cultural_values": "high",
          "global_local": "low",
          "moral_foundations": "high"
        },
        "description": "Focuses on preserving cultural traditions and moral values while resisting globalization."
      },
      {
        "name": "Progressive Technologist",
        "dominant_axes": ["tech_eco_balance", "change_tolerance", "economic_policy"],
        "conditions": {
          "tech_eco_balance": "high",
          "change_tolerance": "high",
          "economic_policy": "mid"
        },
        "description": "Believes in leveraging technology for progressive reforms while maintaining economic stability."
      },
      {
        "name": "Authoritarian Egalitarian",
        "dominant_axes": ["authority_governance", "social_safety", "economic_policy"],
        "conditions": {
          "authority_governance": "high",
          "social_safety": "high",
          "economic_policy": "high"
        },
        "description": "Supports a strong central government to enforce equality and provide robust social safety nets."
      },
      {
        "name": "Libertarian Minimalist",
        "dominant_axes": ["authority_governance", "economic_policy", "global_local"],
        "conditions": {
          "authority_governance": "low",
          "economic_policy": "low",
          "global_local": "low"
        },
        "description": "Advocates for minimal government intervention, free markets, and local autonomy."
      },
      {
        "name": "Global Environmentalist",
        "dominant_axes": ["tech_eco_balance", "global_local", "change_tolerance"],
        "conditions": {
          "tech_eco_balance": "low",
          "global_local": "high",
          "change_tolerance": "mid"
        },
        "description": "Prioritizes global cooperation to address environmental challenges through sustainable reforms."
      },
      {
        "name": "Traditionalist Isolationist",
        "dominant_axes": ["cultural_values", "global_local", "authority_governance"],
        "conditions": {
          "cultural_values": "low",
          "global_local": "low",
          "authority_governance": "high"
        },
        "description": "Focuses on preserving national identity and traditions through strong governance and isolationist policies."
      }
    ];

    const matched = archetypes.find((a) =>
      Object.entries(a.conditions).every(
        ([axis, value]) => evaluated[axis as Axis] === value
      )
    );

    console.log(evaluated, matched);
    console.log(scores);

    const chartData = axes.map((axis) => ({
      subject: axis.replace(/_/g, ' '),
      A: scores[axis],
      fullMark: 10
    }));

    setResults(chartData);
    setArchetype(matched || null);
  };

  if (results) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Political Belief Map</h1>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={results} outerRadius={150}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[-10, 10]} />
            <Radar name="You" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        {archetype && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Archetype: {archetype.name}</h2>
            <p className="text-gray-700 mt-2">{archetype.description}</p>
          </div>
        )}
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Question {step + 1} of {questions.length}</h1>
      <p className="mb-6">{q.question}</p>
      <div className="grid gap-2">
        {q.scale.map((label, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="px-4 py-2 rounded bg-blue-950 text-white hover:bg-blue-900"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
