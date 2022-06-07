import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

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
    audio.play()


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
  }
  useEffect(() => {
    console.log(monthlyBill)
    // handleLocalStorage()
    // save to session storage
    // save to local storage
    sessionStorage.setItem('monthlyBill', JSON.stringify(monthlyBill))
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

  return (
    <div className='min-h-screen flex flex-col justify-between border-2 w-screen'>
      {/* center heading */}
      <div className='flex justify-center items-center billStatus'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold text-center'>
            Monthly Bill: {monthlyBill.amount}
          </h1>
        </div>
      </div>


      {/* Add water button */}
      <div className='recordButton' onClick={handleIncrement}>
        Record Bill
      </div>
    </div>
  )
}

export default Home
