import { useFrappeGetDoc } from "frappe-react-sdk";
import { ELNSettings } from "./types/ELN/ELNSettings";

export const APIKEY = () => {
  const { data, error, isValidating } = useFrappeGetDoc<ELNSettings>(
    'eln_settings',
    'ELN Settings',
    {
      /** SWR Configuration Options - Optional **/
    }
  );

  if (isValidating)
  {
    return <>Loading</>;
  }
  if (error)
  {
    return (<div className="text-white">{ JSON.stringify(error) }</div>);
  }
  if (data)
  {
    if (data.openai_api_key !== undefined)
    {
      return (<p className="text-white">{ data.openai_api_key }</p>);
    }
  }
  return null;
};