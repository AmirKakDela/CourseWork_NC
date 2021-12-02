import React from 'react';
import {Formik, FormikHelpers} from "formik";
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import '../auth.css';
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../../redux/Actions/thunkUserActions";
import {Button, Input} from "antd";
import logo from '../../../assets/imgs/logo-black.png'

type UserDataLoginType = {
    email: string,
    password: string
}

const validateSchema = yup.object().shape({
    email: yup.string().trim()
        .required('Введите адрес электронной почты из аккаунта Spotify.').matches(/^\S+@\S+\.\S+$/, 'Некорректный email'),
    password: yup.string().trim().required('Введите пароль вашего акканта Spotify.')
})

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const initialValues: UserDataLoginType = {
        email: '',
        password: ''
    }

    const onSubmit = (userDataLogin: UserDataLoginType, actions: FormikHelpers<any>) => {
        navigate('/')
        dispatch(login(userDataLogin.email, userDataLogin.password));
        actions.resetForm();
    }

    return (
        <>
            <div className="form__logo_wrap">
                <img src={logo} alt="Logo" className="form__logo"/>
            </div>
            <h5 className="form__title">Чтобы продолжить, войдите в Spotify.</h5>
            <div className="form__error-block">
                <span>Неправильный почтовый адрес или пароль</span>
            </div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}
                    validationSchema={validateSchema}
                    validateOnBlur
            >
                {({values, touched, errors, handleSubmit, handleBlur, handleChange}) => (
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="login__email">Email</label> <br/>
                        <Input name='email'
                               className={`form__input ${errors.email && touched.email && 'form__input_error'}`}
                               id="login__email"
                               type="email"
                               autoComplete='off'
                               placeholder="Введите email"
                               value={values.email}
                               onBlur={handleBlur}
                               onChange={handleChange}
                        />
                        {errors.email && touched.email && <p className="form__error_text">{errors.email}</p>}
                        <label htmlFor="login__password">Пароль</label> <br/>
                        <Input name='password'
                               className={`form__input ${errors.password && touched.password && 'form__input_error'}`}
                               id="login__password"
                               type="password"
                               autoComplete='off'
                               placeholder="Введите пароль"
                               value={values.password}
                               onBlur={handleBlur}
                               onChange={handleChange}
                        />
                        {errors.password && touched.password &&
                            <p className="form__error_text">{errors.password}</p>}
                        <Button htmlType="submit"
                                className="form__button form__button_login"
                        >Войти</Button>
                        <h5 className="form__subtitle">Нет аккаунта?</h5>
                        <Button className="form__button">
                            <Link to={'/auth/signup'}>РЕГИСТРАЦИЯ В СПОТИФАЙ</Link>
                        </Button>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Login;