import classNames from 'classnames/bind';
import style from './SearchResult.module.scss';
import logo from '../../image/gb.jpg';

const cx = classNames.bind(style);

function SearchResult() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('image')} src={logo}></img>
            <div className={cx('box')}>
                <span className={cx('name')}>Lò chiên không dầu Kangaroo KG12AF1A 12 lít </span>
                <br></br>
                <span className={cx('price')}>1.009.000đ</span>
            </div>
        </div>
    );
}

export default SearchResult;
