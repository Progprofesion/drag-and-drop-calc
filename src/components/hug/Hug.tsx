import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDropDbQuery } from "../api/apiSlice";
import runtimeImg from '../../assets/icon/runtimeImg.svg';
import constructorImg from '../../assets/icon/constructorImg.svg';
import { setDropState, setHugState } from "src/store/reducer/dropStore";
import { RootState } from 'src/store/index';

import './hug.scss';

const Hug = () => {


    const {
        data = [],
        isSuccess
    } = useGetDropDbQuery(null);


    const hugState = useSelector((state: RootState) => state.dropStore.hugState);
    const dropState = useSelector((state: RootState) => state.dropStore.dropState);

    const dispatch = useDispatch();

    const [disabledButton, setDisabledButton] = useState(false);

    // useEffect(() => {
    // }, [hugState])

    // console.log(hugState)

    const togleRunConst = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const wrap: any = document.querySelectorAll<HTMLDivElement>(".pallete__wrapp")
        const pallete: any = document.querySelector<HTMLDivElement>(".pallete")
        if (!hugState) {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = false
            })
            wrap[0].childNodes.forEach((item: any) => {
                item.draggable = false
            })
            wrap[0].style.display = "none"
            pallete.style.gridTemplateColumns = "none"
        } else if (hugState) {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = true
            })
            wrap[0].childNodes.forEach((item: any) => {
                item.draggable = true
            })
            wrap[0].style.display = "block"
            pallete.style.gridTemplateColumns = "248px 248px"
            console.log(wrap[0])
            wrap[0].childNodes.forEach((item: any) => {
                item.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
                item.style.opacity = "100%"
                item.style.cursor = "grab"
            })
            // const cloneDropState = dropState.splice(2)
            dispatch(setDropState(data))
        }

    }

    return (
        <section className="hug">
            <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    dispatch(setHugState(true))
                    togleRunConst(e)
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