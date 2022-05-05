import React from 'react';


function Jumbotron({children}) {
    return (
        <div 
        style={{ height: 700, clear: 'both', paddingTop: 260, textAlign: 'center'}}
        >
            {children}
        </div>
    );
}

export default Jumbotron;