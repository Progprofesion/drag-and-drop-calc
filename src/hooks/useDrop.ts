import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/index';
import { setDropState } from "src/store/reducer/dropStore";
import { setDisabledDrop } from "src/store/reducer/dropStore";

type TDrop = {
    items: []
    id: number
}

const useDrop = () => {

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const currentBoard = useSelector((state: RootState) => state.dropStore.currentBoard);
    const currentItem = useSelector((state: RootState) => state.dropStore.currentItem);

    const dataClone = JSON.parse(JSON.stringify(dropState))
    const dispatch = useDispatch();


    const dropHandler = (e: React.DragEvent<HTMLElement>, board: TDrop, item: { id: number }): void => {
        e.preventDefault();
        e.stopPropagation();

        setTimeout(() => {
            const operationsCurrent = document.querySelectorAll<HTMLElement>(".pallete__operations")
            const dialCurrent = document.querySelectorAll<HTMLElement>(".pallete__dial");
            const equallyCurrent = document.querySelectorAll<HTMLElement>(".pallete__equally");
            const displayCurrent = document.querySelectorAll<HTMLElement>(".pallete__display");

            //-------------------------- 
            // Стили для расширения карточки. Нужно для фикса подсветки дропа при наведении в пустое место, между карточек.

            // DISPLAY
            if (currentItem.id === 1 && displayCurrent[1]) {
                displayCurrent[1].style.marginTop = "0px"
                displayCurrent[1].style.paddingBottom = "12px"
                displayCurrent[1].style.height = "72px"
            }

            // OPERATIONS
            if (currentItem.id === 2) {
                operationsCurrent[1].style.marginTop = "0px"
                operationsCurrent[1].style.paddingBottom = "12px"
                operationsCurrent[1].style.height = "68px"
            }

            // DIAL 
            if (currentItem.id === 3) {
                dialCurrent[1].style.marginTop = "0px"
                dialCurrent[1].style.paddingBottom = "12px"
                dialCurrent[1].style.height = "237px"
            }

            // EQUALLY 
            if (currentItem.id === 4) {
                equallyCurrent[1].style.marginTop = "0px"
                equallyCurrent[1].style.paddingBottom = "12px"
                equallyCurrent[1].style.height = "84px"
            }
        }, 0)

        if ((e.target as HTMLElement).className === "pallete__display") {
            ((e.target as HTMLElement).firstChild as HTMLElement).style.display = "none"

        }
        if ((e.target as HTMLElement).className === "pallete__operations") {
            ((e.target as HTMLElement).firstChild as HTMLElement).style.display = "none"
        }
        if ((e.target as HTMLElement).className === "pallete__dial") {
            ((e.target as HTMLElement).firstChild as HTMLElement).style.display = "none"

        }
        if ((e.target as HTMLElement).className === "pallete__qually") {
            ((e.target as HTMLElement).firstChild as HTMLElement).style.display = "none"
        }

        if (((e.target as HTMLElement).firstChild as HTMLElement)) {
            ((e.target as HTMLElement).firstChild as HTMLElement).style.display = "none"
        }


        if (currentItem.id === 1) {
            dispatch(setDisabledDrop(true))
            if (board.id === 2) {
                board.items.unshift(currentItem as never)
                // для отмены тени у инпута при аншифте на элемент
                setTimeout(() => {
                    (((e.target as HTMLElement).parentElement as HTMLElement).childNodes[0] as
                        HTMLElement).style.boxShadow = "none";
                    (((e.target as HTMLElement).parentElement as HTMLElement).childNodes[0] as
                        HTMLElement).style.cursor = "not-allowed";
                    (((e.target as HTMLElement).parentElement as HTMLElement).childNodes[0] as
                        HTMLElement).draggable = false;

                }, 0)
            }

            dispatch(setDropState(
                dataClone.map((b: { id: number }) => {
                    if (b.id === board.id) {
                        return board
                    }
                    if (b.id === currentBoard.id) {
                        return currentBoard
                    }
                    return b
                }
                )))
        }


        if (currentBoard.id === 1 && currentItem.id !== 1) {
            dispatch(setDisabledDrop(true))
            // запрет на перетаскивание элементов в 1 доску
            setTimeout(() => {
                (e.target as HTMLElement).parentNode!.childNodes.forEach((item: ChildNode) => {
                    (item as HTMLElement).style.boxShadow = "none"
                })
            })

            if (board.id === 2 && (e.target as HTMLElement).className !== "pallete__display") {
                const dropIndex = board.items.indexOf(item as never)
                board.items.splice(dropIndex, 0, currentItem as never)
                setTimeout(() => {
                    if ((e.target as HTMLElement).previousSibling) {
                        ((e.target as HTMLElement).previousSibling as HTMLElement).style.boxShadow = "none"
                    }
                }, 0)
            }
            if ((e.target as HTMLElement).className === "pallete__display") {
                const dropIndex = board.items.indexOf(item as never)
                board.items.splice(dropIndex + 1, 0, currentItem as never)
            }

            dispatch(setDropState(
                dataClone.map((b: { id: number }) => {
                    if (b.id === board.id) {
                        return board
                    }
                    if (b.id === currentBoard.id) {
                        return currentBoard
                    }
                    return b
                }
                )))
        }

        if (currentBoard.id === 2 && board.id === 2) {

            setTimeout(() => {
                dispatch(setDisabledDrop(false))

            }, 0)

            if ((e.target as HTMLElement).className === "pallete__display") {
                const currentIndex = currentBoard.items.indexOf(currentItem as never)
                board.items.splice(currentIndex, 1, 1 as never)
                const dropIndex = board.items.indexOf(item as never)
                board.items.splice(dropIndex + 1, 0, currentItem as never)
            }

            if ((e.target as HTMLElement).className !== "pallete__display" && item.id !== currentItem.id) {
                const currentIndex = currentBoard.items.indexOf(currentItem as never);
                board.items.splice(currentIndex, 1)
                const dropIndex = board.items.indexOf(item as never)
                board.items.splice(dropIndex, 0, currentItem as never)
            }



            dispatch(setDropState(
                dataClone.map((b: { id: number }) => {
                    if (b.id === board.id) {
                        return board
                    }
                    if (b.id === currentBoard.id) {
                        return currentBoard
                    }
                    return b
                }
                )))
        }
    }


    return { dropHandler }
}

export default useDrop