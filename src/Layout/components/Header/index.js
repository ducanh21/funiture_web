import style from './Header.module.scss';
import className from 'classnames/bind';
import { Fragment, React, useState } from 'react';
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
    faCommentDots,
    faHouse,
    faInfoCircle,
    faPhoneFlip,
    faRss,
    faSearch,
    faSignal,
} from '@fortawesome/free-solid-svg-icons';
import SearchResult from '../../../components/SearchResult';

const cx = className.bind(style);

function Header() {
    const [searchResult, setSeachRusult] = useState([]);
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
            <div className={cx('header-end')}>
                <Tippy
                    onClickOutside={() => {
                        setSeachRusult([]);
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
                            className={cx('search-input')}
                            onFocus={() => {
                                setTimeout(() => {
                                    setSeachRusult([1, 2]);
                                }, 2000);
                            }}
                            placeholder="Tìm kiếm"
                            type={'text'}
                        ></input>
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
                <a>
                    Đăng nhập <FontAwesomeIcon icon={faCircleArrowRight} />
                </a>
            </div>
        </header>
    );
}

export default Header;
