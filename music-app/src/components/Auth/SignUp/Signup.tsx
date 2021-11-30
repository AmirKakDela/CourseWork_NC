import React from 'react';
import {Formik, FormikHelpers} from "formik";
import * as yup from 'yup';
import '../auth.css';
import {Link} from "react-router-dom";
import {signup} from "../../../redux/Actions/thunkUserActions";
import { useDispatch } from 'react-redux';
import {Button, Input} from "antd";

type PropsType = {}

type UserDataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Signup: React.FC<PropsType> = () => {
    const  dispatch = useDispatch();
    const initialValues: UserDataType = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Обязательное поле')
            .min(2, 'Имя пользователя не может быть меньше 2 символов')
            .max(40, 'Имя пользователя не может быть больше 40 символов'),
        email: yup.string().trim()
            .required('Обязательное поле').matches(/^\S+@\S+\.\S+$/, 'Некорректный email'),
        password: yup.string().trim().required('Обязательное поле')
            .min(4, 'Пароль должен быть не менее 4 символов')
            .max(20, 'Пароль должен быть не более 20 символов'),
        confirmPassword: yup.string().trim().required('Обязательное поле')
            .oneOf([yup.ref('password')], 'Пароль не совпадают')
    })

    const onSubmit = (userData: UserDataType, actions: FormikHelpers<any>) => {
        console.log(userData);
        dispatch(signup(userData.email, userData.password, userData.name))
        actions.resetForm();
    }
    return (
        <>
            <div className="form__logo">Spotify</div>
            <h1 className="form__title">Зарегистрируйтесь и слушайте бесплатно</h1>
            <Formik onSubmit={onSubmit}
                    initialValues={initialValues}
                    validateOnBlur
                    validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
                    <form onSubmit={handleSubmit} className="form">
                        <label htmlFor="name">Имя пользователя</label> <br/>
                        <Input className="form__input" type="text"
                               name="name"
                               placeholder="Введите имя пользователя"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.name}
                               autoComplete="nope"
                        />
                        {touched.name && errors.name && <p className="form__error-text">{errors.name}</p>}
                        <label htmlFor="email">Email</label> <br/>
                        <Input className="form__input" type="email"
                               name="email"
                               placeholder="Введите email"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.email}
                               autoComplete="off"
                        />
                        {touched.email && errors.email && <p className="form__error-text">{errors.email}</p>}
                        <label htmlFor="password">Пароль</label> <br/>
                        <Input className="form__input" type="password"
                               name="password"
                               placeholder="Введите пароль"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.password}
                        />
                        {touched.password && errors.password &&
                        <p className="form__error-text">{errors.password}</p>}
                        <label htmlFor="confirmPassword">Подтвердите пароль</label> <br/>
                        <Input className="form__input" type="password"
                               name="confirmPassword"
                               placeholder="Введите пароль еще раз"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.confirmPassword}
                        />
                        {touched.confirmPassword && errors.confirmPassword &&
                        <p className="form__error-text">{errors.confirmPassword}</p>}
                        <Button type="primary" htmlType="submit"
                                disabled={isValid && !dirty}
                        >Зарегистрироваться</Button>
                        <p className="form__subtitle">Уже есть аккаунт? {<Link to='/auth'>Войти</Link>}</p>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default Signup;
