import React, { useEffect, useState } from 'react';
import './login.scss';
import loginImage from '../../assets/images/loginImage.svg';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/store';
import { loginFeature, testFeature } from '../../redux-store/features/auth/features';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { getUserFeature } from '../../redux-store/features/user/features';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(testFeature());
  }, [dispatch]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const login = await dispatch(loginFeature(data) as any);
      if (login) {
        toast.success('Login successful');
        await dispatch(getUserFeature());

        navigate('/');
      }
    } catch (error) {
      toast.error('Login error');
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-flex">
        <div className="login-image-container">
          <div className="image"><img src={loginImage} alt="" /></div>
        </div>
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome!</h1>
          <h3 className="details">Enter details to login</h3>
          <div className="inputs">
            <div className="">
              <input type="email" placeholder='Email' {...register('email', { required: true })} />
              {errors.email && <p className=''>Email is required</p>}
            </div>
            <div className="">
              <input type="password" placeholder='Password' {...register('password', { required: true })} />
              {errors.password && <p>Password is required</p>}
            </div>
          </div>
          <div className="forgot">FORGOT PASSWORD?</div>
          <div className={'login-button'}>
            <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
