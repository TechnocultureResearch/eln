
export interface ChatMessage{
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
	/**	Role : Select	*/
	role: "user" | "assistant" | "system" | "tester"
	/**	Content : Long Text	*/
	content?: string
}