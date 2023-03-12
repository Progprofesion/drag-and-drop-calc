import { useState } from "react";
import './palette.scss';

const Pallete = (): JSX.Element => {

    const [boards, setBoards] = useState([
        {
            id: 1, items: [
                { id: 1, type: "input" },
                { id: 2, operations: [{ titleOperations: "/" }, { titleOperations: "x" }, { titleOperations: "-" }, { titleOperations: "+" }], type: "operations" },
                { id: 3, type: "dial", numbers: [{ titleNumbers: "7" }, { titleNumbers: "8" }, { titleNumbers: "9" }, { titleNumbers: "4" }, { titleNumbers: "5" }, { titleNumbers: "6" }, { titleNumbers: "1" }, { titleNumbers: "2" }, { titleNumbers: "3" }, { titleNumbers: "0" }, { titleNumbers: "," }] },
                { id: 4, type: "equally", titleEqually: "=" }]
        },

    ])

    const elements: React.ReactNode = boards.map((item) => {
        return item.items.map(item => {
            switch (item.type) {
                case 'input':
                    return <div key={item.id} className="pallete__display">
                        <input placeholder="0" type="text" className="pallete__display-input" />
                    </div>;
                case 'operations':
                    return <div key={item.id} className="pallete__operations">
                        <div className="pallete__operations-wrapp">
                            {item.operations?.map((item =>
                                <button
                                    key={item.titleOperations}
                                    className="pallete__operations-buttons">{item.titleOperations}</button>
                            ))}
                        </div>
                    </div>
                case 'dial':
                    return <div
                        key={item.id}
                        className="pallete__dial">
                        <div className="pallete__dial-wrapp">
                            {item.numbers?.map(item =>
                                <button
                                    key={item.titleNumbers}
                                    className="pallete__dial-button">{item.titleNumbers}</button>
                            )}
                        </div>
                    </div>
                case 'equally':
                    return <div key={item.id} className="pallete__equally">
                        <div className="pallete__equally-wrapp">{item.titleEqually}</div>
                    </div>
                default:
                    return null;
            }
        }
        )
    });


    return (
        <section className="pallet">
            {elements}
        </section>
    )

}

export default Pallete