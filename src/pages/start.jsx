import React from 'react'


const Navbar = () => {
    

    return (
        <div style={{minHeight: "90vh", display: 'flex', alignItems: "center"}}>
            <a href='/login' style={{width: "150px"}} className='btn btn-primary d-block mx-auto'>Get started</a>
        </div>
    );
}
export default Navbar;