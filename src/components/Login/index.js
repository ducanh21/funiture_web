import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEye, faEyeSlash, faFaceAngry, faL } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
const cx = classNames.bind(styles);

function Login(hd) {
    const input_pass = useRef();
    const modal = useRef();
    const modal_class = `${cx('modal')}`;

    const [eye, setEye] = useState(true);
    const [eyeslash, setEyeSlash] = useState(false);

    return (
        <div ref={modal} className={modal_class}>
            <form className={cx('modal-container')}>
                <span
                    onClick={() => {
                        modal.current.remove();
                    }}
                >
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </span>
                <h1>Log in</h1>
                <div className={cx('login-with')}>
                    <a className={cx('facebook')}>F</a>
                    <a className={cx('google')}>G</a>
                </div>
                <div className={cx('login')}>
                    <input id={cx('username')} type="text" placeholder="Username"></input>
                    <input ref={input_pass} id={cx('password')} type={'password'} placeholder="Password"></input>
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

                    <div className={cx('remember-pw')}>
                        <input id={cx('checkbox')} type={'checkbox'}></input>
                        <label> Remember password</label>
                        <br></br>
                        <button> Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
