import React, { useContext } from 'react'
import { BreathHolds } from '../contexts/breathHolds'

export default function Finished() {
  const {breathHolds, setBreathHolds} = useContext(BreathHolds)

  return (
    <section className='flex flex-col mt-20'>
        <div>Finished</div>
        <div>{breathHolds?.map((result, index)=><p>Hold {index+1}: {result}</p>)}</div>
    </section>
  )
}
