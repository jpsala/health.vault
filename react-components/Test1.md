const [data, setData] = useStoredState(["react-components/data",'hola'])
const [input, setInput] = useState('')
const dv = app.plugins.plugins.dataview.api
const notes = dv.pages('#active and -"templates" and -#type/ticket').sort(page => page.file.mtime, "desc")
let int
useEffect(()=>{
  console.log('data', data)
  setData('Ehhhhhhh')
  int = setInterval(() => {
    const i = dv.pages('"Notes/react"')[0].var
    setInput(i)
  }, 500);
  return(()=>{
    clearInterval(int)
  })
}, [input])

return (
  <div>
    <h4>value={input??'No var "var", write var::...'}</h4>
    <table className='table'>
      {notes.map(n=>{
        return(
          <tr>
            <td>{n.file.path}</td>
          </tr>
        )
        
      })}
    </table>
  </div>
)

