/*<%*
//*/
  const title = (await tp.system.prompt("Title")).toUpperCase();
  //const title = tp.date.now("YYMMDD.HHmm") + ".study";
  const folder = '';
  const ea = ExcalidrawAutomate;
  ea.reset();
  const ff = await ea.create({
    filename : title,
    foldername : folder,
    templatePath: 'Excalidraw/Template.excalidraw',
    onNewPane : false
  });
  console.clear()
  console.log('ff', ff)
	const f = this.app.vault.getAbstractFileByPath(tp.file.path(true));
  console.log('f', f)
  console.log('deleted', deleted);
	setTimeout(async ()=>{
	  console.log('folder+"/"+title', folder+"/"+title)
	  // const path =  folder ? folder+"/"+title 
	  await this.app.workspace.activeLeaf.openFile();
    const deleted = await this.app.vault.trash(f, false)
  }, 200)
  
//%>
