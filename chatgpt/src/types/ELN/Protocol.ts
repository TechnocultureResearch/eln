import { AuthorRow } from './AuthorRow'
import { StepRow } from './StepRow'
import { Reference } from './Reference'

export interface Protocol{
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
	/**	Authors : Table MultiSelect - Author Row	*/
	authors: AuthorRow[]
	/**	Duration : Duration	*/
	duration?: string
	/**	Objective : Link - Objective	*/
	objective?: string
	/**	Steps : Table - Step Row	*/
	steps?: StepRow[]
	/**	References : Table - Reference	*/
	references?: Reference[]
	/**	Amended From : Link - Protocol	*/
	amended_from?: string
	/**	Author Signature : Signature	*/
	sign_auth?: any
	/**	PI Signature : Signature	*/
	sign_pi?: any
}