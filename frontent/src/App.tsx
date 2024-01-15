import { useState } from 'react'
import Select from './Select'

function App() {
  const [selected, setSelected] = useState<{ id: number, name: string }[]>([])

  return (
    <div>
      <Select value={selected} onChange={setSelected} apiUrl='localhost:3000.api/items' placeholder='placeholder' />
    </div>
  )
}

export default App
