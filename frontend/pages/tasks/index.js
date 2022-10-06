import React, { useState, useEffect } from "react";
import { TasksAPI } from "../../services/tasksApi";
import { Alert } from "react-bootstrap";
import { Task } from "../../components/Task";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    TasksAPI.find()
      .then((result) => {
        if (result.error) {
          setError(result.error.message);
        } else {
          setTasks(result.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="mb-4">
        <h1>All Tasks</h1>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <Alert>{error}</Alert>}
      {!isLoading && !error && tasks && (
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-6 mb-3">
              <Task task={task} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
