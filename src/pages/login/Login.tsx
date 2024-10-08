import React, { useEffect, useState } from 'react';
import './login.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/store';
import { loginFeature, testFeature } from '../../redux-store/features/auth/features';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { getUserFeature } from '../../redux-store/features/user/features';
import ParticleContainer from '../../components/particle/particle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(testFeature());
  }, [dispatch]);

  // Set initial values for the form
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'user@gmail.com',
      password: '123456',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const login = await dispatch(loginFeature(data) as any);
      if (login) {
        toast.success('Login successful');
        await dispatch(getUserFeature());
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login error');
      console.log(error);
    }
    setLoading(false);
  };

  const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    marginBottom: '20px',
    '& .MuiInputBase-input': {
      fontSize: '18px',
    },
    '& .MuiInputLabel-root': {
      fontSize: '20px',
    },
    '& .MuiFormHelperText-root': {
      fontSize: '14px',
    },
  }));

  return (
    <ParticleContainer>
      <div className="login-box login">
        <div className="login-flex login">
          <form className="login" onSubmit={handleSubmit(onSubmit)}>
            <h1>Welcome!</h1>
            <h3 className="details">Enter details to login</h3>
            <Box component={'form'} className="inputs">
              <div className="">
                <StyledTextField
                  variant="standard"
                  type="email"
                  className='custom_textField'
                  label="Email"
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                  error={!!errors.email}
                  helperText={errors.email ? String(errors.email.message) : ''}
                />
              </div>
              <div className="input-field">
                <StyledTextField
                  variant="standard"
                  type="password"
                  label="Password"
                  {...register('password', { required: 'Password is required' })}
                  error={!!errors.password}
                  helperText={errors.password ? String(errors.password.message) : ''}
                />
              </div>
            </Box>
            <Link to={'/sign-up'} className="forgot">DON'T HAVE AN ACCOUNT?</Link>
            <div className="login-button">
              <button className='login_button' type="submit">
                {loading ? <div className='spinner'></div> : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ParticleContainer>
  );
};

export default Login;
