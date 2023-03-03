// Copyright (c) 2023, Technoculture Research and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Chat", {
//   refresh(frm) {
//     // Add a custom button to the form
//     frm.add_custom_button("Ask GPT3", function () {
//       // When button is clicked, call a rest api for gpt3
//       frappe.call({
//         method: "eln.eln.doctype.chat.chat.ask_gpt3",
//         args: {
//           question: frm.doc.question,
//         },
//         callback: function (r) {
//           // Set the answer field to the response
//           frm.set_value("answer", r.message);
//         });
//     });
//   },
// });
