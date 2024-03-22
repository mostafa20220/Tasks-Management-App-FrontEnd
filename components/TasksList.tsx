// "use client";

import { ITask } from "types/tasks";
import Task from "./Task";
import { useEffect, useState } from "react";
import axios from "lib/axios";

interface Props {
  tasks: ITask[];
}

export default function TasksList({tasks}:Props ) {
  // const [tasks, setTasks] = useState<ITask[]>(tasks);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead className="">
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
