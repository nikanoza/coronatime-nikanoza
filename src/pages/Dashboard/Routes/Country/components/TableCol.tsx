import { Arrow } from 'assets/images';

const TableCol: React.FC<{
  text: string;
  sortAsc: () => void;
  sortDsc: () => void;
}> = (props) => {
  return (
    <div className="flex pt-5 pb-5 pl-8 pr-8 items-center justify-center gap-3 bg-[#F6F6F7]">
      <div className="text-semibold capitalize">{props.text}</div>
      <div className="flex flex-col items-center justify-center gap-1">
        <button onClick={props.sortDsc}>
          <img src={Arrow} alt="" />
        </button>
        <button onClick={props.sortAsc}>
          <img src={Arrow} alt="" className="rotate-180" />
        </button>
      </div>
    </div>
  );
};

export default TableCol;
