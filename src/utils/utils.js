export function toMilliseconds(unit) {
  const seconds = 1000;
  const minutes = seconds * 60;
  const hours = minutes * 60;
  const days = hours * 24;

  if (unit === 'seconds') return seconds;
  if (unit === 'minutes') return minutes;
  if (unit === 'hours') return hours;
  if (unit === 'days') return days;
}

export function isLeapYear(year) {
  const feb29 = new Date(year, 1, 29);
  return feb29.getDate() === 29;
}

export function getDaysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

export function getYearDiff(endDate, startDate) {
  let yearDiff = endDate.getFullYear() - startDate.getFullYear();

  // Check if there's full years of difference
  const d = new Date(endDate);
  d.setFullYear(endDate.getFullYear() - yearDiff);
  if (d < startDate) yearDiff = yearDiff - 1;

  const dayDiff = Array.from({ length: yearDiff })
    .map((_, index) => {
      const d = new Date(startDate);
      d.setFullYear(d.getFullYear() + index);

      const year = d.getFullYear();
      const month = d.getMonth();

      const isMarchOnwards = month > 1;
      return isMarchOnwards ? getDaysInYear(year + 1) : getDaysInYear(year);
    })
    .reduce((sum, v) => sum + v, 0);

  return {
    years: yearDiff,
    days: dayDiff,
    ms: dayDiff * toMilliseconds('days'),
  };
}

export function getDaysInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return lastDayOfMonth.getDate();
}

export function getMonthDiff(endDate, startDate) {
  const yearDiff = endDate.getFullYear() - startDate.getFullYear();
  let monthDiff = endDate.getMonth() + yearDiff * 12 - startDate.getMonth();

  // Check if there's full month of difference
  const d = new Date(endDate);
  d.setMonth(endDate.getMonth() - monthDiff);
  if (d < startDate) monthDiff = monthDiff - 1;

  const dayDiff = Array.from({ length: monthDiff })
    .map((_, index) => {
      const d = new Date(startDate);
      d.setMonth(startDate.getMonth() + index);
      return getDaysInMonth(d);
    })
    .reduce((sum, v) => sum + v, 0);

  return {
    months: monthDiff,
    days: dayDiff,
    ms: dayDiff * toMilliseconds('days'),
  };
}

export function getCountDown(endDate, startDate) {
  const yearDiff = getYearDiff(endDate, startDate);

  const d = new Date(startDate);
  d.setFullYear(d.getFullYear() + yearDiff.years);

  const monthDiff = getMonthDiff(endDate, d);
  const difference = endDate - startDate - monthDiff.ms;

  const days = Math.floor(difference / toMilliseconds('days'));

  const remainderForHours = difference % toMilliseconds('days');
  const hours = Math.floor(remainderForHours / toMilliseconds('hours'));

  const remainderForMin = difference % toMilliseconds('hours');
  const minutes = Math.floor(remainderForMin / toMilliseconds('minutes'));

  const remainderForSeconds = difference % toMilliseconds('minutes');
  const seconds = Math.floor(remainderForSeconds / toMilliseconds('seconds'));

  return {
    years: yearDiff.years,
    months: monthDiff.months,
    days,
    hours,
    minutes,
    seconds,
  };
}
