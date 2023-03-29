import { ReactNode, useEffect } from "react";
import { useGetDropDbQuery } from "../api/apiSlice";
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'src/store/index';
import { setDropDb } from "src/store/reducer/dropStore";

import useDrop from 'src/hooks/useDrop';
import useElementHandler from 'src/hooks/useElementHandler';
import useStartOverLeaveEnd from "src/hooks/useStartOverLeaveEnd";
import useDelete from "src/hooks/useDelete";

import { TuseStartOverLeaveEnd } from "src/hooks/useStartOverLeaveEnd";

import './palette.scss';

interface Tpallete {
    key: number
    type: string
    props: {}
}

const Pallete = () => {

    const {
        data = [],
        isSuccess
    } = useGetDropDbQuery(null);

    const dispatch = useDispatch();
    const dropState = useSelector((state: RootState) => state.dropStore.dropState);
    const dataClone = JSON.parse(JSON.stringify(dropState))

    useEffect(() => {
        dispatch(setDropDb(data))
    }, [isSuccess])


    const { dropHandler } = useDrop();
    const { dropElementHandler } = useElementHandler();
    const { doubleClickHandler } = useDelete();
    const {
        dragStartHandler,
        dragOverHandler,
        dragLeaveHandlear,
        dragEndHandler
    } = useStartOverLeaveEnd();


    const elements: Tpallete = dataClone.map((board: TuseStartOverLeaveEnd) => {
        return <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e: any) => dropElementHandler(e, board)}
            onDragLeave={e => dragLeaveHandlear(e, board)}
            key={board.id}
            className="pallete__wrapp">
            {
                board.items.map((item: any) => {
                    switch (item.type) {
                        case 'input':
                            return <div
                                // onMouseDown={(e) => e.preventDefault()}
                                onDoubleClick={(e: any) => doubleClickHandler(e, board as any, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__display">
                                <span className="pallete__span"></span>
                                <input
                                    placeholder="0"
                                    type="tel"
                                    className="pallete__display-input" />
                            </div>;
                        case 'operations':
                            return <div
                                onDoubleClick={(e: any) => doubleClickHandler(e, board as any, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__operations">
                                <span className="pallete__span"></span>
                                <div
                                    className="pallete__operations-wrapp">
                                    {item.operations?.map(((item: any) =>
                                        <button
                                            key={item.titleOperations}
                                            className="pallete__operations-buttons">{item.titleOperations}</button>
                                    ))}
                                </div>
                            </div>
                        case 'dial':
                            return <div
                                onDoubleClick={(e: any) => doubleClickHandler(e, board as any, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__dial">
                                <span className="pallete__span"></span>
                                <div className="pallete__dial-wrapp">
                                    {item.numbers?.map((item: any) =>
                                        <button
                                            key={item.titleNumbers}
                                            className="pallete__dial-button">{item.titleNumbers}</button>
                                    )}
                                </div>
                            </div>
                        case 'equally':
                            return <div
                                onDoubleClick={(e: any) => doubleClickHandler(e, board as any, item)}
                                onDragOver={(e) => dragOverHandler(e, board)}
                                onDragLeave={e => dragLeaveHandlear(e, board)}
                                onDragStart={(e) => dragStartHandler(e, board, item)}
                                onDragEnd={(e) => dragEndHandler(e, board, item)}
                                onDrop={(e) => dropHandler(e, board, item)}
                                draggable={true}
                                key={item.id}
                                className="pallete__equally">
                                <span className="pallete__span"></span>
                                <div className="pallete__equally-wrapp">{item.titleEqually}</div>
                            </div>
                        default:
                            return null;
                    }
                }
                )}
        </div>

    });


    return (

        <section className="pallete">
            {elements}
        </section>
    )
}

export default Pallete

