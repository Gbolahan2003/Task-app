import { useEffect, useMemo, useState } from "react";
import { CloseIcon } from "../../assets/svg";
import { RIPPLE_DELAY, TaskFormMode, TodoActionState } from "../../constants";
import CustomIconButton from "../IconButton";
import { TextArea, DateInput, TimeInput } from "../CustomInputs";
import ReminderTile from "./RemiderTile";
import CustomButton from "../Button";
import { useForm } from "../../hooks/useForm";
import { FormInput, Todo } from "../../react-app-env";
import { taskDate, taskEnd, taskStart, taskTitle, taskDescription } from "../../validators";
import Alert from "../Alert";
import { getDateString, logger } from "../../utils";
import CustomInput from "../CustomInputs/CustomInput";
import { useAppDispatch } from "../../hooks/store";
import { createToDoFeature, getToDosFeature, updtateToDoFeature } from "../../redux-store/features/todo/feature";
import { batch } from "react-redux";
import { formatDateForDatePicker } from "../../utils/date";

interface Props {
  dateSelected?: string;
  selectedTodo?: Todo | null;
  close: VoidFunction;
  taskFormMode: TaskFormMode;
  createTodo?: (data: FormInput) => void;
  editTodo?: (id:string, data: Todo) => void;
  handleClose?: VoidFunction;
}


export default function TaskForm(props: Props) {
  useEffect(() => logger('render TaskForm'), []);

  const { selectedTodo } = props;
  const selectedDate = selectedTodo?.createdAt

  const date = formatDateForDatePicker(selectedDate)

  
  

  const DescriptionHeader = useMemo(() => {
    switch (props.taskFormMode) {
      case TaskFormMode.ADD:
        return "Add Task";
      case TaskFormMode.EDIT:
        return "Edit Task";
      default:
        return "";
    }
  }, [props.taskFormMode]);

  

  
const defaultTaskFormState: FormInput = {
  description: ""|| selectedTodo?.description,
  title: "" ||selectedTodo?.title,
  date: "" ||date ,
  start: "" ||selectedTodo?.start,
  end: ""||selectedTodo?.end
};
  const taskForm = useForm<FormInput>({
    initialState: defaultTaskFormState,
    validators: { description: taskDescription, title: taskTitle, start: taskStart, end: taskEnd, date: taskDate }
  });

  const [error, setError] = useState("");

  const closeForm = () =>
    props.handleClose ? props.handleClose() : props.close();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setError(""); // clear existing error

    const error = taskForm.validate();
    if (error) return setError(error);

    const data: FormInput = {
      date: taskForm.date,
      start: taskForm.start,
      end: taskForm.end,
      description: taskForm.description,
      title: taskForm.title,
      status:'Pending' || selectedTodo?.status
    };



    const create = () => props.createTodo && props.createTodo(data);

    const update = () => props.editTodo && selectedTodo && props.editTodo(selectedTodo._id, data);
    
    await new Promise<void>((res) => {
      setTimeout(() => {
          props.taskFormMode === TaskFormMode.ADD ? create() : update();
          res();
      }, RIPPLE_DELAY);
  });
  };

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
    taskForm.onChange(e.target.name as keyof FormInput, e.target.value);
  };

  useEffect(() => {
    if (props.dateSelected && props.taskFormMode === TaskFormMode.ADD) {
      taskForm.onChange('date', props.dateSelected);
    }
  }, [props.dateSelected, props.taskFormMode, taskForm.onChange]);

  useEffect(() => setError(""), [taskForm.date, taskForm.end, taskForm.description, taskForm.start]);

  useEffect(() => {
    if (selectedTodo?.id && props.taskFormMode === TaskFormMode.EDIT) {
      taskForm.onChange("description", selectedTodo.description);
      taskForm.onChange("title", selectedTodo.title);
      taskForm.onChange("start", selectedTodo.start);
      taskForm.onChange("end", selectedTodo.end);
      taskForm.onChange("date", selectedTodo.date);
    }
  }, [selectedTodo, taskForm.onChange, props.taskFormMode]);

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__header d-flex flex-row justify-content-between align-items-center mb-2">
        <h3>{DescriptionHeader}</h3>
        <CustomIconButton onClick={closeForm}>
          <CloseIcon />
        </CustomIconButton>
      </div>
      <div className="mb-3">
        <CustomInput<FormInput>
          inputName="title"
          placeholder="Title"
          autoFocus
          value={taskForm.title}
          onChange={handleChange}
        />
      </div>
      <TextArea<FormInput>
        inputName="description"
        placeholder="Description"
        value={taskForm.description}
        onChange={handleChange}
      />
      <div className="mt-4 d-flex flex-row justify-content-start align-items-start date-time-inputs">
        <DateInput<FormInput>
          onChange={handleChange}
          value={taskForm.date}
          inputName="date"
        />
        <TimeInput<FormInput>
          inputName="start"
          value={taskForm.start}
          onChange={handleChange}
        />
        <TimeInput<FormInput>
          inputName="end"
          value={taskForm.end}
          onChange={handleChange}
        />
      </div>
      <div className="reminder-container mt-4">
        <ReminderTile />
      </div>
      <Alert variant="error" message={error} />
      <div className="actions d-flex flex-row flex-wrap mt-5">
        <CustomButton
          title="Cancel"
          type="button"
          variant="secondary"
          onClick={closeForm}
        />
        <CustomButton
          title={props.taskFormMode === TaskFormMode.ADD ? "Add" : "Save"}
        />
      </div>
    </form>
  );
}
