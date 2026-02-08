import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuizProps {
    category: string;
}

const QUIZ_DATA: Record<string, { question: string; options: string[]; answer: number; explanation: string }> = {
    "Music Marketing": {
        question: "What is the 'Active User' metric that Spotify now prioritizes?",
        options: [
            "Passive listens from algorithmic playlists",
            "Users who manually search for your song or save it",
            "Total number of monthly listeners",
            "The number of times a song is shared on Instagram"
        ],
        answer: 1,
        explanation: "Spotify pays ~4x more for 'Active Streams' (Search & Play) than passive algorithmic streams."
    },
    "Music Business": {
        question: "What is the main advantage of the 'User-Centric' royalty model?",
        options: [
            "It pays everyone the same amount per stream",
            "It pools all money into a big pot",
            "A fan's subscription money goes only to the artists they actually listen to",
            "It guarantees radio play for indie artists"
        ],
        answer: 2,
        explanation: "User-Centric models prevent 'Superstars' from taking money from niche artist fanbases."
    },
    "Music Production": {
        question: "Why is -14 LUFS no longer the 'Golden Rule' for mastering?",
        options: [
            "Spotify disabled normalization",
            "Louder masters always sound better",
            "Dense, limited tracks sound better when turned down than dynamic tracks",
            "It actually IS still the golden rule"
        ],
        answer: 2,
        explanation: "A dense -6 LUFS master turned down often retains more perceived density and consistency than a spiky -14 LUFS master."
    }
};

const QuizSection: React.FC<QuizProps> = ({ category }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Get the base quiz data
    const rawQuiz = QUIZ_DATA[category] || QUIZ_DATA["Music Business"];

    // Memoize the shuffled options so they don't reshuffle on every render
    // This runs once when the component mounts (or category changes)
    const { shuffledOptions, correctIndex } = useMemo(() => {
        // Create an array of indices [0, 1, 2, 3]
        const indices = rawQuiz.options.map((_, i) => i);

        // Shuffle the indices using Fisher-Yates
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // Map the shuffled indices to the actual options
        const newOptions = indices.map(i => rawQuiz.options[i]);

        // Find where the original correct answer (rawQuiz.answer) moved to
        const newCorrectIndex = indices.indexOf(rawQuiz.answer);

        return { shuffledOptions: newOptions, correctIndex: newCorrectIndex };
    }, [category]); // Only re-shuffle if category changes

    const handleSelect = (index: number) => {
        if (selected !== null) return; // Prevent changing answer
        setSelected(index);
        setIsCorrect(index === correctIndex);
    };

    return (
        <div className="my-16 p-8 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <HelpCircle size={120} className="text-purple-500" />
            </div>

            <h3 className="text-sm font-black text-purple-400 uppercase tracking-widest mb-4">Knowledge Check</h3>
            <h4 className="text-xl md:text-2xl font-bold text-white mb-8 pr-12">{rawQuiz.question}</h4>

            <div className="space-y-3 relative z-10">
                {shuffledOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={selected !== null}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group
                            ${selected === null
                                ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-purple-500/50'
                                : ''
                            }
                            ${selected !== null && idx === correctIndex
                                ? 'bg-green-500/20 border-green-500 text-green-200'
                                : ''
                            }
                            ${selected === idx && idx !== correctIndex
                                ? 'bg-red-500/20 border-red-500 text-red-200'
                                : ''
                            }
                            ${selected !== null && idx !== selected && idx !== correctIndex ? 'opacity-50' : ''}
                        `}
                    >
                        <span className="font-medium">{option}</span>
                        {selected !== null && idx === correctIndex && <CheckCircle className="text-green-400" size={20} />}
                        {selected === idx && idx !== correctIndex && <XCircle className="text-red-400" size={20} />}
                    </button>
                ))}
            </div>

            {selected !== null && (
                <div className={`mt-6 p-4 rounded-xl border ${isCorrect ? 'bg-green-900/10 border-green-500/30 text-green-300' : 'bg-red-900/10 border-red-500/30 text-red-300'}`}>
                    <p className="font-bold flex items-center gap-2 mb-1">
                        {isCorrect ? "Correct!" : "Not quite."}
                    </p>
                    <p className="text-sm opacity-90">{rawQuiz.explanation}</p>
                </div>
            )}
        </div>
    );
};

export default QuizSection;
