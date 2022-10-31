import styles from './Register.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import Button from '../Button';
import gg from '../../image/gg.png';
import fb from '../../image/fb.webp';
import tw from '../../image/tw.png';

const cx = classNames.bind(styles);

function Register({ onClick, onClick1 }) {
    const input_pass = useRef();
    const input_pass_agian = useRef();

    const modal = useRef();
    const modal_class = cx('modal');

    const [eye, setEye] = useState(true);
    const [eyeslash, setEyeSlash] = useState(false);
    const [active, setActive] = useState(1);

    return (
        <div
            onClick={onClick}
            // {...props}
            ref={modal}
            className={modal_class}
        >
            <form
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={cx('modal-container')}
            >
                <span className={cx('close')} onClick={onClick}>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </span>

                <div className={cx('options')}>
                    <Button onClick={onClick1}>Log In</Button>
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
                <div className={cx('value')}>
                    <input id={cx('username')} type="text" placeholder="Username"></input>
                    <input id={cx('email')} type="email" placeholder="Email"></input>
                    <input ref={input_pass} id={cx('password')} type={'password'} placeholder="Enter password"></input>
                    <input
                        ref={input_pass_agian}
                        id={cx('password_again')}
                        type={'password'}
                        placeholder="Enter the password again"
                    ></input>
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

                    <div className={cx('remember-pw')}>
                        <input id={cx('checkbox')} type={'checkbox'}></input>
                        <label> Remember password</label>
                    </div>
                </div>
                <Button primary>Register</Button>
            </form>
        </div>
    );
}

export default Register;
