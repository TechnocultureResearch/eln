import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { SystemPersona } from './types';


interface ToggleMenuProps {
  disabled: boolean;
  setPersona: React.Dispatch<React.SetStateAction<SystemPersona>>;
}

const ToggleMenu = ({ disabled, setPersona }: ToggleMenuProps) => {
  const toggleGroupItemClasses = 'hover:bg-gray-600 color-blue-200 data-[state=on]:bg-green-500 data-[state=on]:text-green-50 flex h-full bg-gray-800 text-base items-center justify-center leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-green-200 focus:outline-none px-2 disabled:opacity-80 disabled:cursor-not-allowed';

  return (
    <ToggleGroup.Root
      className="inline-flex h-6 bg-gray-700 text-gray-300 rounded w-fit"
      type="single"
      // defaultValue="scientist"
      disabled={ disabled }
      onValueChange={ (value) => { setPersona(value); } }
    >
      <ToggleGroup.Item className={ toggleGroupItemClasses } value="scientist">
        Scientist
      </ToggleGroup.Item>
      <ToggleGroup.Item className={ toggleGroupItemClasses } value="student">
        Student
      </ToggleGroup.Item>
      <ToggleGroup.Item className={ toggleGroupItemClasses } value="regulator">
        Regulator
      </ToggleGroup.Item>
      <ToggleGroup.Item className={ toggleGroupItemClasses } value="IPR">
        IPR
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};

export default ToggleMenu;