import { useEffect, useState } from 'react';
import TimerItem from './TimerItem';
import { getCountDown } from '../utils/utils';

const BOXES = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

export default function Timer() {
  const now = new Date();
  let nextYear = new Date(now.getFullYear() + 1, 0, 1);
  const [values, setValues] = useState(getCountDown(nextYear, now));

  useEffect(function () {
    nextYear =
      nextYear !== new Date(now.getFullYear() + 1, 0, 1)
        ? new Date(now.getFullYear() + 1, 0, 1)
        : nextYear;

    setInterval(function () {
      const now = new Date();
      setValues(getCountDown(nextYear, now));
    }, 1000);
  }, []);

  return (
    <div className='countdown'>
      <h1 className='countdown__target'>
        Time to <time>{nextYear.toDateString()}</time>
      </h1>
      <div className='countdown__timer'>
        {BOXES.map((box) => (
          <TimerItem unit={box} number={values[box]} key={box} />
        ))}
      </div>
    </div>
  );
}
