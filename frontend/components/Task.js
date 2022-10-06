import Link from "next/link";

export const Task = ({ task, hideLink, showId }) => {
  return (
    <div className="border p-3 rounded h-100 bg-light">
      {showId && (
        <>
          <small className="text-muted">ID</small>
          <p>{task.id}</p>
        </>
      )}
      <small className="text-muted">Title</small>
      <p>{task.attributes.title}</p>
      <small className="text-muted">Description</small>
      <p>{task.attributes.description ?? "-"}</p>
      <small className="text-muted">Due On</small>
      <p>{task.attributes.dueDate}</p>
      <small className="text-muted">Assigned to</small>
      <p>
        {task.attributes.user.data.attributes.username}(
        {task.attributes.user.data.attributes.email})
      </p>
      {!hideLink && <Link href={`/tasks/${task.id}`}>View</Link>}
    </div>
  );
};
