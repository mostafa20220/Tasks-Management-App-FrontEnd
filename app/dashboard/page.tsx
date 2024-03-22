import { authOptions } from "app/api/auth/[...nextauth]/route";
import TaskModal from "components/TaskModal";
import Task from "components/Task";
import { useAxiosAuthServer } from "lib/useAxiosAuthServer";
import { ICategory, ITask } from "types/tasks";
import { AiOutlinePlus } from "react-icons/ai";

// make it dynamic
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const axios = await useAxiosAuthServer();

  const {
    data: { tasks },
  } = (await axios("/users/me/tasks")) as { data: { tasks: ITask[] } };

  const {
    data: { categories },
  } = (await axios("/users/me/categories")) as {
    data: { categories: ICategory[] };
  };

  // const tasks = data.tasks;
  // console.log("tasks:", tasks);

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 mx-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Tasks Dashboard</h1>
        <TaskModal modalTitle="Add new task" categories={categories}>
          Add a New Task <AiOutlinePlus className="ml-2" size={18} />
        </TaskModal>
      </div>
      <div className="overflow-x-auto">
        <table className="table ">
          <thead className="">
            <tr>
              <th>Finished</th>
              <th>Task</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              ?.sort((a, b) => {
                const categoryA = a.category?.name || "";
                const categoryB = b.category?.name || "";
                return categoryA.localeCompare(categoryB);
              })
              .sort((task) => (task.completed ? 1 : -1))
              .map((task) => (
                <Task key={task._id} task={task} categories={categories} />
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
