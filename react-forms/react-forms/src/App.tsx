import './App.css';
import { RegistrationFormControlled } from './RegistrationFormControlled';
import { RegistrationFormUncontrolled } from './RegistrationFormUncontrolled';
import { UserForm } from './UserForm';

function App() {
  return (
    <>
      <RegistrationFormUncontrolled />
      <RegistrationFormControlled />
      <UserForm />
      <UserForm user={{ username: 'fredrick', password: 'apogiuabo' }} />
    </>
  );
}

export default App;
