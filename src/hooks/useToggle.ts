import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/index';
import { setCalckResult } from 'src/store/reducer/calcStore';

type Titem = {
    style: { cursor: string }
}

const useToggle = () => {

    const hugState = useSelector((state: RootState) => state.dropStore.hugState);
    const dispatch = useDispatch();

    const togleRunConstr = () => {

        const wrap: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>(".pallete__wrapp");
        const display: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>(".pallete__display");
        const operations: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>(".pallete__operations");
        const dial: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>(".pallete__dial");
        const equally: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>(".pallete__equally");
        const hugConstr: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".hug__constructor")
        const hugRunt: HTMLDivElement | null = document.querySelector<HTMLDivElement>(".hug__runtime")

        if (!hugState) {
            (hugConstr as HTMLDivElement).style.pointerEvents = "none";
            (hugConstr as HTMLDivElement).style.pointerEvents = "all";
            (hugConstr as HTMLDivElement).style.cursor = "pointer";
            wrap[1].childNodes.forEach((item: {}) => {
                (item as { draggable: boolean }).draggable = false
            });
            wrap[0].style.display = "none"
            wrap[1].childNodes.forEach((item: {}) => {
                (item as Titem).style.cursor = "default"
            });
            wrap[1].style.gridColumnStart = "2";
            wrap[1].style.gridColumnEnd = "2";
            if (operations[1]) {
                (operations[1].lastChild as HTMLDivElement).style.zIndex = "1";
                (operations[1].lastChild as HTMLDivElement).childNodes.forEach((item: {}) => {
                    (item as HTMLDivElement).style.cursor = "pointer"
                })
            }
            // Dial 
            if (dial[1]) {
                (dial[1].lastChild as HTMLDivElement).style.zIndex = "1";
                (dial[1].lastChild as HTMLDivElement).childNodes.forEach((item: {}) => {
                    (item as Titem).style.cursor = "pointer"
                })
            };
            // Equally
            if (equally[1]) {
                (equally[1].lastChild as HTMLDivElement).style.cursor = "pointer";
                (equally[1].lastChild as HTMLDivElement).style.zIndex = "1";
            }

        } else if (hugState) {
            dispatch(setCalckResult(0));
            (hugConstr as HTMLDivElement).style.pointerEvents = "none";
            (hugConstr as HTMLDivElement).style.pointerEvents = "all";
            wrap[1].childNodes.forEach((item: {}) => {
                (item as { draggable: boolean }).draggable = true;
                (item as Titem).style.cursor = "grab"
            })
            wrap[0].style.display = "block"

            if (display[1]) {
                display[1].draggable = false
                display[1].style.cursor = "not-allowed"
            }
            if (operations[1]) {
                (operations[1].lastChild as HTMLDivElement).style.zIndex = "-1";
            }
            if (dial[1]) {
                (dial[1].lastChild as HTMLDivElement).style.zIndex = "-1"
            }
            if (equally[1]) {
                (equally[1].lastChild as HTMLDivElement).style.zIndex = "-1"
            }
        }
    }

    return { togleRunConstr }
}

export default useToggle