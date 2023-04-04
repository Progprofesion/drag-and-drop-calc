import { useDispatch, useSelector } from 'react-redux';
import runtimeImg from '../../assets/icon/runtimeImg.svg';
import constructorImg from '../../assets/icon/constructorImg.svg';
import { setHugState } from "src/store/reducer/dropStore";
import useToggle from "src/hooks/useToggle";
import { RootState } from 'src/store/index';

import './hug.scss';

const Hug = () => {
    const hugState = useSelector((state: RootState) => state.dropStore.hugState);
    const dispatch = useDispatch();

    const { togleRunConstr } = useToggle()

    return (
        <section className="hug">
            <button
                onClick={() => {
                    dispatch(setHugState(true))
                    togleRunConstr()
                }}
                disabled={hugState}
                className={hugState === true ? "hug__runtime hug__runtime_active" : "hug__runtime"}>
                <div className="hug__runtime-wrapp">
                    <img src={runtimeImg} alt="" className="hug__runtime-icon" />
                    <div className="hug__runtime-text">Runtime</div>
                </div>
            </button>
            <button
                disabled={!hugState}
                onClick={() => {
                    dispatch(setHugState(false))
                    togleRunConstr()
                }}
                className={hugState === false ? "hug__constructor" : "hug__constructor hug__constructor_active"}>
                <div className="hug__constructor-wrapp">
                    <img src={constructorImg} alt="" className="hug__constructor-icon" />
                    <div className="hug__constructor-text">Constructor</div>
                </div>
            </button>
        </section>
    )
}

export default Hug;