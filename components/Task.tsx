"use client";

import { ICategory, ITask } from "types/tasks";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import TaskModal from "./TaskModal";

interface TaskProps {
  task: ITask;
  categories: ICategory[];
}

const Task: React.FC<TaskProps> = ({ task, categories }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(task.completed || false);

  const router = useRouter();
  const axios = useAxiosAuth();

  const handleDeleteTask = async (id: string) => {
    await axios.delete(`users/me/tasks/${id}`);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr
      key={task._id}
      className={`${checked ? "line-through bg-gray-700 text-gray-500" : ""}  `}
    >
      <td className="w-fit text-center ">
        <input
          type="checkbox"
          className="checkbox "
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            axios.patch(`users/me/tasks/${task._id}`, {
              completed: !checked,
            });
            router.refresh();
          }}
        />
      </td>
      <td className="w-1/6 ">{task.title}</td>
      <td className="w-4/6 ">{task.description}</td>
      <td className="w-1/6 ">{task.category?.name || "-"}</td>
      <td className="w-fit justify-center flex gap-5">
        <span>
          {!checked && (
            <TaskModal
              modalTitle="Edit task"
              categories={categories}
              task={task}
              btnStyle=" "
            >
              <FiEdit
                onClick={() => setOpenModalEdit(true)}
                cursor="pointer"
                className="text-blue-500"
                size={25}
              />
            </TaskModal>
          )}
        </span>
        <span>
          <FiTrash2
            onClick={() => setOpenModalDeleted(true)}
            cursor="pointer"
            className="text-red-500"
            size={25}
          />
          <Modal
            modalOpen={openModalDeleted}
            setModalOpen={setOpenModalDeleted}
          >
            <h3 className="text-lg">
              Are you sure, you want to delete this task?
            </h3>
            <div className="modal-action">
              <button
                onClick={() => handleDeleteTask(task._id!)}
                className="btn"
              >
                Yes
              </button>
            </div>
          </Modal>
        </span>
      </td>
    </tr>
  );
};

export default Task;
