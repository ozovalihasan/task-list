/*
  eslint-disable no-underscore-dangle, import/no-cycle, no-alert,func-names
*/
import storage from "./localStorageModule";

import Project from "./Project";

import buildPage from "./buildPage";
import projects from "./projects";
import { projectExist } from "./projects";
import Task from "./Task";

const eventListeners = () => {
  const formProject = () => document.getElementById("new-project");
  const chooseProject = () => {
    console.log(projectExist());
    if (projectExist()) {
      document.getElementById("selected-project").addEventListener(
        "change",
        function () {
          storage.setSelectedProject(this.value);
          buildPage();
        },
        false
      );
    }
  };

  const addProjectButton = () => {
    document.getElementById("add-project").addEventListener("click", () => {
      formProject().style.display = "block";
    });
  };

  const submitProjectForm = () => {
    formProject().addEventListener("submit", (event) => {
      event.preventDefault();
      const title = formProject().elements.namedItem("title").value;
      if (title) {
        const allProjects = storage.getProjects();

        const project = new Project(title);
        allProjects.push(project);
        storage.setProjects(allProjects);
        storage.setSelectedProject(allProjects.length - 1);
        buildPage();
      } else {
        alert("Fill all informations correctly ");
      }
    });
  };

  const deleteProjectButton = () => {
    if (projectExist()) {
      document
        .getElementById("delete-project")
        .addEventListener("click", () => {
          const allProjects = storage.getProjects();
          const projectIndex = document.getElementById("selected-project")
            .value;
          allProjects.splice(projectIndex, 1);
          storage.setProjects(allProjects);
          storage.setSelectedProject(0);
          buildPage();
        });
    }
  };

  const formTask = () => document.getElementById("new-update-task");

  const addTaskToProject = (task, foundProject) => {
    const allprojects = storage.getProjects();
    allprojects[foundProject]._tasks.push(task);
    storage.setProjects(allprojects);
  };

  const addTaskButton = () => {
    if (projectExist()) {
      document.getElementById("add-task").addEventListener("click", () => {
        formTask().operation = "add";
        formTask().style.display = "block";
        formTask().reset();
        formTask().elements.namedItem("task-submit").innerText = "Add Task";
      });
    }
  };

  const updateTaskButton = () => {
    const editTaskButtons = document.getElementsByClassName("edit-task");

    for (let i = 0; i < editTaskButtons.length; i += 1) {
      editTaskButtons[i].onclick = () => {
        formTask().operation = i;
        formTask().style.display = "block";
        const project = projects()[storage.getSelectedProject()];
        const task = project._tasks[i];
        formTask().elements.namedItem("title").value = task._title;
        formTask().elements.namedItem("description").value = task._description;
        formTask().elements.namedItem("due-date").value = task._dueDate;
        formTask().elements.namedItem("priority").value = task._priority;
        formTask().elements.namedItem("status").value = task._status;
        formTask().elements.namedItem("note").value = task._note;
        formTask().elements.namedItem("task-submit").innerText = "Update Task";
      };
    }
  };

  const submitTaskForm = () => {
    if (projectExist()) {
      formTask().addEventListener("submit", (event) => {
        event.preventDefault();
        const title = formTask().elements.namedItem("title").value;
        const description = formTask().elements.namedItem("description").value;
        const dueDate = formTask().elements.namedItem("due-date").value;
        const priority = formTask().elements.namedItem("priority").value;
        const status = formTask().elements.namedItem("status").value;
        const note = formTask().elements.namedItem("note").value;
        const project = projects()[storage.getSelectedProject()];
        if (title && description && dueDate && priority && status && note) {
          const task = new Task(
            title,
            description,
            dueDate,
            priority,
            status,
            note
          );

          if (formTask().operation === "add") {
            addTaskToProject(task, storage.getSelectedProject());
          } else {
            project._tasks[formTask().operation] = task;
            const allProjects = projects();
            allProjects[storage.getSelectedProject()] = project;
            storage.setProjects(allProjects);
          }
          formTask().reset();
          formTask().style.display = "none";
          buildPage();
        } else {
          alert("Fill all informations correctly ");
        }
      });
    }
  };

  const deleteTaskButton = () => {
    const deleteTaskButtons = document.getElementsByClassName("delete-task");

    for (let i = 0; i < deleteTaskButtons.length; i += 1) {
      deleteTaskButtons[i].onclick = () => {
        const allProjects = storage.getProjects();
        allProjects[storage.getSelectedProject()]._tasks.splice(i, 1);
        storage.setProjects(allProjects);
        buildPage();
      };
    }
  };

  return {
    chooseProject,
    addProjectButton,
    submitProjectForm,
    deleteProjectButton,
    addTaskButton,
    updateTaskButton,
    submitTaskForm,
    deleteTaskButton,
  };
};

export default eventListeners();
