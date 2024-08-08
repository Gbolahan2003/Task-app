
import './signUp.scss'
import  {useForm} from 'react-hook-form'
import { useAppDispatch } from '../../hooks/store'
import { registerFeature, testFeature } from '../../redux-store/features/auth/features'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ParticleContainer from '../../components/particle/particle'
import { Box, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { getUserFeature } from '../../redux-store/features/user/features'





const SignUP:React.FC = () => {

  useEffect(()=>{
    dispatch(testFeature())
  },[])
  

  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState: {errors} } = useForm()
  const  navigate =useNavigate()

  const onSubmit =async(data:any)=>{
    try {
      setLoading(true)
      const login = await dispatch(registerFeature(data) as any)

      if (login) {
        toast.success('Registration successful');
        await dispatch(getUserFeature());
        navigate('/')
      }
      
    } catch (error) {
      toast.error('sign up error')
      console.log(error);
      
    }
    setLoading(false)
  }

  const StyledTextField = styled(TextField)(({theme})=>({
    width: '100%',
    marginBottom: '20px',
    '& .MuiInputBase-input': {
      fontSize: '18px',// Increase input text size
    },
    '& .MuiInputLabel-root': {
      fontSize: '20px', // Increase label size
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px', // Increase helper text size (if needed)
    },
  }));
  
  return  (
    <ParticleContainer>
    <div className="login-box">
        <div className="login-flex">
 
        <form className="login" action='submit' onSubmit={handleSubmit(onSubmit)}  >
            <h1>welcome!</h1>
            <h3 className="details">
                Enter details to register
            </h3>
            <Box component={'form'} className="inputs">
        
          
            <div className="">
             <StyledTextField
             error={!!errors.firstName}
             variant='standard'
             helperText={errors.firstName ? String(errors.firstName.message) : ''} type="text"  label='First name' {...register('firstName', {required:'First name is required'})} />
             
             </div>  
          
            <div className="">
             <StyledTextField
             error={!!errors.lastName}
             variant='standard'
             helperText={errors.lastName ? String(errors.lastName.message) : ''} type="text"  label='Last name' {...register('lastName', {required:'Last name is required'})} />

             </div>  
          
            <div className="">
             <StyledTextField
             error={!!errors.email}
             variant='standard'
             helperText={errors.email ? String(errors.email.message) : ''} type="email"  label='Email' {...register('email', {required:'Email is required'})} />
            
             </div>  


               <div className="">
             <StyledTextField
             error={!!errors.password}

             variant='standard'
             helperText={errors.password ? String(errors.password.message) : ''} type="password" label='password' {...register('password', {required:'Password is required'})}/>
             </div>
            </Box>
            <Link to={'/login'} className="forgot">
                already have an account?
            </Link>
            
            {/* {!auth.user &&  (<NavLink  className={'login-button'}>
            <button type="submit" onClick={handlelogin}>LOG IN</button>
            </NavLink>)} */}
            <div  className={'login-button'}>
            <button type="submit">{loading?<div className='spinner'></div>:<div>Sign Up</div>}</button>
            </div>
           
        </form>
        </div>
    </div>
</ParticleContainer>
  )
}

export default SignUP