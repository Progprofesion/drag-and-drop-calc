import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/store/index';

import {
    setCalckResult,
    setFirstNumber,
    setSecondNumber,
    setClearSecondNumbers,
    setClearFirstNumbers,
    setOperation
} from "src/store/reducer/calcStore";


const useCalck = () => {

    const dispatch = useDispatch();

    const firstNumbers = useSelector((state: RootState) => state.calcStore.firstNumbers);
    const secondNumbers = useSelector((state: RootState) => state.calcStore.secondNumbers);
    const operation = useSelector((state: RootState) => state.calcStore.operation);

    const [saveResalt, setSaveResalt] = useState(0);

    const handleInputNumber = (e: React.MouseEvent) => {
        if (operation) {
            dispatch(setSecondNumber(e));
            dispatch(setCalckResult(null));
        } else {
            dispatch(setFirstNumber(e));
            dispatch(setCalckResult(null));
        }

    };

    const handleCalculate = () => {
        let result;
        switch (operation) {
            case '+':
                result = saveResalt ? saveResalt + parseFloat(secondNumbers as never) : parseFloat(firstNumbers as never) + parseFloat(secondNumbers as never);
                break;
            case '-':
                result = saveResalt ? saveResalt - (secondNumbers as never) : parseFloat(firstNumbers as never) - parseFloat(secondNumbers as never);
                break;
            case 'x':
                result = saveResalt ? saveResalt * (secondNumbers as never) : parseFloat(firstNumbers as never) * parseFloat(secondNumbers as never);
                break;
            case '/':
                result = saveResalt ? saveResalt / (secondNumbers as never) : parseFloat(firstNumbers as never) / parseFloat(secondNumbers as never);
                break;
            default:
                result = saveResalt;
        }

        dispatch(setCalckResult(result));
        setSaveResalt(result)


        dispatch(setOperation(""));
        dispatch(setClearFirstNumbers(""));
        dispatch(setClearSecondNumbers(""));
    };

    return { handleInputNumber, handleCalculate }

}

export default useCalck