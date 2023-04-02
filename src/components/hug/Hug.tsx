import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import runtimeImg from '../../assets/icon/runtimeImg.svg';
import constructorImg from '../../assets/icon/constructorImg.svg';
import { setHugState } from "src/store/reducer/dropStore";
import { RootState } from 'src/store/index';

import './hug.scss';

const Hug = () => {



    const hugState = useSelector((state: RootState) => state.dropStore.hugState);

    const dispatch = useDispatch();

    const [disabledButton, setDisabledButton] = useState(false);

    // useEffect(() => {
    // }, [hugState])

    // console.log(hugState)

    const togleRunConst = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const wrap: any = document.querySelectorAll<HTMLDivElement>(".pallete__wrapp")
        if (!hugState) {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = false
            })
            wrap[0].childNodes.forEach((item: any) => {
                item.draggable = false
            })
        } else {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = true
            })
            wrap[0].childNodes.forEach((item: any) => {
                item.draggable = true
            })
        }
        // if (hugState) {
        //     wrap[1].childNodes.forEach((item: any) => {
        //         item.draggable = true
        //     })
        // }


    }

    return (
        <section className="hug">
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    dispatch(setHugState(true))
                    togleRunConst(e)
                }}
                disabled={disabledButton}
                className={hugState === true ? "hug__runtime hug__runtime_active" : "hug__runtime"}>
                <div className="hug__runtime-wrapp">
                    <img src={runtimeImg} alt="" className="hug__runtime-icon" />
                    <div className="hug__runtime-text">Runtime</div>
                </div>
            </button>
            <button
                disabled={disabledButton}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    dispatch(setHugState(false))
                    togleRunConst(e)
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