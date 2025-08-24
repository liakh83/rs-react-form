import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import fileToBase64 from '../utils/fileToBase64';
import { formSchema, type FormDataType } from '../utils/validation';

import type { RootState } from '../redux/store';

interface Props {
  onSubmit: (data: FormDataType) => void;
}

const ControlledForm = ({ onSubmit }: Props) => {
  const countries = useSelector((state: RootState) => state.forms.countries);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid },
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setError('picture', {
          type: 'manual',
          message: 'Only PNG/JPEG allowed',
        });
        return;
      }
      const base64 = await fileToBase64(file);
      setValue('picture', base64, { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Name
        </span>
        <input
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.name && <span>Error: {errors.name.message}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Age
        </span>
        <input
          type="number"
          {...register('age', { valueAsNumber: true })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.age && <span>Error: {errors.age.message}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Email
        </span>
        <input
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.email && <span>Error: {errors.email.message}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Password
        </span>
        <input
          type="password"
          {...register('password')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.password && <span>Error: {errors.password.message}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Confirm
        </span>
        <input
          type="password"
          {...register('confirm')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.confirm && <span>Error: {errors.confirm.message}</span>}
      </div>

      <label htmlFor="gender" className="flex items-center gap-2">
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Gender
        </span>
        <select id="gender" {...register('gender')}>
          <option value="">-Select-</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.gender && <span>Error: {errors.gender.message}</span>}
      </div>

      <label htmlFor="accept" className="flex items-center gap-2">
        <input
          id="accept"
          type="checkbox"
          {...register('accept')}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm mb-1 font-medium text-gray-700">
          Accept Terms
        </span>
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.accept && <span>Error: {errors.accept.message}</span>}
      </div>

      <label htmlFor="country">
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Country
        </span>
        <input
          id="country"
          list="countries"
          {...register('country')}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.country && <span>Error: {errors.country.message}</span>}
      </div>

      <label htmlFor="picture">
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Upload picture
        </span>
        <input
          id="picture"
          type="file"
          onChange={handleFile}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.picture && <span>Error: {errors.picture.message}</span>}
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default ControlledForm;
