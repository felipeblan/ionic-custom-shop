export interface MenuItemI {
  title: string;
  icon: string;
  path: string;
  children?: Array<any> | any;
}