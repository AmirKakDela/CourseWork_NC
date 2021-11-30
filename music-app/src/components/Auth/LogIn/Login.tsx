import React from 'react';
import {Formik, FormikHelpers} from "formik";
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import '../auth.css';
import {useDispatch} from "react-redux";
import {login} from "../../../redux/Actions/thunkUserActions";
import {Button, Input} from "antd";

type UserDataLoginType = {
    email: string,
    password: string
}

const validateSchema = yup.object().shape({
    email: yup.string().trim()
        .required('Обязательное поле').matches(/^\S+@\S+\.\S+$/, 'Некорректный email'),
    password: yup.string().trim().required('Обязательное поле')
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
        <div>
            <>
                <div className="form__logo">Spotify</div>
                <h1 className="form__title">Чтобы продолжить, войдите в Spotify</h1>
                <Formik initialValues={initialValues} onSubmit={onSubmit}
                        validationSchema={validateSchema}
                        validateOnBlur
                >
                    {({values, dirty, isValid, touched, errors, handleSubmit, handleBlur, handleChange}) => (
                        <form className="form" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email</label> <br/>
                            <Input name='email' className='form__input'
                                   type="email"
                                   autoComplete='off'
                                   placeholder="Введите email"
                                   value={values.email}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                            />
                            {errors.email && touched.email && <p className="form__error-text">{errors.email}</p>}
                            <label htmlFor="password">Пароль</label> <br/>
                            <Input name='password' className='form__input'
                                   type="password"
                                   autoComplete='off'
                                   placeholder="Введите пароль"
                                   value={values.password}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                            />
                            {errors.password && touched.password &&
                            <p className="form__error-text">{errors.password}</p>}
                            <Button type="primary"
                                    htmlType="submit"
                                    disabled={isValid && !dirty}
                            >Войти</Button>
                            <p className="form__subtitle">Нет аккаунта?</p>
                            <Button type="primary">
                                <Link to={'/auth/signup'}>РЕГИСТРАЦИЯ В СПОТИФАЙ</Link>
                            </Button>
                        </form>
                    )}
                </Formik>
            </>
        </div>
    );
};

export default Login;