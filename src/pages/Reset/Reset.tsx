import { Coronatime, Warning } from 'assets/images';
import { Input, Button } from 'components';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';
import { usePostHttp } from 'hooks';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const { t } = useTranslation();

  type FormsValues = {
    email: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    getValues,
    setError,
  } = useForm<FormsValues>();

  const navigate = useNavigate();

  const { requestFc: sentRequest } = usePostHttp({
    obj: {
      link: 'https://coronatime-api.devtest.ge/api/password/send-recovery-link',
      body: {
        email: getValues('email'),
        backlink: 'http://localhost:3000/new-password',
      },
    },
    applyData: (param: string) => {
      navigate('/sent-info');
      return JSON.parse(param);
    },
    errorFc: (property) => {
      setError('email', {
        type: 'custom',
        message: t('email not found'),
      });
    },
  });

  const setErrorStyle = (
    error: FieldError | undefined,
    touched: boolean | undefined
  ) => {
    return error ? 'border-[#CC1E1E]' : touched ? 'border-[#249E2C]' : '';
  };

  const onSubmit: SubmitHandler<FormsValues> = (): void => {
    sentRequest();
  };

  return (
    <div className="flex flex-col w-full h-full justify-start items-center xl:text-lg">
      <img src={Coronatime} alt="" className="mt-5" />
      <div className="font-bold text-lg mt-10 capitalize">
        {t('reset password')}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 w-4/5 sm:mt-10 sm:w-1/2 lg:w-1/3 flex flex-col items-center justify-center"
      >
        <Input
          label="email"
          text={t('email')}
          inputClass={`w-full pt-1 pb-1 pl-3 pr-3 mt-1 border-2 rounded-lg focus:border-[#2029F3] focus:shadow-focusShadow ${setErrorStyle(
            errors.email,
            touchedFields.email && getValues('email') !== ''
          )} outline-none`}
          className="w-full mt-2 flex flex-col"
          type="email"
          placeholder={t('Enter your email')}
          register={register}
          validations={{
            required: t('Email not found'),
          }}
          correct={
            !errors.email && touchedFields.email && getValues('email') !== ''
          }
          iconClass="w-4 h-4 -ml-6"
        />
        <div className="mt-1 text-[#CC1E1E] h-5 ml-5 flex gap-3 mr-auto">
          {errors.email && <img src={Warning} alt="" />}
          {errors.email && errors.email.message}
        </div>
        <Button id="reset_btn" type="submit" className="w-full">
          {t('reset password')}
        </Button>
      </form>
    </div>
  );
};

export default Reset;
