import { Eng, Geo } from 'assets/images';
import i18next from 'i18next';
import React from 'react';
import Select from 'react-select';

const Language: React.FC<{ change: Function }> = (props) => {
  const lenguage = i18next.language;
  const languageChangeHandler = (event: any) => {
    props.change(event.value);
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
        value: lenguage === 'en' ? 'en' : 'geo',
        label: (
          <div>
            <img src={lenguage === 'en' ? Eng : Geo} alt="" />
          </div>
        ),
      }}
    />
  );
};

export default Language;
