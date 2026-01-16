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
import { formatToLocalDateTime } from "@/lib/dateUtils";
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
export default IncidentsList;
