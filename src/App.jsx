import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import Hero from './components/ui/custom/Hero'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* hero */}
      <Hero/>
    </>
  )
}

export default App
