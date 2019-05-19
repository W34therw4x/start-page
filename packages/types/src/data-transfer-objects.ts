export interface INewsMessageObject {
  options: INewsMessageOptions;
  selectors: INewsMessageSelectors;
  url: string;
}

interface INewsMessageOptions {
  limit?: number;
  initialActions?: INewsMessageOptionsInitialAction[];
}

interface INewsMessageOptionsInitialAction {
  action: 'click' | 'remove';
  selector: string;
}
export interface INewsMessageSelectors {
  container: string;
  description: string;
  link: string;
  title: string;
}
