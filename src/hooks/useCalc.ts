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


        if (operation && !result) {
            if (arrayOfSecondNumbers.length >= 9) {
                return
            }
            if (secondNumbers.includes(',') || !secondNumbers) {
                e = (e as string).replace(",", "0,");

            }
            if (secondNumbers.includes(',')) {
                e = (e as string).replace("0,", "");
                console.log(secondNumbers)
            }
            if ((e.toString() as string) === "0" && arrayOfSecondNumbers.length === 0) {
                e = (e as string).replace("0", "");
            }
            dispatch(setSecondNumber(e));
            dispatch(setCalcResult(0));

        } else {
            if (arrayOfFirstNumbers.length >= 9) {
                return
            }
            if (firstNumbers.includes(',') || !firstNumbers) {
                e = (e as string).replace(",", "0,");
            }
            if (firstNumbers.includes(',')) {
                e = (e as string).replace("0,", "");
                console.log(firstNumbers)
            }
            if ((e.toString() as string) === "0" && arrayOfFirstNumbers.length === 0) {
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

        const firstNumb = parseFloat(firstNumbers.replace(',', '.') as never)
        const secondNumb = parseFloat(secondNumbers.replace(',', '.') as never)

        switch (operation) {
            case '+':
                setResult(result = saveResalt && !firstNumbers ?
                    saveResalt + secondNumb :

                    firstNumb + secondNumb);
                break;
            case '-':
                setResult(result = saveResalt && !firstNumbers ?
                    saveResalt - secondNumb :

                    firstNumb - secondNumb);
                break;
            case 'x':
                setResult(result = saveResalt && !firstNumbers ?
                    saveResalt * secondNumb :

                    firstNumb * secondNumb);
                break;
            case '/':
                setResult(result = saveResalt && !firstNumbers && secondNumbers !== "0" ?
                    saveResalt / secondNumb :

                    firstNumb / secondNumb);
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


        if (arrayOfDigits.length > 9 && secondNumb !== 0) {
            result = (result as string).toString().substring(0, 9);
        }



        if (secondNumbers) {
            dispatch(setCalcResult(result.toString().replace(".", ",")));
            dispatch(setSaveResalt(result));
            dispatch(setOperation(""));
            dispatch(setClearFirstNumbers(""));
            dispatch(setClearSecondNumbers(""));
        }

    };

    return { handleInputNumber, handleCalculate }

}

export default useCalc