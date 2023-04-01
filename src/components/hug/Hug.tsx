import { useDispatch, useSelector } from 'react-redux';
import runtimeImg from '../../assets/icon/runtimeImg.svg';
import constructorImg from '../../assets/icon/constructorImg.svg';
import { setHugState } from "src/store/reducer/dropStore";
import { RootState } from 'src/store/index';

import './hug.scss';

type Thug = {
    e: any
}


const Hug = () => {

    const wrap = document.querySelectorAll<HTMLDivElement>(".pallete__wrapp")

    const hugState = useSelector((state: RootState) => state.dropStore.hugState);

    const dispatch = useDispatch();
    // console.log(hugState)

    const togleRunConst = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (hugState === true) {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = false;
            })
        }
        if (hugState === false) {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = true;
            })
        }

    }

    return (
        <section className="hug">
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    dispatch(setHugState(true && false))
                    togleRunConst(e)
                }}
                className="hug__runtime">
                <div className="hug__runtime-wrapp">
                    <img src={runtimeImg} alt="" className="hug__runtime-icon" />
                    <div className="hug__runtime-text">Runtime</div>
                </div>
            </button>
            <button
                onClick={() => dispatch(setHugState(true))}
                className="hug__constructor">
                <div className="hug__constructor-wrapp">
                    <img src={constructorImg} alt="" className="hug__constructor-icon" />
                    <div className="hug__constructor-text">Constructor</div>
                </div>
            </button>
        </section>
    )
}

export default Hug;