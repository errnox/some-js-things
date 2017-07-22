var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello, world!',

    newUser: {firstName: 'John', lastName: 'Doe', age: 30},
    users: [
      {firstName: 'John', lastName: 'Graham', age: 32},
      {firstName: 'Pete', lastName: 'Smith', age: 27},
      {firstName: 'Ann', lastName: 'Peters', age: 34},
      {firstName: 'Sarah', lastName: 'Adams', age: 29},
      {firstName: 'Lynn', lastName: 'Johnson', age: 35},
    ],
  },
  computed: {
    numUsers: function() {
      return this.users.length;
    }
  },
  methods: {
    addUser: function() {
      this.users.push(
        {firstName: this.newUser.firstName,
         lastName: this.newUser.lastName, age: this.newUser.age});
    },
    popUser: function() {
      this.users.pop();
    },
  }
});
