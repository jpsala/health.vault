async function addComment (app, tp, tR) {
  let selection = window.getSelection().toString()
  let fileName = tp.file.title

  if(!selection) {
    selection = await tp.system.prompt("Comment Name?")
  }

  let fullFileName = `Tickets/Comments/comment-${fileName}-${selection}`
  tR += `[[${fullFileName}|${selection}]]` 

  setTimeout(async ()=>{
    await app.vault.create(fullFileName + ".md", `## ${fileName}-${selection}`)
    const newFile = app.vault.getAbstractFileByPath(fullFileName + ".md")  
    app.workspace.activeLeaf.openFile(newFile)
    tR += `# Comment on ${fileName}-${selection}`
  }, 0)

}

module.exports = addComment;