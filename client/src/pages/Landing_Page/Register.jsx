import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';
import { validateRegistration } from '../../utility/validateRegistration';
import Spinner from '../../components/spinner.component';

function Register() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    conf_email: '',
    password: '',
    conf_pass: '',
    contact: '',
    address: '',
    city: '',
    province: '',
    postal: '',
  });

  const {
    fname,
    lname,
    email,
    conf_email,
    password,
    conf_pass,
    contact,
    address,
    city,
    province,
    postal,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== conf_pass) {
      toast.error('Passwords do not match');
    }
    if (email !== conf_email) {
      toast.error('Email Address do not match');
    } else {
      const userData = {
        fname,
        lname,
        email,
        password,
        contact,
        address,
        city,
        province,
        postal,
        role: 'patient',
      };
      const validationErrors = validateRegistration(userData);
      if (validationErrors.length > 0) {
        if (validationErrors.length > 3){
          toast.error("Please fill in all the required fields!")
        } else{
          validationErrors.forEach((error) => {
            toast.error(error);})
          }
      }else{
        dispatch(register(userData));
        toast.success(`User ${userData.fname} ${userData.lname} successfully registered.`)
      }
      
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-11 gap-4">
          <div className="col-start-1 col-span-3 row-span-6">
            <img src="/images/login-background.png" alt="" className="object-cover" />
          </div>

          <div className="mb-10 col-start-4 col-span-8 row-start-1 row-span-1">
            <p className="text-9xl font-medium text-center">REGISTER</p>
          </div>

          <div className="col-start-6 row-start-2 col-span-4">
            <div className="mb-4 px-8">
              <label htmlFor="fname" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                FIRST NAME
              </label>
              <input
                type="text"
                placeholder="First Name"
                name="fname"
                id="fname"
                value={fname}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4 px-8">
              <label htmlFor="lname" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                LAST NAME
              </label>
              <input
                type="text"
                placeholder="Last Name"
                name="lname"
                id="lname"
                value={lname}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="px-8">
              <label htmlFor="email" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                EMAIL ADDRESS
              </label>
              <input
                type="text"
                placeholder="name@email.com"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                className="placeholder:underline placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="px-8">
              <label htmlFor="conf_email" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                CONFIRM EMAIL ADDRESS
              </label>
              <input
                type="text"
                placeholder="Confirm Email"
                name="conf_email"
                id="conf_email"
                value={conf_email}
                onChange={onChange}
                className="placeholder:underline placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="px-8">
              <label htmlFor="password" className="text-l text-center block mb-2 text-sm font-medium text-sky-800">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="********"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="px-8">
              <label htmlFor="conf_pass" className="text-l text-center block mb-2 text-sm font-medium text-sky-800">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                placeholder="********"
                name="conf_pass"
                id="conf_pass"
                value={conf_pass}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4 px-8">
              <label htmlFor="contact" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                CONTACT NUMBER
              </label>
              <input
                type="text"
                placeholder="Contact Number"
                name="contact"
                id="contact"
                value={contact}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4 px-8">
              <label htmlFor="address" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                ADDRESS
              </label>
              <input
                type="text"
                placeholder="Address"
                name="address"
                id="address"
                value={address}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="px-8">
              <label htmlFor="city" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                CITY
              </label>
              <input
                type="text"
                placeholder="City"
                name="city"
                id="city"
                value={city}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="px-8">
              <label htmlFor="province" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                PROVINCE
              </label>
              <input
                type="text"
                placeholder="Province"
                name="province"
                id="province"
                value={province}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="px-8">
              <label htmlFor="postal" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">
                POSTAL CODE
              </label>
              <input
                type="text"
                placeholder="Postal Code"
                name="postal"
                id="postal"
                value={postal}
                onChange={onChange}
                className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="col-start-6 col-span-4 row-start-4 px-8">
            <button
              type="submit"
              className="w-full font-semibold text-xl text-white bg-sky-800 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-600 rounded-lg text-base px-6 py-3.5 text-center"
            >
              Sign Up
            </button>

            <div className="inline-flex items-center justify-center mt-6">
              <p className="text-sm text-gray-400">Already have an account?</p>
              <p
                className="ml-2 text-sm font-semibold text-sky-800 hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Sign In
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
