// Copyright (c) 2023, Technoculture Research and contributors
// For license information, please see license.txt

frappe.ui.form.on("Chat", {
  refresh(frm) {
    frm.add_custom_button("Goto Chat", function () {
      // Go to the chat page
      // https://stackoverflow.com/questions/25203124/how-to-get-base-url-with-jquery-or-javascript
      window.location.href = `${window.location.origin}/chatgpt/${frm.doc.name}`;
    });
  },
});
