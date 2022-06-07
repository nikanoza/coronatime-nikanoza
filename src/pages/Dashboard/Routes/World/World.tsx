import { Cases, Death, Recovered } from 'assets/images';

const World = () => {
  return (
    <div className="w-full mt-5 grid grid-cols-2 justify-items-center lg:grid-cols-3">
      <img src={Cases} alt="" className="col-span-2 lg:col-span-1" />
      <img src={Recovered} alt="" />
      <img src={Death} alt="" />
    </div>
  );
};

export default World;
