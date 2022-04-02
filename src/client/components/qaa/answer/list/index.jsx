import React, { useState } from 'react';

import Answer from '..';
import ScrollableList from '../../../layout/ScrollableList';

export default function AnswerList ({ answers }) {
  const [displayCount, setDisplayCount] = useState(2);

  return (
    <div style={{ marginLeft: '0.25em' }}>
      <ScrollableList style={{ maxHeight: '400px' }}>
        {answers.slice(0, displayCount).map(answer => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </ScrollableList>

      {answers.length > 2 && (
        <div style={{ margin: '0.5em 0 0 1em', cursor: 'pointer' }}>
          <small
            onClick={() => setDisplayCount(displayCount === answers.length ? 2 : answers.length)}
          >
            <strong>{displayCount === answers.length ? 'HIDE' : 'SHOW MORE'} ANSWERS</strong>
          </small>
        </div>
      )}
    </div>

  );
}
