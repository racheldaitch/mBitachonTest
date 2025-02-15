import Header from "../Header/Header";

import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
             
            </header>

            <main>
                <Routing />
            </main>
            
            <footer>
               
            </footer>
        </div>
    );
}

export default Layout;
