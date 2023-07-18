import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import {useNavigate} from 'react-router-dom'


const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)

  const {user, isLoading} = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({...values, [name]:value})
    console.log(`${name}:${value}`)  
  }
  
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('pls fill out all forms')
      return;
    }
    if (isMember) {
      dispatch(loginUser({email, password}))
      return
    }
    dispatch(registerUser({name, email, password}))
  }

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  useEffect(()=>{
    if (user) {
      setTimeout(()=> {
        navigate('/');
      }, 3000)
    }
  }, [user])

  return (
    <Wrapper className='full-page'>
      <form action="" className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{ values.isMember ? 'login' : 'signup'}</h3>
        {/* name field */}
        {!values.isMember && (<FormRow type="text" name="name" value={values.name} handleChange={handleChange}/>)}        
        {/* email field */}
        <FormRow type="email" name="email" value={values.email} handleChange={handleChange}/>
        {/* password field */}
        <FormRow type="password" name="password" value={values.password} handleChange={handleChange}/>

        <button disabled={isLoading} className='btn btn-block' type='submit'>submit</button>
        <button disabled={isLoading} className='btn btn-block btn-hipster' type='button' onClick={() => {dispatch(loginUser({email: 'testUser@test.com', password: 'secret'}))}}>{isLoading? 'loading...' : 'demo'}</button>
        <p>
          { values.isMember ? `Not a member yet?` : `Already a member?`}
        <button type="button" onClick={toggleMember} className="member-btn">
          { values.isMember ? "Register" : "Login"}
        </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register