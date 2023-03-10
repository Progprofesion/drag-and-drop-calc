import runtimeImg from '../../assets/icon/runtimeImg.svg';
import constructorImg from '../../assets/icon/constructorImg.svg';

import './header.scss';


const Header = () => {
    return (
        <section className="header">
            <div className="header__runtime">
                <div className="header__runtime-wrapp">
                    <img src={runtimeImg} alt="" className="header__runtime-icon" />
                    <div className="header__runtime-text">Runtime</div>
                </div>
            </div>
            <div className="header__constructor">
                <div className="header__constructor-wrapp">
                    <img src={constructorImg} alt="" className="header__constructor-icon" />
                    <div className="header__constructor-text">Constructor</div>
                </div>
            </div>
        </section>
    )
}

export default Header