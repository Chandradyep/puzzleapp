import axios from 'axios'
import React, { useEffect } from 'react'

function Win() {
    let result = (18 - ((+localStorage.getItem(1)) + (+localStorage.getItem(2)) + (+localStorage.getItem(3)) + (+localStorage.getItem(4))))
    let userObj = {
        email: localStorage.getItem("username"),
        first: (5-(+localStorage.getItem(1))),
        second: (5-(+localStorage.getItem(2))),
        third: (5-(+localStorage.getItem(3))),
        fourth: (3-(+localStorage.getItem(4))),
        total: result
    }

    useEffect(()=>{
        axios.post('/users/updatearray', userObj)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <h1>Congratulations, you won!</h1>
            <p>You're a winner!</p>
        </div>
    )
}

export default Win