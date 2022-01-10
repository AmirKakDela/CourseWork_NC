import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/Reducers/rootReducer";
import {logoutCurrentUser} from "../../../redux/Actions/userActions";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Dropdown, Menu} from "antd";

import "./Header.scss";
import {CaretDownFilled, LeftOutlined, RightOutlined, UserOutlined} from "@ant-design/icons";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isAuth = useSelector((state: RootState) => state.user.isAuth);

    const user = useSelector(
        (state: RootState) => state.user.currentUser
    );
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutCurrentUser());
    };


    const nav = (
        <nav className="header__navigation">
            <button className="navigation__button" onClick={() => navigate(-1)}>
                <LeftOutlined/>
            </button>
            <button className="navigation__button" onClick={() => navigate(1)}>
                <RightOutlined/>
            </button>
        </nav>
    );

    const dropdown = (
        <div className="dropdown">
            <Menu className="dropdown__menu">
                <Menu.Item
                    className="dropdown__item"
                    key="0"
                    style={{background: "inherit"}}
                >
                    <Link to="/" style={{color: "#fff"}}>
                        Профиль
                    </Link>
                </Menu.Item>
                <Menu.Item
                    className="dropdown__item"
                    key="1"
                    style={{background: "inherit", color: "#fff"}}
                    onClick={logout}
                >
                    Выйти
                </Menu.Item>
            </Menu>
        </div>
    );

    return (
        <div className="header">
            {location.pathname == "/welcome" ? (
                <div className="header__logo">Crackerfy</div>
            ) : (
                nav
            )}

            {isAuth ? (
                <div>
                    <Dropdown overlay={dropdown} trigger={["click"]}>
                        <button className="header__user">
                            <UserOutlined className="header__user_icon"/>
                            {user.userName || "user"}
                            <CaretDownFilled />
                        </button>
                    </Dropdown>
                </div>
            ) : (
                <div className="header__auth">
                    <button className="auth__button-registry auth__button">
                        <Link to="/auth/signup" style={{color: "#fff"}}>
                            ЗАРЕГИСТРИРОВАТЬСЯ
                        </Link>
                    </button>
                    <button className="auth__button-login auth__button">
                        <Link to="/auth" style={{color: "#000"}}>
                            ВОЙТИ
                        </Link>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
