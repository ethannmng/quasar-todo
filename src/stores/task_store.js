import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      {title: "Test", done: false}
    ],
  }),
  getters: {
    completedTasksCoun: (state) => {
      return state.tasks.filter(task => task.done).length
    }
  },
  actions: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.unshift({
          title: this.newTask,
          done: false
        });
      }
      this.newTask = '';
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    toggleDone(index) {
      this.tasks[index].done = !this.tasks[index].done;
    }
  }
})