
export interface ObjectiveItem{
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
	/**	Objective : Data	*/
	objective: string
	/**	Priority : Select	*/
	priority: "LOW" | "NORMAL" | "HIGH"
}