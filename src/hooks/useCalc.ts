import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/store/index';

import {
    setCalcResult,
    setFirstNumber,
    setSecondNumber,
    setClearSecondNumbers,
    setClearFirstNumbers,
    setOperation
} from "src/store/reducer/calcStore";


const useCalc = () => {

    const dispatch = useDispatch();

    const firstNumbers = useSelector((state: RootState) => state.calcStore.firstNumbers);
    const secondNumbers = useSelector((state: RootState) => state.calcStore.secondNumbers);
    const operation = useSelector((state: RootState) => state.calcStore.operation);

    const displayInput = document.querySelectorAll<HTMLElement>(".pallete__display-input");

    const [saveResalt, setSaveResalt] = useState(0);
    // if (firstNumbers) {
    //     console.log(displayInput)
    //     displayInput[1].style.fontSize = "24px"
    // }

    const handleInputNumber = (e: React.MouseEvent) => {
        if (operation) {
            dispatch(setSecondNumber(e));
            dispatch(setCalcResult(null));
        } else {
            dispatch(setFirstNumber(e));
            dispatch(setCalcResult(null));
            displayInput[1].style.fontSize = "36px";
        }
    };

    const handleCalculate = () => {
        let result;
        switch (operation) {
            case '+':
                result = saveResalt && !firstNumbers ? saveResalt + parseFloat(secondNumbers as never) : parseFloat(firstNumbers as never) + parseFloat(secondNumbers as never);
                break;
            case '-':
                result = saveResalt && !firstNumbers ? saveResalt - (secondNumbers as never) : parseFloat(firstNumbers as never) - parseFloat(secondNumbers as never);
                break;
            case 'x':
                result = saveResalt && !firstNumbers ? saveResalt * (secondNumbers as never) : parseFloat(firstNumbers as never) * parseFloat(secondNumbers as never);
                break;
            case '/':
                result = saveResalt && !firstNumbers && secondNumbers !== "0" ? saveResalt / (secondNumbers as never) : parseFloat(firstNumbers as never) / parseFloat(secondNumbers as never);
                if (secondNumbers === "0") {
                    result = "Не определено"
                    displayInput[1].style.fontSize = "24px"
                }
                break;
            default:
                result = saveResalt;
        }

        dispatch(setCalcResult(result));
        setSaveResalt(result as any)


        dispatch(setOperation(""));
        dispatch(setClearFirstNumbers(""));
        dispatch(setClearSecondNumbers(""));
    };

    return { handleInputNumber, handleCalculate }

}

export default useCalc