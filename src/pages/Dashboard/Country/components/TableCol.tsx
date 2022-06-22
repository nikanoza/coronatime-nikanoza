import { Arrow, Dark } from 'assets';

type Sort = {
  name: string;
  direction: string;
};

const TableCol: React.FC<{
  text: string;
  sortAsc: () => void;
  sortDsc: () => void;
  btnIds: {
    asc: string;
    dsc: string;
  };
  changeHandler: (name: string, value: string) => void;
  ifSorted: Sort;
}> = (props) => {
  const changeSortation = () => {
    if (
      props.ifSorted.name === props.text &&
      props.ifSorted.direction !== 'asc'
    ) {
      props.sortAsc();
      props.changeHandler(props.text, 'asc');
    } else {
      props.sortDsc();
      props.changeHandler(props.text, 'dsc');
    }
  };
  return (
    <div className="flex w-1/4 lg:w-1/6 items-center justify-center text-center gap-1 md:gap-3 md:pt-5 md:pb-5 md:pl-8 md:pr-8 rounded-t-lg">
      <div
        className="text-semibold capitalize cursor-pointer"
        onClick={changeSortation}
        id={props.text}
      >
        {props.text}
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <button
          onClick={() => {
            props.sortAsc();
            props.changeHandler(props.text, 'asc');
          }}
          id={props.btnIds.asc}
        >
          <img
            src={
              props.ifSorted.name === props.text &&
              props.ifSorted.direction === 'asc'
                ? Dark
                : Arrow
            }
            alt=""
            className="rotate-180"
          />
        </button>
        <button
          onClick={() => {
            props.sortDsc();
            props.changeHandler(props.text, 'dsc');
          }}
        >
          <img
            src={
              props.ifSorted.name === props.text &&
              props.ifSorted.direction === 'dsc'
                ? Dark
                : Arrow
            }
            alt=""
            id={props.btnIds.dsc}
          />
        </button>
      </div>
    </div>
  );
};

export default TableCol;
