import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/spinner.component'

function Register() {

    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
        conf_pass:''
      })
    
      const {username,email,password,conf_pass} = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
    
      const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth) 

      useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())

      }, [user, isError, isSuccess, message, navigate, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()

        if(password !== conf_pass){
            toast.error('Passwords do not match')
        } else {
            const userData = {
                username,
                email,
                password,
                role: 'patient'
            }
            dispatch(register(userData))
        }
      }

      if(isLoading){
        return <Spinner/>
      }

  return (
    <div className="mx-auto max-w-screen-2xl px-2 sm:px-6 lg:px-8">

        <form onSubmit={onSubmit}>
        <div className='grid grid-cols-11 gap-4'>

          <div className='col-start-1 col-span-3 row-span-6'>
            <img src="/images/login-background.png" alt=""  className='object-cover'/>
          </div>

          <div className='mb-10 col-start-4 col-span-8 row-start-1 row-span-1'>
            <p className='text-9xl font-medium text-center'>REGISTER</p>
          </div>

          

          <div className='col-start-6 row-start-2 col-span-4'>

          

          <div className="mb-4 px-8">
            <label htmlFor="username" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">USERNAME</label>
            <input type="text" placeholder='username' name="username" id="username" value={username} onChange={onChange} className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
          </div>

          <div className="px-8">
            <label htmlFor="email" className="text-l text-center block w-full mb-2 text-sm font-medium text-sky-800">EMAIL ADDRESS</label>
            <input type="text" placeholder='name@email.com' name="email" id="email" value={email} onChange={onChange} className="placeholder:underline placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
          </div>

          <div className='px-8'>
            <label htmlFor="password" className="text-l text-center block mb-2 text-sm font-medium text-sky-800">PASSWORD</label>
            <input type="text" placeholder='********' name="password" id="password" value={password} onChange={onChange} className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
          </div>

          <div className='px-8'>
            <label htmlFor="conf_pass" className="text-l text-center block mb-2 text-sm font-medium text-sky-800">PASSWORD</label>
            <input type="text" placeholder='********' name="conf_pass" id="conf_pass" value={conf_pass} onChange={onChange} className="placeholder:text-sky-800 text-center font-semibold block w-full p-4 text-sky-800 border border-sky-800 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"/>
          </div>

          

          </div>

          <div className='col-start-6 col-span-4 row-start-4 px-8'>
            <button type="submit" className="w-full font-semibold text-xl text-white bg-sky-800 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-600 rounded-lg text-base px-6 py-3.5 text-center">
              Sign Up
            </button>
            <div className='flex mt-3 justify-between'>
              <p className='text-base font-semibold text-sky-400 hover:underline cursor-pointer'>Don't have an account?</p>
              <p className='text-base font-semibold text-sky-800 hover:underline cursor-pointer'>Sign Up</p>
            </div>

            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-full h-px my-8 bg-gray-200 border-0"/>
              <span className="absolute px-4 font-medium text-sky-800 bg-white">or</span>
            </div>
          </div>

          
        </div>
        </form>


      </div>
  )
}

export default Register