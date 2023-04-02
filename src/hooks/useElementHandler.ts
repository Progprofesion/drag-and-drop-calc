import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/index';
import { setDropState } from "src/store/reducer/dropStore";
import { setDisabledDrop } from "src/store/reducer/dropStore";

type TboardElementHandler = {
    id: number
    length?: number
    items?: []
}


const useElementHandler = () => {

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const currentBoard = useSelector((state: RootState) => state.dropStore.currentBoard);
    const currentItem = useSelector((state: RootState) => state.dropStore.currentItem);

    const dataClone = JSON.parse(JSON.stringify(dropState))
    const dispatch = useDispatch();

    const dropElementHandler = (e: React.DragEvent<HTMLDivElement>, board: TboardElementHandler): void => {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
            const operationsCurrent = document.querySelectorAll<HTMLElement>(".pallete__operations")
            const dialCurrent = document.querySelectorAll<HTMLElement>(".pallete__dial");
            const equallyCurrent = document.querySelectorAll<HTMLElement>(".pallete__equally");
            const displayCurrent = document.querySelectorAll<HTMLElement>(".pallete__display");

            //-------------------------- стили для расширения карточки

            (e.target as HTMLElement).childNodes.forEach((item: ChildNode) => {
                (item as HTMLElement).style.marginTop = "0px"

                // DISPLAY
                if (currentItem.id === 1) {
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
                    dialCurrent[1].style.height = "236px"
                }

                // EQUALLY 
                if (currentItem.id === 4) {
                    equallyCurrent[1].style.marginTop = "0px"
                    equallyCurrent[1].style.paddingBottom = "12px"
                    equallyCurrent[1].style.height = "84px"
                }

            })


            if (board.items!.length > 2) {

                (e.target as HTMLElement).style.maxHeight = "448px"
            }

        }, 0);

        (e.target as HTMLElement).childNodes.forEach((item: ChildNode) => {
            (item.firstChild as HTMLElement).style.display = "none"
        })

        // флаг для работы перетаскивания, только в доску для перетаскивания board.id === 2.
        if (board.id === 2) {
            setTimeout(() => {
                (e.target as HTMLElement).childNodes.forEach((item: ChildNode) => {
                    (item as HTMLElement).style.boxShadow = "none"
                })
            }, 0)
            dispatch(setDisabledDrop(true))
        };

        if (board.id === 2) {

            if (currentItem.id === 1) {
                board.items!.unshift(currentItem as never);
                setTimeout(() => {
                    (((e.target as HTMLElement).firstChild as HTMLElement).firstChild as HTMLElement).style.cursor = "not-allowed";
                    ((e.target as HTMLElement).firstChild as HTMLElement).style.cursor = "not-allowed";
                    ((e.target as HTMLElement).firstChild as HTMLElement).draggable = false;

                }, 0)

            }
            if (currentItem.id !== 1) {
                board.items!.push(currentItem as never)
            }
        }

        // отмена копирования элементов в второй доске
        if (currentBoard.id === 2 && board.id === 2) {
            const currentIndex = currentBoard.items.indexOf(currentItem as never);
            board.items!.splice(currentIndex, 1)
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


        if ((e.target as HTMLElement).className === "pallete__wrapp") {
            (e.target as HTMLElement).style.border = "none";
            (e.target as HTMLElement).style.width = "240px";
        }
    }

    return { dropElementHandler }
}

export default useElementHandler