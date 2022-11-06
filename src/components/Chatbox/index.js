import classNames from 'classnames/bind';
import style from './Chatbox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

function Chatbox() {
    return (
        <div
            onClick={() => {
                alert('chatbox');
            }}
            className={cx('chat-box')}
        >
            <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
        </div>
    );
}

export default Chatbox;
