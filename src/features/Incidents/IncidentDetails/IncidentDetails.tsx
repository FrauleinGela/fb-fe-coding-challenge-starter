import { Button } from "@/common/ui/shadcn/ui/button";
import { Link, useParams } from "react-router";
import { useFetchIncident } from "./hooks/useFetchIncident";
import { formatToLocalDateTime } from "@/lib/dateUtils";
import { useUsersLookup } from "@/common/hooks/user/useUsersLookup";

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { incident, isLoading, error } = useFetchIncident(id!);
  const { getUserById } = useUsersLookup();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <nav className="mb-6 flex justify-start">
        <Button className="rounded-2xl cursor-pointer" variant="link" asChild>
          <Link to={`/`} aria-label="Back to Incidents Overview">
            ← Back to Incidents Overview
          </Link>
        </Button>
      </nav>
      <div className="flex flex-col justify-center">
        {isLoading && (
          <div role="status" aria-live="polite" className="py-8">
            <p className="text-gray">Loading incident details...</p>
          </div>
        )}

        {error && (
          <div role="alert" aria-live="assertive" className="py-4">
            <p className="text-destructive">
              Error loading incident details. Please try again.
            </p>
          </div>
        )}
      </div>

      {incident && (
        <article aria-labelledby="incident-title" className="space-y-4">
          <div className="flex flex-col justify-center">
            <h1 id="incident-title" className="text-2xl font-bold text-gray">
              {incident.title}
            </h1>
            {incident.description && (
              <p className="text-gray mt-2">{incident.description}</p>
            )}
          </div>

          <div className="border-t pt-6 space-y-4">
            <div>
              <strong className="text-sm font-semibold text-gray mb-1">
                Severity
              </strong>
              <p className="text-gray">{incident.severity}</p>
            </div>
            <div>
              <strong className="text-sm font-semibold text-gray mb-1">
                Status
              </strong>
              <p className="text-gray">{incident.status}</p>
            </div>
            <div>
              <strong className="text-sm font-semibold text-gray mb-1">
                Assignee
              </strong>
              <p className="text-gray">
                {incident.assigneeId
                  ? (getUserById(incident.assigneeId)?.name ?? "Unknown User")
                  : "Unassigned"}
              </p>
            </div>

            <div>
              <strong className="text-sm font-semibold text-gray mb-1">
                Created At
              </strong>
              <p className="text-gray">
                <span>{formatToLocalDateTime(incident.createdAt)}</span>
              </p>
            </div>

            <div>
              <strong className="text-sm font-semibold text-gray mb-1">
                Last Updated
              </strong>
              <p className="text-gray">
                <span>{formatToLocalDateTime(incident.updatedAt)}</span>
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <strong className="text-lg font-semibold text-gray mb-4">
              Status History
            </strong>
            <div className="space-y-3">
              {incident.statusHistory.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div className="flex gap-1">
                    <span className="font-medium">{entry.status}</span>
                    <span className="text-gray">by</span>
                    <span className="text-gray">
                      {getUserById(entry.changedBy)?.name ?? entry.changedBy}
                    </span>
                  </div>
                  <span className="text-gray shrink-0">
                    {formatToLocalDateTime(entry.changedAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};

export default IncidentDetail;
