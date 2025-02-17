import { useState } from 'react'


function setToMonday( date: Date ) {
  const newDate = new Date(date)
  var day = newDate.getDay() || 7;  
  if( day !== 1 ) 
      newDate.setHours(-24 * (day - 1)); 
  return newDate;
  }

interface DayProps {
  date: number;
  eventType: 'Available' | 'Booked' | 'Changeover Start' | 'Changeover End';
}

function Day({ date, eventType }: DayProps) {

  switch (eventType) {
    case 'Available':
      return (
        <td className='text-center'>
          <button className='bg-green-500 text-white p-2 w-full'>
            {date}
          </button>
        </td>
      )
    case 'Booked':
      return (
        <td className='text-center'>
          <button className='bg-red-500 text-white p-2 w-full'>
            {date}
          </button>
        </td>
      )
    
    case 'Changeover Start':
      return (
        <td className='text-center'>
          <button className='bg-yellow-500 text-white p-2 w-full'>
            {date}
          </button>
        </td>
      )
    
    case 'Changeover End':
      return (
        <td className='text-center'>
          <button className='bg-yellow-500 text-white p-2 w-full'>
            {date}
          </button>
        </td>
      )

    default:
      return (
        <td className='text-center'>
          <button className='bg-blue-500 text-white p-2 w-full'>
            {date}
          </button>
        </td>
      )
    }
}

interface WeekProps {
  weekStart: Date;
  monthNum: number;
}

function Week({ weekStart, monthNum }: WeekProps) {
  const weekCounter = new Date(weekStart)
  console.log("Start new week" + weekStart)

  const days = []
  for (let i = 0; i < 7; i++) {
    if (weekCounter.getMonth() === monthNum) {
      days.push(<Day eventType='Available' date={weekCounter.getDate()}/>)
    } else {
      days.push(<td />) //push empty cell if not in the month
    }

    weekCounter.setDate(weekCounter.getDate() + 1)
  }

  return(
      <tr>
        {days}
      </tr>
  )
}


interface MonthProps {
  monthNum: number;
}

function Month({ monthNum }: MonthProps) {

  const firstDayOfMonth = new Date(2025, monthNum, 1)
  const calendarWeekStart = setToMonday(firstDayOfMonth)


  let weeks = []
  for (let i = 1; i < 7; i++) {
    weeks.push(<Week weekStart={new Date(calendarWeekStart)} monthNum={monthNum}/>)
    calendarWeekStart.setDate(calendarWeekStart.getDate() + 7)
  }
  return (
    <table className='w-full border-separate  border-spacing-2'>
      <tr>
        <th>M</th>
        <th>T</th>
        <th>W</th>
        <th>T</th>
        <th>F</th>
        <th>S</th>
        <th>S</th>
      </tr>
      {weeks}
    </table>
  )
}

const ArrowLeft = <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" width={40} height={40}  strokeWidth={2}> <path d="M11 17h6l-4 -5l4 -5h-6l-4 5z"></path> </svg>
const ArrowRight = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round"  width={40} height={40}  strokeWidth={2}> <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path> </svg>

function App() {
  const [month, setMonth] = useState(new Date().getMonth())

  function nextMonth() {
    setMonth(month + 1)
  }

  function prevMonth() {
    setMonth(month - 1)
  }

  return (
    <>
        <div className=''>
          <div className='flex justify-around w-full'>
            <button onClick={nextMonth}>{ArrowLeft}</button>
            <h1 className='text-center text-3xl'>January 2025</h1>
            <button onClick={prevMonth}>{ArrowRight}</button>
          </div>
          <Month monthNum={month}/>
        </div>
    </>
  )
}

export default App
