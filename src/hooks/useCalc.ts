import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/store/index';
import { useToggleTest } from "src/hooks/useToggleTest";
// FC from react
import {
    setResult,
    setCalcResult,
    setSaveResalt,
    setFirstNumber,
    setSecondNumber,
    setClearSecondNumbers,
    setClearFirstNumbers,
    setOperation,
    setCalcArr,
} from "src/store/reducer/calcStore";


const useCalc = () => {

    const dispatch = useDispatch();

    let result = useSelector((state: RootState) => state.calcStore.result);
    const saveResalt = useSelector((state: RootState) => state.calcStore.saveResalt);
    const firstNumbers = useSelector((state: RootState) => state.calcStore.firstNumbers);
    const secondNumbers = useSelector((state: RootState) => state.calcStore.secondNumbers);
    const operation = useSelector((state: RootState) => state.calcStore.operation);
    const calcArr: any = useSelector((state: RootState) => state.calcStore.calcArr);
    const calcResult = useSelector((state: RootState) => state.calcStore.calcResult);

    const displayInput = document.querySelectorAll<HTMLElement>(".pallete__display-input");
    const handleInputNumber = (e: React.ChangeEvent<HTMLInputElement> | string) => {

        const arrayOfFirstNumbers = Array.from(String(firstNumbers), Number);

        dispatch(setFirstNumber(e));
        if (arrayOfFirstNumbers.length >= 9) {
            return
        }
        if (firstNumbers === "0") {

        }
        if (firstNumbers.includes(',')) {
            e = (e as string).replace(",", "");
        }
        if (arrayOfFirstNumbers[0] === 0) {
            e = (e as string).replace("0", "");
        }
        // dispatch(setCalcResult(0));
        displayInput[1].style.fontSize = "36px";
        displayInput[1].style.fontWeight = "800";
        displayInput[1].style.paddingTop = "unset"




    };


    useEffect(() => {
        let sum = calcArr.reduce((acc: any, next: any) => acc + next, 0)
        dispatch(setCalcResult(sum));
    }, [firstNumbers])


    const arrNumbers = () => {
        dispatch(setCalcArr(parseFloat(firstNumbers)));

        dispatch(setClearFirstNumbers(""));
    }

    console.log(calcArr)
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
            result = (result as string).toString().substring(0, 9);
        }


        dispatch(setSaveResalt(result));

        dispatch(setOperation(""));
        dispatch(setClearFirstNumbers(""));
        dispatch(setClearSecondNumbers(""));

        if (calcArr) {
            dispatch(setCalcArr(parseFloat(firstNumbers)));
            let sum = calcArr.reduce((acc: any, next: any) => acc + next, 0)
            dispatch(setCalcResult(sum));
            console.log(calcResult)
        }


        // dispatch(setClearArr([]))
    };

    return { handleInputNumber, handleCalculate, arrNumbers }

}

export default useCalc