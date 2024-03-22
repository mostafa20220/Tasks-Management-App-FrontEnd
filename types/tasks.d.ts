export interface ITask {
  _id?: string;
  title: string;
  description?: string;
  category?: ICategory;
  completed?: boolean;
}

export interface ICategory {
  _id?: string;
  name: string;
  description?: string;
}
