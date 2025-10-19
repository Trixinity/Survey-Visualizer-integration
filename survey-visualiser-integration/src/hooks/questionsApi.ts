import { apiRequest, decodeHtmlEntities } from './apiClient';

interface ApiResponse {
  response_code: number;
  results: Questions[];
}

export interface Questions {
  type: string;
  difficulty: string;
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
}

/**
 * Only supports the GET endpoint from Open Trivia DB.
 * Can be extended in the future if needed.
*/
export const openTriviaDB = {
  getOpenTriviaQuestions: () => apiRequest<ApiResponse>()
}

/**
 * Process questions data to count occurrences by category or difficulty.
 * @param questions.
 * @param type. Category or difficulty.
 * @returns Array of objects with name and count properties.
 */
export function processQuestionsData(questions: Questions[], type: string) {
  const categoryCount = questions.reduce((acc, question) => {
    let decodedCategory;
    switch (type) {
      case ('category'):
        decodedCategory = decodeHtmlEntities(question.category);
        break;
      case ('difficulty'):
        decodedCategory = decodeHtmlEntities(question.difficulty);
        break;
      default:
        decodedCategory = 'category';
        break;
    }
    acc[decodedCategory] = (acc[decodedCategory] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categoryCount).map(([category, count]) => ({
    name: category,
    count: count
  }));
}