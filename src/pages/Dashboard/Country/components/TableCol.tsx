import { Arrow, Dark } from 'assets';
import { useState } from 'react';

const TableCol: React.FC<{
  text: string;
  sortAsc: () => void;
  sortDsc: () => void;
  btnIds: {
    asc: string;
    dsc: string;
  };
}> = (props) => {
  const [ascButton, setAscButton] = useState(false);
  const [dscButton, setDscButton] = useState(false);

  const sortationHandler = () => {
    if (!ascButton && !dscButton) {
      props.sortAsc();
      setDscButton(false);
      setAscButton(true);
    } else if (ascButton) {
      props.sortDsc();
      setDscButton(true);
      setAscButton(false);
    } else {
      props.sortAsc();
      setDscButton(false);
      setAscButton(true);
    }
  };
  return (
    <div className="flex items-center justify-center text-center gap-1 md:gap-3 md:pt-5 md:pb-5 md:pl-8 md:pr-8 ">
      <div
        className="text-semibold capitalize cursor-pointer"
        onClick={sortationHandler}
      >
        {props.text}
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <button
          onClick={() => {
            setDscButton(true);
            setAscButton(false);
            props.sortDsc();
          }}
          id={props.btnIds.asc}
        >
          <img src={!dscButton ? Arrow : Dark} alt="" className="rotate-180" />
        </button>
        <button
          onClick={() => {
            setDscButton(false);
            setAscButton(true);
            props.sortAsc();
          }}
        >
          <img src={!ascButton ? Arrow : Dark} alt="" id={props.btnIds.dsc} />
        </button>
      </div>
    </div>
  );
};

export default TableCol;
