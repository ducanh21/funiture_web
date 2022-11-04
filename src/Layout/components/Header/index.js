import style from './Header.module.scss';
import className from 'classnames/bind';
import { Fragment, React, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import logo from '../../../image/logo.jpg';
import CartItem from '../../../components/cartItem';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCartPlus,
    faCircleArrowRight,
    faCircleXmark,
    faHouse,
    faRss,
    faSearch,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import SearchResult from '../../../components/SearchResult';
import Login from '../../../components/Login';
import Btn from '../../../components/Button';
import Register from '../../../components/Register';

const cx = className.bind(style);

function Header() {
    const [searchResult, setSeachRusult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showlogin, setShowLogin] = useState(false);
    const [showregister, setShowRegister] = useState(false);

    const refInput = useRef();
    const hd = useRef();

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-start')}>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} /> Trang chủ
                </Link>
                <Link to="/about">
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon> Sản phẩm
                </Link>
                <Link to="/contact">
                    <FontAwesomeIcon icon={faRss}></FontAwesomeIcon> Liên hệ
                </Link>
            </div>
            <div className={cx('logo')}>
                <a href="https://www.facebook.com/xuanchau0802">
                    <img src={logo} alt="Khong hien thi"></img>
                </a>
            </div>
            <div ref={hd} className={cx('header-end')}>
                <Tippy
                    onClickOutside={() => {
                        setSeachRusult([]);
                        setLoading(false);
                    }}
                    visible={searchResult.length > 0}
                    interactive
                    render={(attrs) => (
                        <div className={cx('seach-result')} tabIndex="-1">
                            <PopperWrapper>
                                <span className={cx('title')}>Kết quả tìm kiếm</span>
                                <SearchResult></SearchResult>
                                <SearchResult></SearchResult>
                                <SearchResult></SearchResult>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            ref={refInput}
                            value={searchValue}
                            className={cx('search-input')}
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            onFocus={() => {
                                setTimeout(() => {
                                    setSeachRusult([1, 2]);
                                    setLoading(true);
                                }, 2000);
                            }}
                            placeholder="Tìm kiếm"
                            type={'text'}
                        ></input>
                        {/* <a className={cx('btn-loading')}>{loading && <FontAwesomeIcon icon={faSpinner} />}</a> */}
                        <a
                            className={cx('btn-clear')}
                            onClick={() => {
                                refInput.current.value = '';
                                setSearchValue(refInput.current.value);
                                refInput.current.focus();
                            }}
                        >
                            {searchValue !== '' && <FontAwesomeIcon icon={faCircleXmark} />}
                        </a>
                        <a className={cx('btn-search')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </a>
                    </div>
                </Tippy>
                <div>
                    <Tippy
                        // visible={true}
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
                            Giỏ hàng <FontAwesomeIcon icon={faCartPlus} />
                        </a>
                    </Tippy>
                </div>
                <a
                    onClick={() => {
                        setShowLogin(true);
                    }}
                >
                    Đăng nhập <FontAwesomeIcon icon={faCircleArrowRight} />
                </a>
                {showlogin && (
                    <Login
                        text="1234"
                        closeForm={() => {
                            setShowLogin(false);
                        }}
                        showFormRegister={(e) => {
                            setShowRegister(true);
                            setShowLogin(false);
                            e.preventDefault();
                        }}
                    ></Login>
                )}
                {showregister && (
                    <Register
                        text="1234"
                        closeForm={() => {
                            setShowRegister(false);
                        }}
                        showFormLogin={(e) => {
                            setShowRegister(false);
                            setShowLogin(true);
                            // e.preventDefault();
                        }}
                    ></Register>
                )}
            </div>
        </header>
    );
}

export default Header;
