import { Vaccines } from 'assets/images';

const Login = () => (
  <div className="w-full h-full flex">
    <div className="w-3/5 h-full pt-10 pb-10">
      <div className="ml-28">work</div>
    </div>
    <div className="w-2/5 h-full hidden lg:block">
      <img src={Vaccines} alt="" className=" absolute w-2/5 h-full" />
    </div>
  </div>
);

export default Login;
