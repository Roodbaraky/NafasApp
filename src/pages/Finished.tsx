import { useContext } from 'react'
import { BreathHolds } from '../contexts/breathHolds'

export default function Finished() {
  const {breathHolds} = useContext(BreathHolds)

  return (
    <section className='flex flex-col mt-20'>
        <div>Finished</div>
        <div>{breathHolds?.map((result, index)=><div key={index+result}>Hold {index+1}: {result}</div>)}</div>
    </section>
  )
}
