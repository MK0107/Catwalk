import moment from 'moment';
import React, { useContext, useState } from 'react';

import QuestionList from './question/list';

import { searchHit } from '../../utils';
import { AppContext, QuestionContext } from '../../contexts';

export default function QuestionsAndAnswers () {
  const { product } = useContext(AppContext);
  const [query, setQuery] = useState('');

  const queriedQuestions = product.questions.filter(question => (
    query.length < 3 ||
    searchHit(question.question_body, query) ||
    Object
      .values(question.answers)
      .some(answer =>
        searchHit(answer.body, query) ||
        searchHit(answer.answerer_name, query) ||
        searchHit(moment(answer.date).format('MMMM DD, YYYY'), query))
  ));

  return (
    <QuestionContext.Provider value={{ query, setQuery }}>
      <h1>Questions & Answers</h1>

      {/* Search Bar */}
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Have a question? Search for answers"
        style={{
          width: '100%',
          height: '3em',
          fontSize: '1em'
        }}
      />

      {/* Question List */}
      <QuestionList questions={queriedQuestions} />
    </QuestionContext.Provider>
  );
}
