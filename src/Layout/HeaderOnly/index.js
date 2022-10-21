import Header from '../components/Header';

function HeaderOnly({ children }) {
    return (
        <div>
            <Header></Header>
            <div className="container">{children}</div>
        </div>
    );
}

export default HeaderOnly;
