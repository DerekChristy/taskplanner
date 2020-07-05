export interface ITask {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  type: string;
  priority: string;
  status: string;
}
