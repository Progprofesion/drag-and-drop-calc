import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/index';
import { setDropDb, setCurrentBoard, setCurrentItem } from "src/store/reducer/dropStore";

const useDelete = () => {

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const currentBoard = useSelector((state: RootState) => state.dropStore.currentBoard);

    const dataClone = JSON.parse(JSON.stringify(dropState))

    const dispatch = useDispatch();

    const doubleClickHandler = (e: any, board: any, item: any) => {
        e.preventDefault()
        const dial: any = document.querySelector(".pallete__dial")
        const buttons: any = document.querySelectorAll(".pallete__dial-button")
        const operations: NodeListOf<Element> = document.querySelectorAll(".pallete__operations")
        const equally = document.querySelectorAll(".pallete__equally")

        if (board.id === 2 && item.id === 2) {
            operations.forEach((item: any) => {
                item.style.cursor = "grab"
                item.style.opacity = "100%"
                item.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
                operations.forEach((item: any) => {
                    item.draggable = true
                })
            })

        }

        if (board.id === 2 && item.id === 3) {
            dial.style.cursor = "grab"
            dial.style.opacity = "100%"
            dial.draggable = "true"
            dial.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
            buttons.forEach((item: any) => {
                item.style.cursor = "grab"

            })

        }

        if (board.id === 2 && item.id === 4) {
            equally.forEach((item: any) => {
                item.style.cursor = "grab"
                item.style.opacity = "100%"
                item.draggable = "true"
                item.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
            })

        }


        if (board.id === 2 && e.target.className !== "pallete__display") {
            const currentIndex = board.items.indexOf(item)
            board.items.splice(currentIndex, 1)
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


    return { doubleClickHandler }
}

export default useDelete