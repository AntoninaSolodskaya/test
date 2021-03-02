import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
const data = {
  arr1: [{ALL: 650}, {LEFT: 5}, {RIGHT: 2}],
  arr2: [{ALL: 650}, {LEFT2: 51}, {RIGHT2: 25}],
  arr3: [{ALL: 650}, {LEFT3: 1}, {RIGHT3: 24}],
}
function App() {
  const [filters, setFilters] = useState(data)
  const [newFilters, setNewFilters] = useState([])
  const [checkedItems, setCheckedItems] = useState({ALL: true})
  const [params, setParams] = useState([])
  console.log(checkedItems)
  function hanleChange(e, filter, section) {
    const par = `${section}=${Object.keys(filter)}`
    setCheckedItems({...checkedItems, [e.target.name]: e.target.checked})
    setParams([...params, par])

    if (e.target.checked !== true) {
      const ind = params.filter((item, i) => item !== par)
      setParams(ind)
    }
  }
  let arr = []
  function setData() {
    Object.keys(filters).map((key, index) => {
      const newData = {
        section: Object.keys(filters)[index],
        filters: filters[key],
      }
      return arr.push(newData)
    })
  }

  useEffect(() => {
    setData()
    setNewFilters(arr)
  }, [])

  return (
    <div>
      {newFilters.map((item, index) => {
        const {filters, section} = item
        return (
          <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{margin: '10px 5px'}}>{section}</div>
            {filters.map((filter) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '50%',
                  }}
                >
                  <div>{Object.keys(filter)}</div>
                  <div>{Object.values(filter)}</div>
                  <input
                    name={Object.keys(filter)}
                    type="checkbox"
                    checked={checkedItems[item.name]}
                    onChange={(e) => hanleChange(e, filter, section)}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
