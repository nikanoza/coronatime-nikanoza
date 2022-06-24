const Statistic: React.FC<{
  img: string;
  className: string;
  textColor: string;
  text: string;
  amount: number;
}> = (props) => {
  return (
    <div
      className={
        'rounded-2xl flex flex-col p-10 ' +
        props.className +
        ' bg-opacity-[0.08] items-center justify-center w-full'
      }
      id={props.text}
    >
      <img src={props.img} alt="" className="w-1/2" />
      <p className="capitalize">{props.text}</p>
      <div className={props.textColor + ' text-lg md:text-2xl font-bold'}>
        {props.amount}
      </div>
    </div>
  );
};

export default Statistic;
