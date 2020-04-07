import React, {Suspense} from 'react';
import Routes from "./Routes";

function App() {
    return <Suspense fallback={<div className="spinner-grow"></div>}>
        <Routes/>
    </Suspense>;
}

export default App;
