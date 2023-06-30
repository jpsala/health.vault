const dataPath = 'react-components/data.json';

const [count, setCount] = useStoredState(["count",0])
const [data, setData] = useStoredState(["data",null])
const dv = app.plugins.plugins.dataview.api
const notes = dv.pages('#active and -"templates" and -#type/ticket').sort(page => page.file.mtime, "desc")
const style = `
  .table {
    border-collapse: collapse;
      font-family: Tahoma, Geneva, sans-serif;
  }
  .table td {
    padding: 5px;
  }
  .table thead td {
    background-color: #54585d;
    color: black;
    font-weight: bold;
    font-size: 13px;
    border: 1px solid #54585d;
  }
  .table tbody td {
    color: gray;
    border: 1px solid #dddfe1;
  }
  .table tbody tr {
    background-color: #f9fafb;
  }
  .table tbody tr:nth-child(odd) {
    background-color: #ffffff;
  }
`
useEffect(async ()=>{
	if(!dataPath) {
		new obsidian.Notice("useStoredState requires the data-path property to be set for the note.");
		return null;
	}
	try {
		const newVal = await app.vault.readJson(dataPath)
		if(data!=newVal && newVal!==null) {
			setData(newVal);
		}
	} catch(e){
    console.log('e', e)
  }
	
}, []);

return (
  <div>
  <p>You clicked me {count} times!</p>
  <button  onClick={() => setCount(count + 1)}>
    {props.source}
  </button>hello
  <style>{style}</style>
  <table className='table'>
    <thead>
      <tr>
        <th>Unos</th>
        <th>Dos</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Uno</td>
        <td>Dos</td>
      </tr>
      <tr>
        <td>Uno</td>
        <td>Dos</td>
      </tr>
      <tr>
        <td>Uno</td>
        <td>Dos</td>
      </tr>
      <tr>
        <td>Uno</td>
        <td>Dos</td>
      </tr>
      <tr>
        <td>Uno</td>
        <td>Dos</td>
      </tr>
    </tbody>
  </table>
</div>
)

