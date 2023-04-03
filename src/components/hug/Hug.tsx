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
        const wrap: any = document.querySelectorAll<HTMLDivElement>(".pallete__wrapp");
        const pallete: any = document.querySelector<HTMLDivElement>(".pallete");
        const display: any = document.querySelector<HTMLDivElement>(".pallete__display");
        const operations: any = document.querySelectorAll<HTMLDivElement>(".pallete__operations");
        const dial: any = document.querySelectorAll<HTMLDivElement>(".pallete__dial");
        const equally: any = document.querySelectorAll<HTMLDivElement>(".pallete__equally");


        if (!hugState) {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = false
            })
            wrap[0].style.display = "none"
            console.log(wrap[0].childNodes)
            wrap[1].childNodes.forEach((item: any) => {
                item.style.cursor = "default"
            })
            wrap[1].style.gridColumnStart = 2;
            wrap[1].style.gridColumnEnd = 2;
            if (operations[1]) {
                operations[1].lastChild.style.zIndex = "1";
                operations[1].lastChild.childNodes.forEach((item: any) => {
                    item.style.cursor = "pointer"
                })
            }
            // Dial 
            if (dial[1]) {
                dial[1].lastChild.style.zIndex = "1"
                dial[1].lastChild.childNodes.forEach((item: any) => {
                    item.style.cursor = "pointer"
                })
            }
            // Equally
            if (equally[1]) {
                equally[1].lastChild.style.cursor = "pointer"
                equally[1].lastChild.style.zIndex = "1"
            }

        } else if (hugState) {
            wrap[1].childNodes.forEach((item: any) => {
                item.draggable = true
                item.style.cursor = "grab"
            })
            wrap[0].style.display = "block"
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