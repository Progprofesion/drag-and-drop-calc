import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/store/index';

import {
    setResult,
    setCalcResult,
    setSaveResalt,
    setFirstNumber,
    setSecondNumber,
    setClearSecondNumbers,
    setClearFirstNumbers,
    setOperation
} from "src/store/reducer/calcStore";


const useCalc = () => {

    const dispatch = useDispatch();

    let result = useSelector((state: RootState) => state.calcStore.result);
    const saveResalt = useSelector((state: RootState) => state.calcStore.saveResalt);
    const firstNumbers = useSelector((state: RootState) => state.calcStore.firstNumbers);
    const secondNumbers = useSelector((state: RootState) => state.calcStore.secondNumbers);
    const operation = useSelector((state: RootState) => state.calcStore.operation);

    const displayInput = document.querySelectorAll<HTMLElement>(".pallete__display-input");

    const handleInputNumber = (e: React.ChangeEvent<HTMLInputElement> | string) => {

        const arrayOfFirstNumbers = Array.from(String(firstNumbers), Number);
        const arrayOfSecondNumbers = Array.from(String(secondNumbers), Number);


        if (operation) {
            if (arrayOfSecondNumbers.length >= 9) {
                return
            }
            if (firstNumbers.includes(',') || !firstNumbers) {
                e = (e as string).replace(",", "");
            }
            if ((e.toString() as any) === "0" && arrayOfFirstNumbers.length === 1) {
                e = (e as string).replace("0", "");
            }
            dispatch(setSecondNumber(e));
            dispatch(setCalcResult(0));
        } else {
            if (arrayOfFirstNumbers.length >= 9) {
                return
            }
            if (firstNumbers.includes(',') || !firstNumbers) {
                e = (e as string).replace(",", "");
            }
            if ((e.toString() as any) === "0" && arrayOfFirstNumbers.length === 1) {
                e = (e as string).replace("0", "");
            }
            dispatch(setFirstNumber(e));
            dispatch(setCalcResult(0));
            displayInput[1].style.fontSize = "36px";
            displayInput[1].style.fontWeight = "800";
            displayInput[1].style.paddingTop = "unset"
        }
    };

    const handleCalculate = () => {
        switch (operation) {
            case '+':
                setResult(result = saveResalt && !firstNumbers ?
                    saveResalt + parseFloat(secondNumbers.replace(',', '.') as never) :

                    parseFloat(firstNumbers.replace(',', '.') as never) + parseFloat(secondNumbers.replace(',', '.') as never));
                break;
            case '-':
                setResult(result = saveResalt && !firstNumbers ?
                    saveResalt - parseFloat(secondNumbers.replace(',', '.') as never) :

                    parseFloat(firstNumbers.replace(',', '.') as never) - parseFloat(secondNumbers.replace(',', '.') as never));
                break;
            case 'x':
                setResult(result = saveResalt && !firstNumbers ?
                    saveResalt * parseFloat(secondNumbers.replace(',', '.') as never) :

                    parseFloat(firstNumbers.replace(',', '.') as never) * parseFloat(secondNumbers.replace(',', '.') as never));
                break;
            case '/':
                setResult(result = saveResalt && !firstNumbers && secondNumbers !== "0" ?
                    saveResalt / (secondNumbers.replace(',', '.') as never) :

                    parseFloat(firstNumbers.replace(',', '.') as never) / parseFloat(secondNumbers.replace(',', '.') as never));
                if (secondNumbers === "0") {
                    result = "Не определено"
                    displayInput[1].style.fontSize = "24px";
                    displayInput[1].style.paddingTop = "19px"
                }
                break;
            default:
                result = saveResalt;
        }

        const arrayOfDigits = Array.from(String(result), Number);

        if (arrayOfDigits.length > 9) {
            result = (result as any).toString().substring(0, 9);
        }

        dispatch(setCalcResult(result));
        dispatch(setSaveResalt(result));

        dispatch(setOperation(""));
        dispatch(setClearFirstNumbers(""));
        dispatch(setClearSecondNumbers(""));
    };

    return { handleInputNumber, handleCalculate }

}

export default useCalc