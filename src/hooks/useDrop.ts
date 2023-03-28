import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store/index';
import { setDropDb } from "src/store/reducer/dropStore";


const useDrop = () => {

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const currentBoard = useSelector((state: RootState) => state.dropStore.currentBoard);
    const currentItem = useSelector((state: RootState) => state.dropStore.currentItem);

    const dataClone = JSON.parse(JSON.stringify(dropState))
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(false) as any

    const dropHandler: any = (e: any, board: any, item: any) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e.target)


        setTimeout(() => {
            const operationsCurrent: any = document.querySelectorAll(".pallete__operations")
            const dialCurrent: any = document.querySelectorAll(".pallete__dial");
            const equallyCurrent: any = document.querySelectorAll(".pallete__equally");
            const displayCurrent: any = document.querySelectorAll(".pallete__display");

            //-------------------------- стили для расширения карточки

            e.target.parentNode.style.height = "448px"
            // console.log(dataClone)
            // if(item.id === board.l)
            if (board.items.length >= 4) {
                // console.log(e.target.parentNode)
                e.target.parentNode.style.height = "448px"
                // e.target.style.marginTop = "-1px"
                // e.target.style.paddingBottom = "0px"
            }


            // DISPLAY
            if (currentItem.id === 1 && dataClone[1].items.length <= 4 && displayCurrent[1]) {
                displayCurrent[1].style.marginTop = "0px"
                displayCurrent[1].style.paddingBottom = "12px"
                displayCurrent[1].style.height = "72px"
            }

            // OPERATIONS
            if (currentItem.id === 2 && dataClone[1].items.length <= 4) {
                operationsCurrent[1].style.marginTop = "0px"
                operationsCurrent[1].style.paddingBottom = "12px"
                operationsCurrent[1].style.height = "68px"
            }

            // DIAL 
            if (currentItem.id === 3 && dataClone[1].items.length <= 4) {
                dialCurrent[1].style.marginTop = "0px"
                dialCurrent[1].style.paddingBottom = "12px"
                dialCurrent[1].style.height = "237px"
            }

            // EQUALLY 
            if (currentItem.id === 4 && dataClone[1].items.length <= 4) {
                equallyCurrent[1].style.marginTop = "0px"
                equallyCurrent[1].style.paddingBottom = "12px"
                equallyCurrent[1].style.height = "84px"
            }
        }, 0)

        if (e.target.className === "pallete__display") {
            e.target.firstChild.style.display = "none"

        }
        if (e.target.className === "pallete__operations") {
            e.target.firstChild.style.display = "none"
        }
        if (e.target.className === "pallete__dial") {
            e.target.firstChild.style.display = "none"

        }
        if (e.target.className === "pallete__qually") {
            e.target.firstChild.style.display = "none"
        }

        if (e.target.firstChild) {
            e.target.firstChild.style.display = "none"
        }


        if (currentItem.id === 1) {
            setDisabled(true)
            if (board.id === 2) {
                board.items.unshift(currentItem as never)
                setTimeout(() => {
                    e.target.parentElement.childNodes[0].style.boxShadow = "none"
                    e.target.parentElement.childNodes[0].style.cursor = "not-allowed"
                    e.target.parentElement.childNodes[0].draggable = false

                    // нужно для отмены тени у инпута при аншифте на эелемент
                }, 0)
            }


            dispatch(setDropDb(
                dataClone.map((b: any) => {
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
            setDisabled(true)
            // запрет на перетаскивание элементов в 1 доску
            setTimeout(() => {
                e.target.parentNode.childNodes.forEach((item: any) => {
                    item.style.boxShadow = "none"
                })
            })

            if (board.id === 2 && e.target.className !== "pallete__display") {
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 1, currentItem)
                setTimeout(() => {
                    if (e.target.previousSibling) {
                        e.target.previousSibling.style.boxShadow = "none"
                    }
                }, 0)
            }
            if (e.target.className === "pallete__display") {
                console.log(e.target)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex + 1, 0, currentItem)

            }

            dispatch(setDropDb(
                dataClone.map((b: any) => {
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
                setDisabled(false)

            }, 0)

            if (e.target.className === "pallete__display") {
                const currentIndex = currentBoard.items.indexOf(currentItem as never)
                board.items.splice(currentIndex, 1, 1)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex + 1, 0, currentItem)
            }

            // смена позиции карточки в текущей доске
            if (e.target.className !== "pallete__display") {
                const currentIndex = currentBoard.items.indexOf(currentItem as never);
                board.items.splice(currentIndex, 1)
                const dropIndex = board.items.indexOf(item)
                board.items.splice(dropIndex, 0, currentItem)
            }



            dispatch(setDropDb(
                dataClone.map((b: any) => {
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