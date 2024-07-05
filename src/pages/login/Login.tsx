
import './login.scss'

import loginImage from '../../assets/images/loginImage.svg'
import  {useForm} from 'react-hook-form'
import { useAppDispatch } from '../../hooks/store'
import { loginFeature } from '../../redux-store/features/auth/features'
import { login } from '../../redux-store/features/auth/interface'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import axios from 'axios'



const Login:React.FC = () => {

  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState: {errors} } = useForm()


  const onSubmit =async(data:any)=>{
    try {
      setLoading(true)
      const login = await dispatch(loginFeature(data) as any)
      if (login) {
        toast.success('Login sucessful')
      }
    } catch (error) {
      toast.error('Login error')
      console.log(error);
      
    }
    setLoading(false)
  }
  return  (
    <div>
    <div className="login-container">
     
        <div className="login-flex">
        <div className="login-image-container">
            <div className="image"><img src={loginImage} alt="" /></div>
        </div>
        <form className="login" action='submit' onSubmit={handleSubmit(onSubmit)}  >
            <h1>welcome!</h1>
            <h3 className="details">
                Enter details to login
            </h3>
            <div className="inputs">
          
            <div className="">
             <input type="email"  placeholder='Email' {...register('email', {required:true})} />
             { errors.email && <p className=''> Email is required</p>}
             </div> 
               <div className="">
             <input type="password" placeholder='password' {...register('password', {required:true})}/>
             {errors.password && <p>Password is required</p> }
             </div>
            </div>
            <div className="forgot">
                FORGOT PASSWORD?
            </div>
            
            {/* {!auth.user &&  (<NavLink  className={'login-button'}>
            <button type="submit" onClick={handlelogin}>LOG IN</button>
            </NavLink>)} */}
            <div  className={'login-button'}>
            <button type="submit">{loading?'Loading...':'Login'}</button>
            </div>
           
        </form>
        </div>
    </div>
</div>
  )
}

export default Login