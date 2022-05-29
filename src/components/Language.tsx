import i18next from 'i18next';
import { Eng, Geo } from 'assets/images';
import Select from 'react-select';

const Language = () => {
  const languageChangeHandler = (event: any) => {
    i18next.changeLanguage(event.value);
  };

  const options = [
    {
      value: 'en',
      label: (
        <div>
          <img src={Eng} alt="" />
        </div>
      ),
    },
    {
      value: 'geo',
      label: (
        <div>
          <img src={Geo} alt="" />
        </div>
      ),
    },
  ];

  return (
    <Select
      options={options}
      onChange={languageChangeHandler}
      defaultValue={{
        value: 'en',
        label: (
          <div>
            <img src={Eng} alt="" />
          </div>
        ),
      }}
    />
  );
};

export default Language;
