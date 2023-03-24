import Hug from '../hug/Hug';
import Pallete from '../palette/Pallete';

import './app.scss'

const App = () => {
    return (
        <main className='app'>
            <div className="container">
                <section
                    className="main">
                    <Hug />
                    <Pallete />
                </section>

            </div>
        </main>
    )
}

export default App;