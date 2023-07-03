export default function TimerItem({ unit, number }) {
  return (
    <div className='timer__box' data-unit={unit}>
      <span className='timer__number'>{number}</span>
    </div>
  );
}
