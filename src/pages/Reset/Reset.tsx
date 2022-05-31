import { Coronatime, Warning, Success } from 'assets/images';
import { Input, Button } from 'components';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { useState } from 'react';

i18next.use(initReactI18next).init({
  lng: 'geo',
  debug: false,
  resources: {
    geo: {
      translation: {
        'reset password': 'პაროლის აღდგენა',
        email: 'ელ–ფოსტა',
        'Enter your email': 'შეიყვანეთ ელ–ფოსტა',
        'Email not found': 'ელ–ფოსტა ვერ მოიძებნა',
        'We have sent you a confirmation email': 'შეამოწმეთ ელ–ფოსტა',
      },
    },
  },
});

const Reset = () => {
  const [sentReq, setSentReq] = useState(false);
  const { t } = useTranslation();

  type FormsValues = {
    email: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormsValues>();

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  const onSubmit: SubmitHandler<FormsValues> = (data: FormsValues): void =>
    setSentReq(true);

  return (
    <div className="flex flex-col w-full h-full justify-start items-center">
      <img src={Coronatime} alt="" className="mt-5" />
      {!sentReq && (
        <div className="font-bold text-lg mt-20 capitalize">
          {t('reset password')}
        </div>
      )}
      {!sentReq && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-1/3">
          <Input
            label="email"
            text={t('email')}
            inputClass={`w-full pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
              errors.email,
              touchedFields.email
            )} outline-none`}
            className="w-full mt-2 flex flex-col"
            type="email"
            placeholder={t('Enter your email')}
            register={register}
            validations={{
              required: t('Email not found'),
            }}
            correct={!errors.email && touchedFields.email}
            iconClass="w-4 h-4 -ml-6"
          />
          <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3">
            {errors.email && <img src={Warning} alt="" />}
            {errors.email && errors.email.message}
          </div>
          <Button id="reset_btn" type="submit">
            {t('reset password')}
          </Button>
        </form>
      )}
      {sentReq && (
        <div className="flex flex-col items-center justify-center mt-80">
          <img src={Success} alt="" />
          <div>{t('We have sent you a confirmation email')}</div>
        </div>
      )}
    </div>
  );
};

export default Reset;
