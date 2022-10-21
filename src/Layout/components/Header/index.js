import style from './Header.module.scss';
import className from 'classnames/bind';
import React from 'react';
import Tippy from '@tippyjs/react/headless';
import logo from '../../../image/logo.jpg';
import CartItem from '../../../components/cartItem';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCircleArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = className.bind(style);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-start')}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Shop</Link>
            </div>
            <div className={cx('logo')}>
                <a href="https://www.facebook.com/xuanchau0802">
                    <img src={logo} alt="Khong hien thi"></img>
                </a>
            </div>
            <div className={cx('header-end')}>
                <a
                    onClick={function () {
                        alert();
                    }}
                >
                    Search
                    <FontAwesomeIcon icon={faSearch} />
                </a>

                <Tippy
                    zIndex={9999999}
                    interactive
                    render={(attrs) => (
                        <div className={cx('cart')} tabIndex="-1">
                            <PopperWrapper>
                                <span className={cx('title')}>Sản phẩm thêm mới</span>
                                <CartItem></CartItem>
                                <CartItem></CartItem>
                                <CartItem></CartItem>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <a>
                        Card
                        <FontAwesomeIcon icon={faCartPlus} />
                    </a>
                </Tippy>

                <a>
                    Login
                    <FontAwesomeIcon icon={faCircleArrowRight} />
                </a>
            </div>
        </header>
    );
}

export default Header;
