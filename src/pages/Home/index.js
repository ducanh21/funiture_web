import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import banner from '../../image/banner.jpg';
import Slider_component from '../../components/Slider';
import { deal1, deal2, deal3, deal4, deal5, deal6, deal7, deal8, deal9, deal10 } from '../../image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowUp } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Home() {
    const [category, setCategory] = useState([]);
    const [showBtnScrollTop, setShowBtnScrollTop] = useState(false);

    // console.log(window.onscroll);

    document.body.onscroll = () => {
        if (document.documentElement.scrollTop === 0) setShowBtnScrollTop(false);
        setShowBtnScrollTop(document.documentElement.scrollTop);
    };

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await axios({
                    method: 'get',
                    url: 'http://localhost:3000/category',
                });
                setCategory(res.data);
            } catch (error) {
                swal({
                    title: 'Server error',
                    text: error.message,
                    icon: 'error',
                    timer: 2000,
                    buttons: false,
                });
            }
        };
        getCategory();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('big-banner')}>
                <img src={banner} alt="banner"></img>
            </div>
            <div className={cx('deal')}>
                <Slider_component>
                    <div className={cx('item')}>
                        <img src={deal1} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal2} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal3} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal4} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal5} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal6} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal7} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal8} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal9} className={cx('deal-image')}></img>
                    </div>
                    <div className={cx('item')}>
                        <img src={deal10} className={cx('deal-image')}></img>
                    </div>
                </Slider_component>
            </div>
            <div className={cx('main-container')}>
                <div className={cx('category')}>
                    <h1>Danh mục sản phẩm</h1>
                    <div className={cx('content')}>
                        {category.map((item) => {
                            return (
                                <div key={item.id} className={cx('cate-item')}>
                                    <img src={item.image}></img>
                                    <span>{item.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {showBtnScrollTop && (
                <div
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={cx('scroll-top')}
                >
                    <FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>
                </div>
            )}
        </div>
    );
}

export default Home;
