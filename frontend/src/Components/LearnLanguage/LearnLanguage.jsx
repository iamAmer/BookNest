import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';

export default function LearnLanguage() {
  const { userData, token } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch books when component loads
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(response.data.data || response.data);
    } catch (err) {
      setError('Failed to load books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (bookId) => {
    setSelectedBookId(bookId);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizSubmitted(false);
    setQuizResult(null);
    loadQuizForBook(bookId);
  };

  const loadQuizForBook = async (bookId) => {
    try {
      setLoading(true);
      // In a real implementation, we might get the user's CEFR level from their profile
      const cefrLevel = 'B1'; // Placeholder - should come from user profile
      const response = await axios.get(`/api/reader/quiz/${bookId}`, {
        params: { cefr_level: cefrLevel, numQuestions: 5 },
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuizQuestions(response.data.data || response.data);
    } catch (err) {
      setError('Failed to load quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    if (!selectedBookId || answers.length !== quizQuestions.length) {
      setError('Please answer all questions');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        '/api/reader/quiz/submit',
        {
          bookId: selectedBookId,
          answers: answers,
          score: calculateScore(),
          total_questions: quizQuestions.length
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setQuizResult(response.data.data || response.data);
      setQuizSubmitted(true);
    } catch (err) {
      setError('Failed to submit quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = () => {
    if (quizQuestions.length === 0 || answers.length === 0) return 0;
    
    let correct = 0;
    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex === quizQuestions[questionIndex].correctAnswer) {
        correct++;
      }
    });
    
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const getCurrentQuestion = () => {
    return quizQuestions[currentQuestionIndex];
  };

  if (loading && !books.length && !quizQuestions.length) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#795420] border-t-transparent"></div>
    </div>;
  }

  if (error) {
    return <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
      {error}
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!selectedBookId ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-8 text-[#8B6F47]">
            Select a Book to Quiz
          </h1>
          
          {books.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map(book => (
                <div 
                  key={book.id} 
                  onClick={() => handleBookSelect(book.id)}
                  className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-transparent hover:border-[#8B6F47]"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#F5E6D3] rounded-xl flex items-center justify-center mr-4">
                      <i className="fa-solid fa-book text-[#8B6F47] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#6B5744] mb-1">{book.title}</h3>
                      <p className="text-sm text-[#A0907D]">{book.author}</p>
                      <p className="text-xs text-[#D4A574] mt-1">
                        <i className="fa-solid fa-star mr-1"></i>{book.rating || '4.5'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No books available</p>
          )}
        </>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#8B6F47]">
              Quiz for Selected Book
            </h2>
            <p className="text-gray-600">
              Answer all questions to test your understanding
            </p>
          </div>

          {!quizSubmitted && quizQuestions.length > 0 ? (
            <>
              <div className="mb-6 p-4 bg-[#F5E6D3] rounded-xl">
                <p className="text-[#6B5744] font-medium">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
                <div className="w-full bg-[#E8D4B8] rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-[#D4A574] h-2.5 rounded-full" 
                    style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-[#6B5744] mb-4">
                  {getCurrentQuestion().question}
                </h3>
                <div className="space-y-3">
                  {getCurrentQuestion().options.map((option, index) => (
                    <label 
                      key={index}
                      className="flex items-start cursor-pointer p-3 border rounded-lg hover:bg-[#F5E6D3] transition-colors"
                    >
                      <input
                        type="radio"
                        checked={answers[currentQuestionIndex] === index}
                        onChange={() => handleAnswerSelect(currentQuestionIndex, index)}
                        className="hidden"
                      />
                      <div className="flex items-center ml-3 w-0 flex-1">
                        <span className="text-[#6B5744]">{option}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => 
                    currentQuestionIndex > 0 
                      ? setCurrentQuestionIndex(currentQuestionIndex - 1) 
                      : null
                  }
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-[#E8D4B8] text-[#6B5744] rounded-lg hover:bg-[#D4A574] transition-colors"
                >
                  Previous Question
                </button>

                <button
                  onClick={() => 
                    currentQuestionIndex < quizQuestions.length - 1 
                      ? setCurrentQuestionIndex(currentQuestionIndex + 1) 
                      : handleSubmitQuiz()
                  }
                  className="px-6 py-2 bg-[#8B6F47] text-white rounded-lg hover:bg-[#7A5F37] transition-colors"
                >
                  {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Submit Quiz'}
                </button>
              </div>
            </>
          ) : (
            <>
              {quizSubmitted && quizResult ? (
                <>
                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold mb-4">
                      {quizResult.score >= 70 ? '🎉' : '📚'}
                    </div>
                    <h2 className="text-2xl font-bold text-[#8B6F47]">
                      Quiz Complete!
                    </h2>
                    <p className="text-lg text-[#6B5744]">
                      Your Score: {quizResult.score}%
                    </p>
                    <p className="mt-2 text-[#6B5744]">
                      {quizResult.score >= 70 
                        ? 'Congratulations! You passed the quiz and the book is marked as completed.' 
                        : 'Keep practicing! Try again to improve your score.'}
                    </p>

                    {quizResult.new_achievements && quizResult.new_achievements.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-xl font-bold text-[#D4A574] mb-4">
                          New Achievements Earned!
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {quizResult.new_achievements.map(achievement => (
                            <div 
                              key={achievement.id} 
                              className="bg-white rounded-xl shadow-md p-4 text-center border-2 border-[#D4A574]"
                            >
                              <div className="text-3xl mb-2">🏆</div>
                              <h4 className="font-semibold text-[#6B5744]">{achievement.name}</h4>
                              <p className="text-sm text-[#A0907D]">{achievement.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSelectedBookId(null);
                        setQuizQuestions([]);
                        setCurrentQuestionIndex(0);
                        setAnswers([]);
                        setQuizSubmitted(false);
                        setQuizResult(null);
                      }}
                      className="px-6 py-2 bg-[#8B6F47] text-white rounded-lg hover:bg-[#7A5F37] transition-colors"
                    >
                      Take Another Quiz
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading quiz results...</p>
                </div>
              )}
            </>
          )}
          
          {quizQuestions.length === 0 && !quizSubmitted && (
            <div className="text-center py-8">
              <p className="text-gray-500">No quiz available for this book. Please select another book.</p>
              <button
                onClick={() => setSelectedBookId(null)}
                className="mt-4 px-4 py-2 bg-[#E8D4B8] text-[#6B5744] rounded-lg hover:bg-[#D4A574] transition-colors"
              >
                Choose Different Book
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}