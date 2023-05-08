import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import data from "../../data.json"
import './Final.css'
import { useNavigate } from 'react-router-dom';


function Final() {
    const navigate = useNavigate()
    const [idx, setIdx] = useState(0)
    const [ans, setAns] = useState("")
    const [tries, setTries] = useState(3)
    const [hints, setHints] = useState("")
    const [next, setNext] = useState(false)


    const [userValue, setUserValue] = useState("")
    const [userValues, setUserValues] = useState([])

    const [checkedValue, setCheckedValue] = useState([])

    const test = (e) => {
        e.preventDefault()
        if (tries && userValue.length == ans.length) {
            var checked = ""
            var cnt = 0
            for (var i = 0; i < userValue.length; i++) {
                if (userValue[i].toLowerCase() == ans[i]) {
                    checked += ans[i]
                    cnt+=1
                }
                else checked += "-"
            }
            if(cnt == ans.length) setNext(true)
            setCheckedValue([...checkedValue, checked])
            setUserValues([...userValues, userValue])
            setTries(tries - 1)
            setUserValue("")
        }
    }

    
    const btnNext = () => {
        localStorage.setItem(4, tries)
        navigate('/win')
    }
    useEffect(() => {
        setAns(data.answers[(+localStorage.getItem("index"))].name.toLowerCase())
        console.log(localStorage.getItem("index"))
        setHints("predict the character based on the predicted clues")
    }, [])

    return (
        <div>
            <p className="lead display-3 text-center">Final Level</p>
            <p className='text-end p-3 h1 fw-bolder'>You have {tries} tries</p>

            <h3 className='d-flex justify-content-center'>hint : {hints}</h3>
            <br />

            <form onSubmit={test}>
                <div className='d-flex justify-content-center'>
                    <OtpInput
                        value={userValue}
                        onChange={setUserValue}
                        numInputs={ans.length}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input class='text-center h2' {...props} />}
                    />
                </div>
                {/* <input className='mx-2' type="text" value={userValue} onChange={(e) => setUserValue(e.target.value)} /> */}
                <div>
                    <button className='d-block mx-auto btn btn-primary'>Test answer</button>
                </div>
            </form>
            <br />
            <div>
                {
                    (
                        () => {
                            const a = []

                            for (var i = 0; i < checkedValue.length; i++) {
                                a.push(
                                    <div key={i} className='d-flex justify-content-center'>
                                        {
                                            checkedValue[i].split("").map((e, i1) =>
                                                <div key={i1}>
                                                    <div className={`find-input text-center h2 text-white border border-dark ${e != "-" ? "bg-success" : "bg-dark"}`} >{e != "-" ? e : userValues[i][i1]}</div>
                                                </div>
                                            )
                                        }
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                )
                            }
                            return a;
                        }
                    )()
                }
            </div>
            {
                next &&
                <button className="btn btn-info d-block mx-auto" onClick={btnNext}>next</button>
            }

            {/* print */}

        </div>
    )
}

export default Final