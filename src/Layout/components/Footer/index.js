import classNames from 'classnames/bind';
import styles from './Footer. module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('footer-content')}></div>
            <div className={cx('footer-info')}>
                <p className={cx('info')}>
                    <span>
                        © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày
                        02/01/2007. GPMXH: 21/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 11/01/2021. Địa chỉ: 128
                        Trần Quang Khải, P. Tân Định, Q.1, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email:
                        cskh@thegioididong.com. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt.
                    </span>
                    <a href=""> Xem chính sách sử dụng</a>
                </p>
            </div>
        </div>
    );
}

export default Footer;
