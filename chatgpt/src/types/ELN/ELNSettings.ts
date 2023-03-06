
export interface ELNSettings{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Name : Data	*/
	lab_name: string
	/**	URL : Data	*/
	url?: string
	/**	Lab Lead : Link - User	*/
	lead?: string
	/**	OpenAI API Key : Password - Download all the data in the ELN in a csv form.	*/
	openai_api_key?: string
}