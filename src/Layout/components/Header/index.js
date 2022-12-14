import style from './Header.module.scss';
import className from 'classnames/bind';
import { Fragment, React, useEffect, useRef, useState } from 'react';
import useDebounce from '../../../Hook/useDebounce';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import swal from 'sweetalert';
import logo from '../../../image/logo.jpg';
import avata from '../../../image/avatar.jpg';
import CartItem from '../../../components/cartItem';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCartPlus,
    faCircleArrowRight,
    faCircleXmark,
    faHeartCirclePlus,
    faHouse,
    faInfo,
    faInfoCircle,
    faLanguage,
    faQuestionCircle,
    faRightFromBracket,
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
    const [hideResule, setHideResult] = useState(true);
    const [searchResult, setSeachRusult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [cartInfo, setCartInfo] = useState([]);
    const [showlogin, setShowLogin] = useState(false);
    const [showregister, setShowRegister] = useState(false);
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('userID'));

    const refInput = useRef();
    const hd = useRef();
    const navigate = useNavigate();
    const Debounce = useDebounce(searchValue, 800);

    const getSearchResult = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: `http://localhost:3000/products?name_like=${encodeURIComponent(Debounce)}`,
            });
            setSeachRusult(res.data);
            setLoading(false);
            setHideResult(false);
        } catch (error) {
            swal({
                title: 'Login Failed',
                text: error.message,
                icon: 'error',
                timer: 2000,
                buttons: false,
            });
        }
    };

    useEffect(() => {
        const getInfoCart = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: `http://localhost:3000/cart`,
                });
                setCartInfo(res.data);
            } catch (error) {
                swal({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error',
                    timer: 2000,
                    buttons: false,
                });
            }
        };
        getInfoCart();
    }, []);

    useEffect(() => {
        if (!Debounce) {
            setSeachRusult([]);
            return;
        }
        setLoading(true);

        getSearchResult();
    }, [Debounce]);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-start')}>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} /> Trang ch???
                </Link>
                <Link to="/about">
                    <FontAwesomeIcon icon={faBars}></FontAwesomeIcon> S???n ph???m
                </Link>
                <Link to="/contact">
                    <FontAwesomeIcon icon={faRss}></FontAwesomeIcon> Li??n h???
                </Link>
            </div>
            <div className={cx('logo')}>
                <a href="https://www.facebook.com/xuanchau0802">
                    <img src={logo} alt="Khong hien thi"></img>
                </a>
            </div>
            <div ref={hd} className={cx('header-end')}>
                <TippyHeadless
                    placement="bottom"
                    onClickOutside={() => {
                        setLoading(false);
                        setHideResult(true);
                    }}
                    visible={searchResult.length > 0 && !hideResule}
                    interactive
                    render={(attrs) => (
                        <div className={cx('seach-result')} tabIndex="-1">
                            <PopperWrapper>
                                <span className={cx('title')}>K???t qu??? t??m ki???m</span>
                                {searchResult.map((item) => {
                                    return (
                                        <SearchResult
                                            onClick={() => {
                                                alert(`????y l?? s???n ph???m ${item.name}`);
                                            }}
                                            key={item.id}
                                            data={item}
                                        ></SearchResult>
                                    );
                                })}
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
                                if (e.target.value === ' ') return;
                                setSearchValue(e.target.value);
                            }}
                            onFocus={() => {
                                setHideResult(false);
                            }}
                            placeholder="T??m ki???m"
                            type={'text'}
                        ></input>
                        <a className={cx('btn-loading')}>{loading && <FontAwesomeIcon icon={faSpinner} />}</a>
                        <a
                            className={cx('btn-clear')}
                            onClick={() => {
                                refInput.current.value = '';
                                setSearchValue(refInput.current.value);
                                setSeachRusult([]);
                                refInput.current.focus();
                            }}
                        >
                            {!loading && searchValue !== '' && <FontAwesomeIcon icon={faCircleXmark} />}
                        </a>
                        <Tippy content="T??m ki???m">
                            <a className={cx('btn-search')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </a>
                        </Tippy>
                    </div>
                </TippyHeadless>
                <div>
                    <TippyHeadless
                        // visible={true}
                        interactive
                        render={(attrs) => (
                            <div className={cx('cart')} tabIndex="-1">
                                <PopperWrapper>
                                    <span className={cx('title')}>S???n ph???m th??m m???i</span>
                                    {cartInfo.map((item) => {
                                        return <CartItem key={item.id} data={item}></CartItem>;
                                    })}
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <a
                            className={cx('cart-icon')}
                            onFocus={() => {
                                console.log(123);
                            }}
                            onClick={() => {}}
                        >
                            Gi??? h??ng <FontAwesomeIcon icon={faCartPlus} />
                            <span className={cx('count')}>{cartInfo.length}</span>
                        </a>
                    </TippyHeadless>
                </div>
                <></>

                {!currentUser ? (
                    <Tippy content="????ng nh???p">
                        <a
                            onClick={function(){
                                setShowLogin(true);
                            }}
                        >
                            ????ng nh???p <FontAwesomeIcon icon={faCircleArrowRight} />
                        </a>
                    </Tippy>
                ) : (
                    <TippyHeadless
                        // offset={'100%'}
                        onClickOutside={() => {
                            setShowInfo(false);
                        }}
                        interactive={true}
                        visible={showInfo}
                        render={(attrs) => (
                            <div className={cx('info')} tabIndex="-1">
                                <PopperWrapper>
                                    <div className={cx('options')}>
                                        <div className={cx('info-item')}>
                                            <FontAwesomeIcon icon={faInfoCircle}> </FontAwesomeIcon> Th??ng tin t??i kho???n
                                        </div>
                                        <div className={cx('info-item')}>
                                            <FontAwesomeIcon icon={faLanguage}> </FontAwesomeIcon> V??ng v?? ng??n ng???
                                        </div>
                                        <div className={cx('info-item')}>
                                            <FontAwesomeIcon icon={faQuestionCircle}> </FontAwesomeIcon> H??? tr??? v?? gi??p
                                            ?????
                                        </div>
                                        <div
                                            onClick={() => {
                                                setShowInfo(false);
                                                localStorage.removeItem('userID');
                                                setCurrentUser('');
                                                navigate('/');
                                            }}
                                            className={cx('info-item')}
                                        >
                                            <FontAwesomeIcon icon={faRightFromBracket}> </FontAwesomeIcon> ????ng xu???t
                                        </div>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <img
                            onClick={() => {
                                setShowInfo(true);
                            }}
                            src={avata}
                            className={cx('info-avatar')}
                        ></img>
                    </TippyHeadless>
                )}

                {showlogin && (
                    <Login
                        currentUser={() => {
                            setCurrentUser(localStorage.getItem('userID'));
                        }}
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
