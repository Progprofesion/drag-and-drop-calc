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
    const calcResult = useSelector((state: RootState) => state.calcStore.calcResult);
    const saveResalt = useSelector((state: RootState) => state.calcStore.saveResalt);
    const firstNumbers = useSelector((state: RootState) => state.calcStore.firstNumbers);
    const secondNumbers = useSelector((state: RootState) => state.calcStore.secondNumbers);
    const operation = useSelector((state: RootState) => state.calcStore.operation);


    const displayInput = document.querySelectorAll<HTMLElement>(".pallete__display-input");

    // const [saveResalt, setSaveResalt] = useState(0);
    // if (firstNumbers) {
    //     console.log(displayInput)
    //     displayInput[1].style.fontSize = "24px"
    // }

    const handleInputNumber = (e: React.MouseEvent | string) => {
        if (operation) {
            dispatch(setSecondNumber(e));
            dispatch(setCalcResult(0));
        } else {

            dispatch(setFirstNumber(e));
            dispatch(setCalcResult(0));
            displayInput[1].style.fontSize = "36px";
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
                    displayInput[1].style.fontSize = "24px"
                }
                break;
            default:
                result = saveResalt;
        }

        dispatch(setCalcResult(result));
        dispatch(setSaveResalt(result));
        console.log(calcResult);
        console.log(saveResalt);
        dispatch(setOperation(""));
        dispatch(setClearFirstNumbers(""));
        dispatch(setClearSecondNumbers(""));
    };

    return { handleInputNumber, handleCalculate }

}

export default useCalc