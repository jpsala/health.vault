<%*
  let title = tp.file.title
  if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Title");
    const { text } = await tp.user.cleanText(tp, title)
    await tp.file.move("Notes/" + text);
  }
%><% tp.file.cursor() %>








- - - 
Tags:: <% `#` %>active, <% '#' %>type/note
creation-date:: <% tp.date.now("YYYY-MM-DD ddd HH:mm:ss") %>


