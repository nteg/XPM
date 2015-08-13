app.service('TodosService', function ($q, $http) {
    return {
        setTodos: function () {
                $http.get("http://localhost:63715/api/notification")
            .success(function (response) {
                window.localStorage['anns'] = angular.toJson(response)
                //localStorage.setItem("announcements", response);
                //$scope.menuItems = response; // localStorage.getItem("announcements");;
            });
        },
        todos: [
          {
              id: '101',
              name: 'Pick up apples',
              done: false
          },
          {
              id: '102',
              name: 'Mow the lawn',
              done: true
          }
        ],
        getTodos: function () {
            //console.log("localStorage.getItem : " + localStorage.getItem("announcements"));

            //$http.get("http://localhost:63715/api/notification")
            //.success(function (response) {
            //    window.localStorage['anns'] = angular.toJson(response)
            //    //localStorage.setItem("announcements", response);
            //    //$scope.menuItems = response; // localStorage.getItem("announcements");;
            //});

            var projectString = window.localStorage['anns'];
            if (projectString) {
                //angular.fromJson(projectString);
            }

            return this.todos
        },
        getTodo: function (todoId) {
            var dfd = $q.defer()
            this.todos.forEach(function (todo) {
                if (todo.id === todoId) dfd.resolve(todo)
            })

            return dfd.promise
        }

    }
})