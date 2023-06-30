const ctx = useContext(ReactComponentContext);
var ppctx = ctx.markdownPostProcessorContext;
const [propertyName, defaultValue] = props;
const dataPath = 'react-components/data.json';
const propertyDataPath = `${dataPath}/${propertyName}.json`
const [val, setVal] = useState(defaultValue);
const [timeoutId, setTimeoutId] = useState(-1);

useEffect(async ()=>{
	try {
		const newVal = await app.vault.readJson(propertyDataPath);
		if(val!=newVal && newVal!==null) {
			setVal(newVal);
		}
    console.log('detalle', newVal);
	} catch(e){
    console.log('error', e);
  }
	
}, []);

const setStoredValue = async val => {
	if(!dataPath) {
		new obsidian.Notice("useStoredState requires the data-path property to be set for the note.");
		return null;
	}
	try {
		await app.vault.createFolder(dataPath);
	} catch(e){}
	setVal(val);
	setTimeoutId(timeoutId=>{
	    clearTimeout(timeoutId);
            return setTimeout(()=>{
		app.vault.writeJson(propertyDataPath, val);
	    },2000);
        });
}
return [val, setStoredValue];
