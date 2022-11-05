import classNames from 'classnames/bind';
import style from './SearchResult.module.scss';
import logo from '../../image/gb.jpg';

const cx = classNames.bind(style);

function SearchResult({ onClick, data }) {
    return (
        <div onClick={onClick} className={cx('wrapper')}>
            <img className={cx('image')} src={data.image}></img>
            <div className={cx('box')}>
                <span className={cx('name')}>{data.name}</span>
                <br></br>
                <span className={cx('price')}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price)}
                </span>
            </div>
        </div>
    );
}

export default SearchResult;
