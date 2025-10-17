import { apiRequest } from './apiClient';

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

/*
  Only supports the GET endpoint from Open Trivia DB.
  Can be extended in the future if needed.
*/
export const openTriviaDB = {
  getOpenTriviaQuestions: () => apiRequest<ApiResponse>()
}