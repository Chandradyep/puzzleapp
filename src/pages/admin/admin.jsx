import React, { useEffect, useState } from 'react'
import './admin.css'

function Admin() {

    const [data, setData] = useState()

    async function fetchData() {
        const res = await fetch("http://localhost:4000/users/getallusersscore")
        const data = await res.json()

        setData(data.payload.sort((a,b)=>{
            return a.total-b.total
        }))
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <table className='mx-auto mt-4 table w-75 border border-dark'>

            <thead className="thead">
                <tr>
                    <th className='p-2'>
                        username
                    </th>
                    <th className='p-2'>
                        Level I
                    </th>
                    <th className='p-2'>
                        Level II
                    </th>
                    <th className='p-2'>
                        Level III
                    </th>
                    <th className='p-2'>
                        Final level
                    </th>
                    <th className='p-2'>
                        Total
                    </th>
                </tr>
            </thead>

            {
                data?.map((e, i) =>
                    <tbody key={i}>
                        <tr>
                            <td>{e.email}</td>
                            <td>{e.first}</td>
                            <td>{e.second}</td>
                            <td>{e.third}</td>
                            <td>{e.fourth}</td>
                            <td>{e.total}</td>
                        </tr>
                    </tbody>
                )
            }
        </table>

    )
}
export default Admin