import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/index';
import { setDropDb, setCurrentBoard, setCurrentItem } from "src/store/reducer/dropStore";

export interface TuseDelete {
    preventDefault: () => void;
    id: number
    target: {
        className: {}
    }
    items: []
}

type Telements = {
    style: {
        cursor: string
        opacity: string
        boxShadow: string
    }
    draggable: boolean
}

const useDelete = () => {

    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const currentBoard = useSelector((state: RootState) => state.dropStore.currentBoard);

    const dataClone = JSON.parse(JSON.stringify(dropState))

    const dispatch = useDispatch();

    const doubleClickHandler = (e: TuseDelete, board: TuseDelete, item: TuseDelete) => {
        e.preventDefault()
        const dial = document.querySelector<HTMLElement>(".pallete__dial")
        const buttons = document.querySelectorAll<HTMLElement>(".pallete__dial-button")
        const operations = document.querySelectorAll<HTMLElement>(".pallete__operations")
        const equally = document.querySelectorAll<HTMLElement>(".pallete__equally")

        if (board.id === 2 && item.id === 2) {
            operations.forEach((item: Telements) => {
                item.style.cursor = "grab"
                item.style.opacity = "100%"
                item.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
                operations.forEach((item: { draggable: boolean }) => {
                    item.draggable = true
                })
            })

        }

        if (dial && board.id === 2 && item.id === 3) {
            dial.style.cursor = "grab"
            dial.style.opacity = "100%"
            dial.draggable = true
            dial.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
            buttons.forEach((item: Telements) => {
                item.style.cursor = "grab"

            })

        }

        if (board.id === 2 && item.id === 4) {
            equally.forEach((item: Telements) => {
                item.style.cursor = "grab"
                item.style.opacity = "100%"
                item.draggable = true
                item.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"
            })

        }


        if (board.id === 2 && e.target.className !== "pallete__display") {
            const currentIndex = board.items.indexOf(item as never)
            board.items.splice(currentIndex, 1)
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
        }
    }


    return { doubleClickHandler }
}

export default useDelete