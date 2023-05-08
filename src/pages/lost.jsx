import React from 'react'
import { useNavigate } from 'react-router-dom'

function Lost() {
    const navigate = useNavigate()
    return (
        <div>
            <div>You Lost the game</div>
            <button className="btn btn-primary d-block mx-auto" onClick={()=>navigate('/start')}>restart the game</button>
        </div>
    )
}

export default Lost