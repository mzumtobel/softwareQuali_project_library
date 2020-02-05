export interface ISomeThing {
  id?: number;
}

export class SomeThing implements ISomeThing {
  constructor(public id?: number) {}
}
