import { getDaysInMonth, isValid } from 'date-fns';
import { NowRequest, NowResponse } from '@now/node';

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export default function (req: NowRequest, res: NowResponse) {
  const { month } = req.query;

  if (!month || typeof month !== 'string') {
    res.status(400);
    return res.json({
      reason: 'month query param is required',
    });
  }

  const date = new Date(month);
  if (!isValid(date)) {
    res.status(422);
    return res.json({
      reason: 'cannot parse month value',
    });
  }

  setTimeout(() => {
    const daysInMonth = getDaysInMonth(date);
    const daysToHighlight = [1, 2, 3].map((_) => getRandomNumber(1, daysInMonth));

    res.json({ daysToHighlight });
  }, 500); // fake some long work
}
