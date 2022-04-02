import moment from 'moment';
import React, { useContext } from 'react';

import Photos from '../../photos';
import Row from '../../layout/Row';
import Column from '../../layout/Column';
import { highlight } from '../../../utils';
import { QuestionContext } from '../../../contexts';

export default function AnswerTile ({ answer }) {
  const { query } = useContext(QuestionContext);

  return (
    <Column style={{ marginTop: '0.25em' }}>
      <Row>
        <strong>A: </strong>
        <div style={{ marginLeft: '0.2em' }}>{highlight(answer.body, query)}</div>
      </Row>

      {/* Photos */}
      <Photos photos={answer.photos} />

      {/* Footer */}
      <small style={{ margin: '0.2em 0 0 1.5em' }}>
        by {highlight(answer.answerer_name, query)},
        {' '}
        {highlight(moment(answer.date).format('MMMM DD, YYYY'), query)}
      </small>
    </Column>
  );
}
