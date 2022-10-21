import classNames from 'classnames/bind';
import styles from './cartItem.module.scss';
import image from '../../image/gb.jpg';

const cx = classNames.bind(styles);

function cartItem() {
    return (
        <div className={cx('wrapper')}>
            <img src={image} alt="" className={cx('product-img')}></img>
            <div className={cx('product-name')}>Nồi chiên không dầu GAABOR</div>
            <div className={cx('product-price')}>1090.000đ</div>
        </div>
    );
}

export default cartItem;
