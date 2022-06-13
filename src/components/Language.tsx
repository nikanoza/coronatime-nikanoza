import { Eng, Geo } from 'assets';
import i18next from 'i18next';
import Select from 'react-select';

const Language = () => {
  const language = i18next.language;
  const languageChangeHandler = (event: any) => {
    localStorage.setItem('language', event.value);
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
        <div id="geo">
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
        value: language === 'en' ? 'en' : 'geo',
        label: (
          <div>
            <img src={language === 'en' ? Eng : Geo} alt="" />
          </div>
        ),
      }}
    />
  );
};

export default Language;
