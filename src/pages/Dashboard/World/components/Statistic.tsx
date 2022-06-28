const Statistic: React.FC<{
  img: JSX.Element;
  className: string;
  textColor: string;
  text: string;
  amount: number;
}> = (props) => {
  return (
    <div
      className={
        'rounded-2xl flex flex-col p-10 lg:h-80 ' +
        props.className +
        ' bg-opacity-[0.08] items-center justify-center w-full'
      }
      id={props.text}
    >
      {props.img}
      <p
        className={`capitalize md:text-2xl ${
          props.text === 'recovered' || props.text === 'გამოჯანმრთელებულები'
            ? 'mt-7'
            : ''
        }`}
      >
        {props.text}
      </p>
      <div className={props.textColor + ' text-lg md:text-4xl font-bold'}>
        {props.amount}
      </div>
    </div>
  );
};

export default Statistic;
