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
import { incidentSeverities, incidentStatuses } from "@/common/data/incident";

interface IncidentFilterProps {
  filterBy: IncidentFilterBy;
  onFilterByChange: (filters: IncidentFilterBy) => void;
}
const IncidentFilters = ({ filterBy, onFilterByChange }: IncidentFilterProps) => {
  const { users } = useFetchUsers();

  const handleSeverityChange = (value: string) => {
    onFilterByChange({
      ...filterBy,
      severity: value === "all" ? undefined : (value as IncidentSeverity),
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterByChange({
      ...filterBy,
      status: value === "all" ? undefined : (value as IncidentStatus),
    });
  };

  const handleAssignedToChange = (value: string) => {
    onFilterByChange({
      ...filterBy,
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
              value={filterBy.title}
              onChange={(e) =>
                onFilterByChange({ ...filterBy, title: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="grid gap-3">
            <Select
              value={filterBy.status ?? "all"}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All statuses</SelectItem>
                  {incidentStatuses.map((status) => (
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
              value={filterBy.severity ?? "all"}
              onValueChange={handleSeverityChange}
            >
              <SelectTrigger >
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Severity</SelectLabel>
                  <SelectItem value="all">All severities</SelectItem>
                  {incidentSeverities.map((severity) => (
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
              value={filterBy.assigneeId ?? "all"}
              onValueChange={handleAssignedToChange}
            >
              <SelectTrigger >
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
