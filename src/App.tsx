import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ControlledForm from './Forms/ControlledForm';
import UncontrolledForm from './Forms/UncontrolledForm';
import Modal from './Modal/Modal';
import { addSubmission } from './redux/sliceFormsData';

import type { RootState, AppDispatch } from './redux/store';
import type { FormDataType } from './utils/validation';

const App = () => {
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);
  const [openForm, setOpenForm] = useState<
    'uncontrolled' | 'controlled' | null
  >(null);
  const submissions = useSelector(
    (state: RootState) => state.forms.submissions
  );
  const dispatch: AppDispatch = useDispatch();

  const handleOpenUncontrolledForm = () => {
    setOpenForm('uncontrolled');
  };

  const handleOpenControlledForm = () => {
    setOpenForm('controlled');
  };

  const handleCloseModal = () => {
    setOpenForm(null);
  };

  const handleSubmitData = (
    type: 'uncontrolled' | 'controlled',
    formData: FormDataType
  ) => {
    dispatch(
      addSubmission({
        type,
        ...formData,
      })
    );

    setLastAddedIndex(submissions.length);

    setTimeout(() => {
      setLastAddedIndex(null);
    }, 3000);

    setOpenForm(null);
  };

  return (
    <div className="max-w">
      <h1>React App</h1>
      <div className="flex gap-4 justify-center mb-4 mt-4">
        <button onClick={handleOpenUncontrolledForm}>
          Open Uncontrolled Form
        </button>
        <button onClick={handleOpenControlledForm}>Open Controlled Form</button>
        <Modal isOpen={openForm === 'controlled'} onClose={handleCloseModal}>
          <h2>React Hook Form</h2>
          <ControlledForm
            onSubmit={(formData) => handleSubmitData('controlled', formData)}
          />
        </Modal>
        <Modal isOpen={openForm === 'uncontrolled'} onClose={handleCloseModal}>
          <h2>Uncontrolled Form</h2>
          <UncontrolledForm
            onSubmit={(formData) => handleSubmitData('uncontrolled', formData)}
          />
        </Modal>
      </div>
      <h2>Submitted Data</h2>
      <div className="flex flex-wrap  justify-center gap-4 mt-4">
        {submissions.map((item, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg shadow-sm bg-white transition-colors duration-500 ${
              index === lastAddedIndex
                ? 'border-2 border-green-500 bg-green-200'
                : ''
            }`}
          >
            {Object.entries(item).map(([key, value]) =>
              key !== 'picture' ? (
                <div key={key}>
                  <strong className="capitalize">{key}:</strong> {String(value)}
                </div>
              ) : (
                <div key={key} className={'flex justify-center'}>
                  <img
                    key={key}
                    src={value as string}
                    alt={key}
                    className="w-24 h-24 object-cover rounded mt-1"
                  />
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
