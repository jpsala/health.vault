<%*
  let title = tp.file.title
  if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Title");
    await tp.file.move("Notes/" + title);
  }
%><% tp.file.cursor() %>




---
Metadata

- - - 
Tags:: <% `#` %>doc
creation-date:: <% tp.date.now("YYYY-MM-DD ddd HH:mm:ss") %>


