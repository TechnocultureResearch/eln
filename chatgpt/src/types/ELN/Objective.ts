import { ObjectiveItem } from './ObjectiveItem'

export interface Objective{
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
	/**	Title : Small Text	*/
	title: string
	/**	Objectives : Table - Objective Item	*/
	objectives: ObjectiveItem[]
	/**	Description : Long Text	*/
	description?: string
	/**	Amended From : Link - Objective	*/
	amended_from?: string
}