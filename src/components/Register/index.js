import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import axios from 'axios';
import swal from 'sweetalert';
import gg from '../../image/gg.png';
import fb from '../../image/fb.webp';
import tw from '../../image/tw.png';

const cx = classNames.bind(styles);

function Register({ closeForm, showFormLogin }) {
    const input_username = useRef();
    const input_email = useRef();
    const input_pass = useRef();
    const input_pass_agian = useRef();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    const modal = useRef();
    const modal_class = cx('modal');
    const [eye, setEye] = useState(true);
    const [eyeslash, setEyeSlash] = useState(false);
    const [formValue, setFormValue] = useState({ username: '', email: '', password: '', confirm_password: '' });

    const handleSubmit = (e) => {
        const regex =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        e.preventDefault();
        if (!email.match(regex)) {
            swal('Error', 'Email không đúng định dạng', 'error');
            return;
        } else if (password.length < 6) {
            swal('Error', 'Mật khẩu phải có ít nhất 6 ký tự', 'error');
            return;
        } else if (password !== confirm_password) {
            swal('Error', 'Mật khẩu không trùng nhau', 'error');
            return;
        }

        const getAccounts = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/accounts/',
                });
                const CHECK = res.data.find((item) => {
                    return item.username === username;
                });
                if (CHECK) {
                    swal({
                        title: 'Failure',
                        text: 'Tài khoản đã tồn tại!',
                        icon: 'error',
                        timer: 2000,
                        buttons: false,
                    }).then(() => {
                        return;
                    });
                } else {
                    swal({
                        title: 'Success',
                        text: 'Register success',
                        icon: 'success',
                        timer: 2000,
                        buttons: false,
                    }).then(async () => {
                        const res = await axios({
                            method: 'post',
                            url: 'http://localhost:3000/accounts',
                            data: {
                                username,
                                email,
                                password,
                            },
                        });
                        console.log(res);
                        // localStorage.setItem('userID', CHECK.id);
                        // navigate('/about');
                        showFormLogin();
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
                    return;
                });
            }
        };
        getAccounts();
        //call api
    };

    return (
        <div onClick={closeForm} ref={modal} className={modal_class}>
            <form
                onSubmit={handleSubmit}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={cx('modal-container')}
            >
                <span className={cx('close')} onClick={closeForm}>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </span>

                <div className={cx('options')}>
                    <Button onClick={showFormLogin}>Log In</Button>
                    <Button
                        active
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Register
                    </Button>
                </div>
                <div className={cx('login-with')}>
                    <a className={cx('facebook')}>
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
                        required
                        ref={input_username}
                        id={cx('username')}
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder="Username"
                    ></input>
                    <br></br>
                    {/* {!username && showError && <span className={cx('form-message')}>Vui lòng nhập trường này</span>} */}
                </div>
                <div className={cx('form-group')}>
                    <input
                        required
                        id={cx('email')}
                        name="email"
                        type="email"
                        ref={input_email}
                        placeholder="Email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    ></input>
                    <br></br>
                    {/* <span className={cx('form-message')}>Vui lòng nhập trường này</span> */}
                    {/* {!email && showError && <span className={cx('form-message')}>Vui lòng nhập trường này</span>} */}
                    {/* {email.match(regex) && <span className={cx('form-message')}>Email không đúng định dạng</span>} */}
                </div>
                <div className={cx('form-group')}>
                    <input
                        required
                        ref={input_pass}
                        id={cx('password')}
                        name="password"
                        type={'password'}
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                    <br></br>
                    {/* <span className={cx('form-message')}>Vui lòng nhập trường này</span>
                    {!password && showError && <span className={cx('form-message')}>Vui lòng nhập trường này</span>} */}
                    <p
                        onClick={() => {
                            if (
                                input_pass.current.type === 'password' &&
                                input_pass_agian.current.type === 'password'
                            ) {
                                setEye(false);
                                setEyeSlash(true);
                                input_pass.current.type = 'text';
                                input_pass_agian.current.type = 'text';
                                console.log(input_pass_agian.current.type);
                            }
                        }}
                    >
                        {eye && <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>}
                    </p>
                    <p
                        onClick={() => {
                            if (input_pass.current.type === 'text' && input_pass_agian.current.type === 'text') {
                                setEye(true);
                                setEyeSlash(false);
                                input_pass.current.type = 'password';
                                input_pass_agian.current.type = 'password';
                            }
                        }}
                    >
                        {eyeslash && <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>}
                    </p>
                </div>
                <div className={cx('form-group')}>
                    <input
                        required
                        ref={input_pass_agian}
                        id={cx('password_again')}
                        type={'password'}
                        name="confirm_password"
                        placeholder="Confirm password"
                        onChange={(e) => {
                            setConfirm_password(e.target.value);
                        }}
                    ></input>
                    <br></br>
                    {/* {!confirm_password && showError && (
                        <span className={cx('form-message')}>Vui lòng nhập trường này</span>
                    )} */}
                </div>

                <div className={cx('remember-pw')}>
                    <input id={cx('checkbox')} type={'checkbox'}></input>
                    <label> Remember password</label>
                </div>

                <div className={cx('btn')}>
                    <Button type="submit" primary>
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Register;
