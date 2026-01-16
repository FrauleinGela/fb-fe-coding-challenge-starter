import { useUsersLookup } from "@/common/hooks/user/useUsersLookup";
import { Incident } from "@/common/models/incident";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/common/ui/shadcn/ui/table";
import { Button } from "@/common/ui/shadcn/ui/button";
import { formatToLocalDateTime } from "@/lib/dateUtils";
import { Link } from "react-router";
const IncidentsList = ({ incidents }: { incidents: Incident[] }) => {
  const { getUserById } = useUsersLookup();

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Created date</TableHead>
              <TableHead className="sr-only">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell className="text-left">{incident.title}</TableCell>
                <TableCell className="text-left">{incident.status}</TableCell>
                <TableCell className="text-left">{incident.severity}</TableCell>
                <TableCell className="text-left">
                  {incident.assigneeId
                    ? getUserById(incident.assigneeId)?.name
                    : "Unassigned"}
                </TableCell>
                <TableCell className="text-left">
                  {formatToLocalDateTime(incident.createdAt)}
                </TableCell>
                <TableCell className="text-left">
                  <Button variant="link" asChild>
                    <Link 
                      to={`/incidents/${incident.id}`}
                      aria-label={`View details for ${incident.title}`}
                    >
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default IncidentsList;
