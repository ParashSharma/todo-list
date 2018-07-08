import Parse from 'parse';

export class TodoList extends Parse.Object {

  constructor() {
    super('List');
  }

  get name() {
    return this.get('name');
  }

  set name(value) {
    this.set('name', value);
  }
}

/*
  Generated class for the TodoListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class TodoListProvider {

  addList(name:string) {
    const list = new TodoList();
    list.name = name;
    return list.save();
  }

  fetchLists() {
    const query = new Parse.Query<TodoList>('List');
    return query.find();
  }

}
