import { useState } from 'react';
import { FrappeProvider } from 'frappe-react-sdk';
function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <FrappeProvider>
                <div className='p-4'>
                    <h1 className='text-blue-400'>
                        Welcome to ChatGPT
                    </h1>
                    <p>
                        Nothing here yet
                    </p>
                </div>
            </FrappeProvider>
        </div>
    );
}

export default App;
