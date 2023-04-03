interface Ibutton {
    numbers: number
}


const Button = ({ numbers }: Ibutton) => {


    return (
        <section className="buttons">{numbers}</section>
    )
}

export default Button