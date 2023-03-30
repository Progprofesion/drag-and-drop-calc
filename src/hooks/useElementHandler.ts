import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/index';
import { setDropDb } from "src/store/reducer/dropStore";
import { setDisabledDrop } from "src/store/reducer/dropStore";
import { TuseStartOverLeaveEnd } from "./useStartOverLeaveEnd"

type Theigth = {
    style: {
        paddingBottom: string
        marginTop: string
        boxShadow: string
    }
    firstChild: {
        style: {
            display: string

        }
    }
}

const useElementHandler = () => {

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const currentBoard = useSelector((state: RootState) => state.dropStore.currentBoard);
    const currentItem = useSelector((state: RootState) => state.dropStore.currentItem);

    const dataClone = JSON.parse(JSON.stringify(dropState))
    const dispatch = useDispatch();

    const dropElementHandler = (e: TuseStartOverLeaveEnd, board: TuseStartOverLeaveEnd): void => {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(() => {
            const operationsCurrent = document.querySelectorAll<HTMLElement>(".pallete__operations")
            const dialCurrent = document.querySelectorAll<HTMLElement>(".pallete__dial");
            const equallyCurrent = document.querySelectorAll<HTMLElement>(".pallete__equally");
            const displayCurrent = document.querySelectorAll<HTMLElement>(".pallete__display");

            //-------------------------- стили для расширения карточки

            e.target.childNodes.forEach((item: Theigth) => {
                // console.log(item)
                // item.style.paddingBottom = "12px"
                item.style.marginTop = "0px"

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
                    // console.log(boards[1].items.length)
                }

                // EQUALLY 
                if (currentItem.id === 4) {
                    equallyCurrent[1].style.marginTop = "0px"
                    equallyCurrent[1].style.paddingBottom = "12px"
                    equallyCurrent[1].style.height = "84px"
                }

            })


            if (board.items.length > 2) {

                e.target.style.maxHeight = "448px"
                // e.target.lastChild.style.marginTop = "-1px"
                // e.target.lastChild.style.paddingBottom = "0px"
            }

        }, 0)

        e.target.childNodes.forEach((item: Theigth) => {
            item.firstChild.style.display = "none"
        })

        // флаг для работы перетаскивания, только в доску для перетаскивания board.id === 2.
        if (board.id === 2) {
            setTimeout(() => {
                e.target.childNodes.forEach((item: Theigth) => {
                    item.style.boxShadow = "none"
                })
            }, 0)
            dispatch(setDisabledDrop(true))
        }
        if (board.id === 2) {

            if (currentItem.id === 1) {
                board.items.unshift(currentItem as never)
                setTimeout(() => {
                    e.target.firstChild.firstChild.style.cursor = "not-allowed"
                    e.target.firstChild.style.cursor = "not-allowed"
                    e.target.firstChild.draggable = false
                }, 0)

            }
            if (currentItem.id !== 1) {
                board.items.push(currentItem as never)

                // ????????????????
                // if (e.target.firstChild) {
                //     // setTimeout(() => {
                //     // e.target.firstChild.firstChild.style.cursor = "not-allowed"
                //     // }, 0)
                // }

            }


        }
        // отмена копирования элементов в второй доске
        if (currentBoard.id === 2 && board.id === 2) {
            const currentIndex = currentBoard.items.indexOf(currentItem as never);
            board.items.splice(currentIndex, 1)
        }

        dispatch(setDropDb(
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


        if (e.target.className === "pallete__wrapp") {
            e.target.style.border = "none"
            e.target.style.width = "240px"
        }
    }



    return { dropElementHandler }
}

export default useElementHandler