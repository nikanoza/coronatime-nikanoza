const Statistic: React.FC<{
  img: string;
  className: string;
  textColor: string;
  text: string;
  amount: string;
}> = (props) => {
  return (
    <div
      className={
        'rounded-2xl flex flex-col ' +
        props.className +
        ' bg-opacity-[0.08] items-center justify-center w-4/5 pt-1 pb-1'
      }
      id={props.text}
    >
      <img src={props.img} alt="" className="w-1/2" />
      <p className="capitalize">{props.text}</p>
      <div className={props.textColor}>{props.amount}</div>
    </div>
  );
};

export default Statistic;
