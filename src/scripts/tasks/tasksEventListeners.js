//event listeners and click events - Cooper Nichols

import renderTasks from "./tasksRender.js"
import tasksAPI from "./tasksApi.js"
import updateFormFields from "./tasksUpdateFormFields.js"

const taskSave = document.getElementById("tasks_save_button")
const taskCancel = document.getElementById("tasks_cancel_button")

const taskDescription = document.getElementById("task_description")
const taskDate = document.getElementById("task_completion_date")
const newTaskButton = document.getElementById("openTaskForm")

const createNewTaskFactory = (name, date) => {
    return {
        "userId": 1,
        "name": name,
        "completionDate": date,
        "isComplete": false
    }
}

const taskEvents = {
    renderAllTasks() {
        tasksAPI.getTaskEntries()
            .then(parsedTasks => {
                renderTasks(parsedTasks)
            })
    },
    addNewTask() {
        newTaskButton.addEventListener("click", () => {
            const formToggle = document.querySelectorAll(".tasks_visToggle")
            const formToggleArray = Array.from(formToggle)

            formToggleArray.forEach(item => item.classList.toggle("tasks_hidden"))
        })
    },
    cancelNewTask() {
        taskCancel.addEventListener("click", () => {
            const formToggle = document.querySelectorAll(".tasks_visToggle")
            const formToggleArray = Array.from(formToggle)
            taskDescription.value = ""
            taskDate.value = ""
            formToggleArray.forEach(item => item.classList.toggle("tasks_hidden"))
        })
    },
    createTask() {
        taskSave.addEventListener("click", event => {
            const hiddenId = document.querySelector("#tasks_hiddenInput")
            if (hiddenId.value !== "") {
                tasksAPI.editTaskEntry(hiddenId.value)
            }
             else if (hiddenId.value === "" && taskDescription.value !== "" && taskDate.value !== "") {
                const createNewTask = createNewTaskFactory(taskDescription.value, taskDate.value)
                tasksAPI.saveTaskEntry(createNewTask)
                    .then(() => {
                        tasksAPI.getTaskEntries()
                            .then(renderTasks)
                    })
                taskDate.value = ""
                taskDescription.value = ""

                const formToggle = document.querySelectorAll(".tasks_visToggle")
                const formToggleArray = Array.from(formToggle)

                formToggleArray.forEach(item => item.classList.toggle("tasks_hidden"))

            }
        })
    },
    completeTask() {
        const tasksContainer = document.querySelector("#tasks_container")

        tasksContainer.addEventListener("click", event => {
            if (event.target.id.startsWith("completeTask--")) {
                const checkBoxId = event.target.id.split("--")[1]

                tasksAPI.completeTaskEntry(checkBoxId)
                    .then(tasksAPI.getTaskEntries)
                    .then(renderTasks)
            }
        })
    },
    editTask() {
        const tasksContainer = document.querySelector("#tasks_container")
        tasksContainer.addEventListener("click", event => {
            if (event.target.id.startsWith("editTask--")) {
                const entryIdToEdit = event.target.id.split("--")[1]
                const formToggle = document.querySelectorAll(".tasks_visToggle")
                const formToggleArray = Array.from(formToggle)

                formToggleArray.forEach(item => item.classList.toggle("tasks_hidden"))
                updateFormFields(entryIdToEdit)
            }
        })
    }

}

export default taskEvents


