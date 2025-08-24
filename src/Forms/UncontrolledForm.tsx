import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { type RootState } from '../redux/store';
import fileToBase64 from '../utils/fileToBase64';
import { formSchema, type FormDataType } from '../utils/validation';

interface Props {
  onSubmit: (data: FormDataType) => void;
}

const UncontrolledForm = ({ onSubmit }: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const countries = useSelector((store: RootState) => store.forms.countries);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    let picture: string | undefined;
    const file = formData.get('picture') as File;
    if (file && file.size > 0) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setErrors({ picture: 'Only png/jpeg allowed' });
        return;
      }
      picture = await fileToBase64(file);
    }

    const data = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirm: formData.get('confirm') as string,
      gender: formData.get('gender') as string,
      accept: formData.get('accept') === 'on',
      picture,
      country: formData.get('country') as string,
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((error) => {
        if (error.path[0]) {
          newErrors[error.path[0].toString()] = error.message;
        }
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      onSubmit(result.data);
      formRef.current.reset();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Name
        </span>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.name && <span>Error: {errors.name}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Age
        </span>
        <input
          type="number"
          name="age"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.age && <span>Error: {errors.age}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Email
        </span>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.email && <span>Error: {errors.email}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Password
        </span>
        <input
          type="password"
          name="password"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.password && <span>Error: {errors.password}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Confirm
        </span>
        <input
          type="password"
          name="confirm"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.confirm && <span>Error: {errors.confirm}</span>}
      </div>

      <label className="flex items-center gap-2">
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Gender
        </span>
        <select name="gender">
          <option value=""> -Select- </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.gender && <span>Error: {errors.gender}</span>}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="accept"
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm mb-1 font-medium text-gray-700">
          Accept Terms
        </span>
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.accept && <span>Error: {errors.accept}</span>}
      </div>

      <label htmlFor="countries">
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Country
        </span>
        <input
          list="countries"
          name="country"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.country && <span>Error: {errors.country}</span>}
      </div>

      <label>
        <span className="block text-sm mb-1 font-medium text-gray-700">
          Upload picture
        </span>
        <input
          type="file"
          name="picture"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </label>
      <div className="text-red-500 text-sm mt-1 min-h-[20px]">
        {errors.picture && <span>Error: {errors.picture}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
