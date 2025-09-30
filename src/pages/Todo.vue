<template>
	<q-page class="bg-grey-3 column">
		<div class="row q-pa-sm bg-primary">
			<q-input 
				class="col" 
				@keyup.enter="taskStore.addTask" 
				square 
				filled 
				bg-color="white"
				v-model="taskStore.newTask"
				placeholder="Ajouter une tâche" 
				dense
			>
				<template v-slot:append>
					<q-btn @click="taskStore.addTask" round dense flat icon="add"/>
				</template>
			</q-input>
		</div>
		<q-list class="bg-white" separator bordered>
			<q-item 
				v-for="(task, index) in taskStore.tasks" 
				:key="task.title" 
				@click="taskStore.toggleTaskDone(index)"
				:class="{ 'done bg-blue-1': task.done }" 
				clickable 
				v-ripple
			>
				<q-item-section avatar>
					<q-checkbox v-model="task.done" class="no-pointer-events" color="primary" />
				</q-item-section>
				<q-item-section>
					<q-item-label>{{ task.title }}</q-item-label>
				</q-item-section>
				<q-item-section v-if="task.done" side>
					<q-btn flat round dense color="primary" icon="delete" @click.stop="deleteTask(index)" />
				</q-item-section>
			</q-item>
		</q-list>
		<div v-if="!taskStore.tasks.length" class="no-tasks absolute-center">
			<q-icon name="check_circle" size="100px" color="primary" />
			<div class="text-h5 text-primary text-center">
				Aucune tâche
			</div>
		</div>
	</q-page>
</template>

<script setup>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useTaskStore } from 'stores/task_store.js'

defineComponent({ name: 'TodoPage' })

// Accès à l'API Quasar
const $q = useQuasar()

// Initialiser le task_store
const taskStore = useTaskStore()

// Méthodes
function deleteTask(index) {
	$q.dialog({
		title: 'Confirmation',
		message: 'Voulez-vous vraiment supprimer cette tâche ?',
		cancel: true,
		persistent: true,
	}).onOk(() => {
		//tasks.value.splice(index, 1)
		taskStore.deleteTask(index)
		$q.notify('Tâche supprimée')
	})
}
</script>
<style lang="scss">
.done {
	.q-item__label {
		text-decoration: line-through;
		color: #bbb;
	}
}
.no-tasks {
	opacity: 0.5;
	
	/* Center icon */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center
}
</style>