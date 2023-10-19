export interface ItemsUIProps {
  title: string;
  subtitle?: string;
}

export interface AutoCompleteUIProps {
  title: string;
  placeholder?:string;
  iconLeft?: string;
  iconRight?: string;
  helpText?: string;
  items: ItemsUIProps[];
  change?: Function;
}
