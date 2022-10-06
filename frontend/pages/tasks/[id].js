import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TasksAPI } from "../../services/tasksApi";
import { Alert } from "react-bootstrap";
import { Task } from "../../components/Task";

export default function TaskPage() {
  const router = useRouter();
  const { id } = useMemo(() => router.query, [router.query]);

  const [task, setTask] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      TasksAPI.findOne({ id })
        .then((result) => {
          if (result.error) {
            setError(result.error.message);
          } else {
            setTask(result.data);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <>
      <div className="mb-4">
        <Link href="/tasks" passHref>
          All Tasks
        </Link>
        <h1>Task Details</h1>
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && error && <Alert>{error}</Alert>}
      {!isLoading && !error && task && (
        <div className="row">
          <div key={task.id} className="col-12 mb-3">
            <Task task={task} hideLink showId />
          </div>
        </div>
      )}
    </>
  );
}
