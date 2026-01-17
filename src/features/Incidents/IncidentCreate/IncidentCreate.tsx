import { Label } from "@/common/ui/shadcn/ui/label";
import { useIncidentCreateForm } from "./hooks/incidentCreateForm";
import { Input } from "@/common/ui/shadcn/ui/input";
import { IncidentSeverity } from "@/api";
import { Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/ui/shadcn/ui/select";
import { useFetchUsers } from "@/common/hooks/user/useFetchUsers";
import { useCreateIncident } from "./hooks/useCreateIncident";
import { Button } from "@/common/ui/shadcn/ui/button";

export const IncidentCreate = () => {
  const navigate = useNavigate();
  const { users } = useFetchUsers();
  const { 
    create: createIncident, 
    error,
    isPending 
  } = useCreateIncident({
    onSuccess: () => {
      navigate("/", { replace: true });
    }
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useIncidentCreateForm();

  const submit = handleSubmit((data) => {
    createIncident(data);
  });

  const severities: IncidentSeverity[] = ["Low", "Medium", "High", "Critical"];

  return (
    <div className="flex justify-center px-4 py-8">
      <form onSubmit={submit} className="space-y-6 w-full max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                id="title"
                name="title"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.title && (
            <p className="text-left text-sm text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                id="description"
                name="description"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                rows={4}
                placeholder="Enter description"
                className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="severity">
            Severity <span className="text-destructive">*</span>
          </Label>
          <Controller
            name="severity"
            control={control}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severities.map((severity) => (
                      <SelectItem key={severity} value={severity}>
                        {severity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />
          {errors.severity && (
            <p className="text-left text-sm text-destructive">
              {errors.severity.message}
            </p>
          )}
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="assigneeId">Assignee</Label>
          <Controller
            name="assigneeId"
            control={control}
            render={({ field }) => (
              <>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" id="assigneeId">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="assigneeId" value={field.value} />
              </>
            )}
          />
        </div>
        {error && (
          <div className="rounded-md bg-destructive/10 p-4 border border-destructive/20">
            <p className="text-sm text-destructive font-medium">
              {error.message }
            </p>
          </div>
        )}
        <div className="flex justify-end gap-4">
          <Button className="rounded-2xl cursor-pointer" variant="ghost" asChild disabled={isPending}>
            <Link to={`/`}>Cancel</Link>
          </Button>
          <Button className="rounded-2xl cursor-pointer" type="submit" variant="default" disabled={isPending}>
            {isPending ? "Creating..." : "Create Incident"}
          </Button>
        </div>
      </form>
    </div>
  );
};
