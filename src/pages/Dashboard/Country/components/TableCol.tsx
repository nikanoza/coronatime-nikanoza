import { Arrow, Dark } from 'assets';

type Sort = {
  name_asc: false;
  name_dsc: false;
  cases_asc: false;
  cases_dsc: false;
  death_asc: false;
  death_dsc: false;
  recovered_asc: false;
  recovered_dsc: false;
};

const TableCol: React.FC<{
  text: string;
  sortAsc: () => void;
  sortDsc: () => void;
  btnIds: {
    asc: string;
    dsc: string;
  };
  changeHandler: (property: keyof Sort, value: boolean) => void;
  ifSorted: { asc: boolean; dsc: boolean };
}> = (props) => {
  const changeSortation = () => {
    if (props.ifSorted.asc) {
      props.sortAsc();
      props.changeHandler(props.btnIds.dsc as keyof Sort, true);
    } else {
      props.sortDsc();
      props.changeHandler(props.btnIds.asc as keyof Sort, true);
    }
  };
  return (
    <div className="flex items-center justify-center text-center gap-1 md:gap-3 md:pt-5 md:pb-5 md:pl-8 md:pr-8">
      <div
        className="text-semibold capitalize cursor-pointer"
        onClick={changeSortation}
      >
        {props.text}
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <button
          onClick={() => {
            props.sortAsc();
            props.changeHandler(props.btnIds.asc as keyof Sort, true);
          }}
          id={props.btnIds.asc}
        >
          <img
            src={props.ifSorted.asc ? Dark : Arrow}
            alt=""
            className="rotate-180"
          />
        </button>
        <button
          onClick={() => {
            props.sortDsc();
            props.changeHandler(props.btnIds.dsc as keyof Sort, true);
          }}
        >
          <img
            src={props.ifSorted.dsc ? Dark : Arrow}
            alt=""
            id={props.btnIds.dsc}
          />
        </button>
      </div>
    </div>
  );
};

export default TableCol;
