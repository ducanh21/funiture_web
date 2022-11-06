import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbox from '../../components/Chatbox';
function Defaultlayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className="container">{children}</div>
            <Chatbox></Chatbox>
            <Footer></Footer>
        </div>
    );
}

export default Defaultlayout;
