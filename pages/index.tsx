import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {MORSE_CODE_MAP, morseToVibration} from '../utils/vibration_pattern/main';
// set type for local storage
type paymentType = {
  amount: number,
  date: string,
}
type monthllyBill = {
  amount: number,
  total: paymentType[],
}
const Home: NextPage = () => {
  var today = new Date();

  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const [totalMount, setTotalMount] = useState(0)
  const [monthlyBill, setMonthlyBill] = useState<monthllyBill>({
    amount: 0,
    total: [],
  })
  // console.log(localStorage.getItem('monthlyBill'))

  // on click increament by 60
  const handleIncrement = () => {
    //  this function can run once in day
    // vibrate() onlickc
    navigator.vibrate(200);
    // ping sound
    const audio = new Audio('/sound/ping.mp3')


    localStorage.setItem('monthlyBill', JSON.stringify(0))
    setTotalMount(totalMount + 60)
    // push to payments
    console.log(totalMount)
    // increment monthly bill
    setMonthlyBill({
      amount: monthlyBill.amount + 60,
      total: [...monthlyBill.total, {
        amount: 60,
        date: time
      }]
    })
    // set local storage
    audio.play()
  }
  useEffect(() => {
    console.log(monthlyBill)
    sessionStorage.setItem('monthlyBill', JSON.stringify(monthlyBill))
    console.log(sessionStorage.getItem('monthlyBill'))
    // save to local storage

  }, [monthlyBill])

  // set to local storage
  const handleLocalStorage = () => {
    localStorage.setItem('monthlyBill', JSON.stringify(monthlyBill))
  }

  const printTotalPayment = () => {
    console.log(totalMount)
    console.log(monthlyBill)
    console.log(sessionStorage.getItem('monthlyBill'))
  }

  // clear everything
  const clearAll = () => {
    setTotalMount(0)
    setMonthlyBill({
      amount: 0,
      total: [],
    })
    // localStorage.clear()

  }
  const onChangeMakeVibration = (event: any) => {
      const word = event.target.value[event.target.value.length - 1];
      const vibrate = morseToVibration(MORSE_CODE_MAP[word]);
      navigator.vibrate(vibrate);
  }
  return (
    <div className='bg-black min-h-screen flex flex-col justify-between w-screen'>
      {/* center heading */}
      <div className='flex justify-center items-center billStatus'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold text-center'>
            Monthly Bill: {monthlyBill.amount}
          </h1>
        </div>
      </div>
      {/* timeline */}
      <section>
        <h1>
          Timeline
        </h1>
        <div className='p-5 showTimeline'>
          <input type="text" onChange={onChangeMakeVibration} style={{
            width: '100%',
            height: '50px',
            fontSize: '30px',
            padding: '10px',
            border: 'none',
            outline: 'none',
            color: 'black',
            backgroundColor: 'white',
            borderRadius: '10px',
            
          }} />
          {monthlyBill.total.sort().map((payment, index) => {
            return (
              <div key={index} className='flex  justify-between items-center timeLineItem'>
                <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-4xl font-bold text-center'>
                    {payment.amount}
                  </h1>
                </div>

                <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-4xl font-bold text-center'>
                    {payment.date}
                  </h1>
                </div>
              </div>
            )
          }
          )}

        </div>
      </section>


      {/* Add water button */}
      <div className='recordButton' onClick={handleIncrement}>
        Record Bill
      </div>
    </div>
  )
}

export default Home
