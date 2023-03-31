import { useDispatch } from 'react-redux';
import runtimeImg from '../../assets/icon/runtimeImg.svg';
import constructorImg from '../../assets/icon/constructorImg.svg';
import { setHugState } from "src/store/reducer/dropStore";

import './hug.scss';


const Hug = () => {

    const dispatch = useDispatch();


    return (
        <section className="hug">
            <div className="hug__runtime">

                <div className="hug__runtime-wrapp">
                    <img src={runtimeImg} alt="" className="hug__runtime-icon" />
                    <div className="hug__runtime-text">Runtime</div>
                </div>
            </div>
            <button className="hug__constructor">
                <div className="hug__constructor-wrapp">
                    <img src={constructorImg} alt="" className="hug__constructor-icon" />
                    <div className="hug__constructor-text">Constructor</div>
                </div>
            </button>
        </section>
    )
}

export default Hug;