export enum TypePassenger {
    Adult = 'adult',
    Young = 'young',
    Child = 'child',
    Baby = 'baby',
    BabySeat = 'baby-seat',
  }
export interface DropdownPassengerUIProps {

    placeholder?:string;
    buttonTitle?:string;
    change?: Function;
}

export interface ItemPassengerProps{
    type: TypePassenger;
    title: string;
    subtitle: string;
    count: number;
}
