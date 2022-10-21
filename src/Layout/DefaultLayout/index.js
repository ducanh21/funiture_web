import Header from '../components/Header';
import Footer from '../components/Footer';

function Defaultlayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className="container">{children}</div>
            <Footer></Footer>
        </div>
    );
}

export default Defaultlayout;
