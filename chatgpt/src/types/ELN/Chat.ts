import { ChatMessage } from './ChatMessage'

export interface Chat{
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
	/**	Objective : Link - Objective	*/
	objective?: string
	/**	Project : Link - Development	*/
	project?: string
	/**	Title : Small Text	*/
	title?: string
	/**	log : Table - Chat Message	*/
	log?: ChatMessage[]
}