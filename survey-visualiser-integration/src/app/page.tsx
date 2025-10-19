"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card";
import { openTriviaDB, Questions, processQuestionsData } from "@/hooks/questionsApi";
import { ApiError, decodeHtmlEntities } from "@/hooks/apiClient";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

export default function Dashboard() {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [type, setType] = useState<string>('category');
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const uniqueCategories = [...new Set(questions.map(q => decodeHtmlEntities(q.category)))];
  const filteredQuestions = selectedCategory
    ? questions.filter(q => decodeHtmlEntities(q.category) === selectedCategory)
    : questions;
  const chartData = processQuestionsData(filteredQuestions, type);

  useEffect(() => {
    openTriviaDB.getOpenTriviaQuestions()
      .then(data => {
        setQuestions(data.results);
        setError(null);
      })
      .catch((err: ApiError) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col h-32 justify-end space-y-3 my-10">
        <h1 className="font-bold">Open Trivia DB Visualizer</h1>
        <p>The mini visualization tool for Open Trivia DB</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="List of Categories" subtitle="Filter by category">
          <ul className="space-y-2 mt-2">
            {uniqueCategories.map((category, index) => (
              <li key={index} className="p-1">
                <button
                  className="w-full text-left hover:text-gray-400"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setSelectedCategory(null)}
            className="mt-4 w-full bg-button hover:bg-button-hover text-white p-2 rounded-lg"
          >
            Clear filter
          </button>
        </Card>
        <div className="col-span-3">
          <Card title="Barchart" subtitle={`Distribution of questions by ${type}`}>
            {error && (
              <div className="bg-red-600/70 text-red-700 px-4 py-3 rounded">
                <p className="font-bold">{error}</p>
              </div>
            )}
            <BarChart
              style={{width: '100%', maxHeight: '70vh', aspectRatio: '1'}}
              responsive data={chartData} barCategoryGap='15%'>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="count" fill="#2E4D8F"/>
            </BarChart>
            <div className="flex justify-between mt-4">
              <div className="space-x-4 space-y-4">
                <button
                  className="rounded-lg bg-button hover:bg-button-hover p-2"
                  onClick={() => setType('category')}
                >
                  By Category
                </button>
                <button
                  className="rounded-lg bg-button hover:bg-button-hover p-2"
                  onClick={() => setType('difficulty')}
                >
                  By Difficulty
                </button>
              </div>
              <p>
                Filter applied: {selectedCategory ? selectedCategory : 'None'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
