import { ExperimentRow } from './ExperimentRow'
import { DocumentRow } from './DocumentRow'
import { PaperRow } from './PaperRow'

export interface Development{
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
	project_name: string
	/**	Objective : Link - Objective	*/
	objective: string
	/**	PI : Link - User	*/
	pi: string
	/**	Start Date : Date	*/
	start_date: string
	/**	End Date : Date	*/
	end_date?: string
	/**	Description : Text Editor	*/
	description?: string
	/**	Experiments : Table - Experiment Row	*/
	experiments?: ExperimentRow[]
	/**	Literature Review : Table - Document Row	*/
	docs?: DocumentRow[]
	/**	Key Papers : Table - Paper Row	*/
	papers?: PaperRow[]
	/**	Amended From : Link - Development	*/
	amended_from?: string
}