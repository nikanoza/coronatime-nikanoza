import { Arrow } from 'assets';

const TableCol: React.FC<{
  text: string;
  sortAsc: () => void;
  sortDsc: () => void;
  btnIds: {
    asc: string;
    dsc: string;
  };
}> = (props) => {
  return (
    <div className="flex items-center justify-center text-center gap-1 md:gap-3 bg-[#F6F6F7] md:pt-5 md:pb-5 md:pl-8 md:pr-8 ">
      <div className="text-semibold capitalize">{props.text}</div>
      <div className="flex flex-col items-center justify-center gap-1">
        <button onClick={props.sortDsc} id={props.btnIds.asc}>
          <img src={Arrow} alt="" />
        </button>
        <button onClick={props.sortAsc}>
          <img
            src={Arrow}
            alt=""
            id={props.btnIds.dsc}
            className="rotate-180"
          />
        </button>
      </div>
    </div>
  );
};

export default TableCol;
