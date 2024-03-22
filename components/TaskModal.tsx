"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { ICategory, ITask } from "types/tasks";

type Props = {
  categories: ICategory[];
  task?: ITask;
  children?: React.ReactNode;
  btnStyle?: string;
  modalTitle: string;
};

const TaskModal = ({ categories, task, children, btnStyle, modalTitle }: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task?.title || "");
  const [description, setDescription] = useState<string>(
    task?.description || ""
  );
  const [category, setCategory] = useState<string>(task?.category?.name || "");
  const [CategoryFormOpen, toggleCategoryForm] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const axios = useAxiosAuth();

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");

    const newTask: ITask = {
      title,
      description,
    };
    if (category && category !== "Select a category ?")
      newTask.category = category;
    try {
      if (task) await axios.patch(`users/me/tasks/${task._id}`, newTask);
      else await axios.post("users/me/tasks", newTask);
      setTitle("");
      setDescription("");
      setCategory("");
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error(
        "error.response.data.message: ",
        error.response.data.message
      );
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className={btnStyle || "btn btn-primary w-full"}
      >
        {children}
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg text-center">{modalTitle}</h3>
          <div className="modal-scroll flex content-center items-center flex-col gap-4 ">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Task Title"
              className="input input-bordered w-full"
              required
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Task Description"
              className="input input-bordered w-full"
            />

            <div
              className={`flex w-full items-center py-2 ${
                CategoryFormOpen ? "flex-col" : ""
              }  gap-4`}
            >
              {CategoryFormOpen ? (
                <div className="flex flex-col gap-4 w-full">
                  <input
                    type="text"
                    placeholder="Category name"
                    className="input input-bordered w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              ) : (
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="select select-bordered w-full max-w-xs"
                  defaultValue={"Select a category ?"}
                >
                  <option>Select a category ?</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                className={`btn btn-outline w-fit  py-2 ${
                  CategoryFormOpen ? "h-fit min-h-0 " : "h-auto"
                }`}
                onClick={() => toggleCategoryForm((_) => !_)}
                type="button"
              >
                {" "}
                {CategoryFormOpen
                  ? "Select a  category instead ?"
                  : "new category ?"}{" "}
              </button>
            </div>

            <button type="submit" className="btn w-2/3">
              Submit
            </button>
            {error && (
              <p className="text-red-600 bg-red-100 bg-opacity-20 rounded-lg w-fit px-3 ">
                {error}
              </p>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaskModal;
