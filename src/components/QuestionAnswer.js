import React from 'react';
import { Typography } from '@mui/material';

const QuestionAnswer = ({ question, answer, author, certification }) => (
  <div style={{ marginBottom: '16px' }}>
    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
      Q: {question}
    </Typography>
    <Typography variant="body1">A: {answer}</Typography>
    <Typography variant="body2" style={{ fontStyle: 'italic', color: '#777' }}>
      {author}, {certification}
    </Typography>
  </div>
);

export default QuestionAnswer;
