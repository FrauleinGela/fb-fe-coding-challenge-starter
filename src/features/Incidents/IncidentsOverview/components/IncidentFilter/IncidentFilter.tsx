import { IncidentSeverity, IncidentStatus } from "@/api/types";
import { useFetchUsers } from "@/common/hooks/user/useFetchUsers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/shadcn/ui/select";
import { IncidentFilterBy } from "../../models/models";
import { Input } from "@/common/ui/shadcn/ui/input";
import { Label } from "@/common/ui/shadcn/ui/label";

interface IncidentFilterProps {
  filter: IncidentFilterBy;
  onFilterChange: (filters: IncidentFilterBy) => void;
}
const IncidentFilters = ({
  filter,
  onFilterChange,
}: IncidentFilterProps) => {
  const { users } = useFetchUsers();
  const statusOfIncidents: IncidentStatus[] = [
    "Open",
    "In Progress",
    "Resolved",
  ];
  const severities: IncidentSeverity[] = ["Low", "Medium", "High", "Critical"];

  const handleSeverityChange = (value: string) => {
    onFilterChange({
      ...filter,
      severity: value === "all" ? undefined : (value as IncidentSeverity),
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filter,
      status: value === "all" ? undefined : (value as IncidentStatus),
    });
  };

  const handleAssignedToChange = (value: string) => {
    onFilterChange({
      ...filter,
      assigneeId: value === "all" ? undefined : value,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex w-full">
          <div className="grid w-full gap-3">
            <Label htmlFor="title">Search</Label>
            <Input
              id="title"
              type="text"
              aria-label="Search by title"
              placeholder="Search by title"
              value={filter.title}
              onChange={(e) =>
                onFilterChange({ ...filter, title: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="grid gap-3">
            <Select
              value={filter.status ?? "all"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All statuses</SelectItem>
                  {statusOfIncidents.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Select
              value={filter.severity ?? "all"}
              onValueChange={handleSeverityChange}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Severity</SelectLabel>
                  <SelectItem value="all">All severities</SelectItem>
                  {severities.map((severity) => (
                    <SelectItem key={severity} value={severity}>
                      {severity}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Select
              value={filter.assigneeId ?? "all"}
              onValueChange={handleAssignedToChange}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Assignees</SelectLabel>
                  <SelectItem value="all">All assignees</SelectItem>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncidentFilters;
