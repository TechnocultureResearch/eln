frappe.pages['lab-inventory'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Lab Inventory',
		single_column: true
	});
}