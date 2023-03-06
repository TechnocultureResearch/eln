
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
	/**	Lab Name : Data	*/
	lab_name: string
	/**	URL : Data	*/
	url?: string
	/**	Lab Lead : Link - User	*/
	lead?: string
	/**	OpenAI API Key : Data	*/
	openai_api_key?: string
}