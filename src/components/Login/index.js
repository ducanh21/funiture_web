import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash, faFaceAngry, faFaceDizzy, faL } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import gg from '../../image/gg.png';
import fb from '../../image/fb.webp';
import tw from '../../image/tw.png';

const cx = classNames.bind(styles);

function Login({ closeForm, showFormRegister }) {
    const input_pass = useRef();
    const modal = useRef();
    const modal_class = cx('modal');
    const form_id = cx('form-login');
    const [eye, setEye] = useState(true);
    const [eyeslash, setEyeSlash] = useState(false);
    const [login, setLogin] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (!login) return;

        const getAccounts = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/accounts/',
                });
                const CHECK = res.data.find((item) => {
                    return item.password === password && item.username === username;
                });

                if (!CHECK) {
                    swal({
                        title: 'Login Failed',
                        text: 'Wrong login information',
                        icon: 'error',
                        timer: 2000,
                        buttons: false,
                    }).then(() => {
                        setLogin(false);
                    });
                } else {
                    swal({
                        title: 'Login Success',
                        text: 'Redirecting...',
                        icon: 'success',
                        timer: 2000,
                        buttons: false,
                    }).then(() => {
                        localStorage.setItem('userID', CHECK.id);
                        navigate('/about');
                        closeForm();
                    });
                }
            } catch (error) {
                swal({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error',
                    timer: 2000,
                    buttons: false,
                }).then(() => {
                    setLogin(false);
                });
            }
        };

        getAccounts();
    }, [login]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            swal('Error', 'Mật khẩu phải có ít nhất 6 ký tự', 'error');
            return;
        }
        setLogin(true);

        // closeForm();
        // call api

        // redirect('/about', 200);
    };

    return (
        <div
            onClick={closeForm}
            // {...props}
            ref={modal}
            className={modal_class}
        >
            <form
                onSubmit={handleLogin}
                id={form_id}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={cx('modal-container')}
            >
                <span className={cx('close')} onClick={closeForm}>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </span>

                <div className={cx('options')}>
                    <Button
                        primary
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Log In
                    </Button>
                    <Button onClick={showFormRegister}>Register</Button>
                </div>
                <div className={cx('login-with')}>
                    <a
                        onClick={() => {
                            return redirect('/about');
                        }}
                        className={cx('facebook')}
                    >
                        <img src={fb}></img>
                    </a>
                    <a className={cx('google')}>
                        <img src={gg}></img>
                    </a>
                    <a className={cx('google')}>
                        <img src={tw}></img>
                    </a>
                </div>
                <div className={cx('form-group')}>
                    <input
                        value={username}
                        required
                        id={cx('username')}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        type="text"
                        placeholder="Username"
                    ></input>
                    <br></br>
                    {/* <span className={cx('form-message')}>Vui lòng nhập trường này</span> */}
                </div>
                <div className={cx('form-group')}>
                    <input
                        required
                        value={password}
                        ref={input_pass}
                        id={cx('password')}
                        type={'password'}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                    ></input>
                    <span className={'form-message'}></span>
                    <p
                        onClick={() => {
                            if ((input_pass.current.type = 'password')) {
                                setEye(false);
                                setEyeSlash(true);
                                input_pass.current.type = 'text';
                            }
                        }}
                    >
                        {eye && <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>}
                    </p>
                    <p
                        onClick={() => {
                            if ((input_pass.current.type = 'text')) {
                                setEye(true);
                                setEyeSlash(false);
                                input_pass.current.type = 'password';
                            }
                        }}
                    >
                        {eyeslash && <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>}
                    </p>
                </div>
                <div className={cx('remember-pw')}>
                    <input id={cx('checkbox')} type={'checkbox'}></input>
                    <label> Remember password</label>
                    <span className={'form-message'}></span>
                </div>
                <div className={cx('btn')}>
                    <Button type="submit" primary>
                        Log in
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Login;
