import classNames from 'classnames/bind';
import styles from './cartItem.module.scss';
import image from '../../image/gb.jpg';

const cx = classNames.bind(styles);

function cartItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img src={data.image} alt="" className={cx('product-img')}></img>
            <div className={cx('product-name')}>{data.name}</div>
            <div className={cx('product-count')}>{'SL: ' + data.count}</div>
            <div className={cx('product-price')}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    Number(data.price) * Number(data.count),
                )}
            </div>
        </div>
    );
}

export default cartItem;
