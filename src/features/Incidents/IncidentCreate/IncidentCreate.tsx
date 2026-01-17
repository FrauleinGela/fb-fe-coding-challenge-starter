import { Label } from "@/common/ui/shadcn/ui/label";
import { Input } from "@/common/ui/shadcn/ui/input";
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
import { incidentSeverities } from "@/common/data/incident";
import { useIncidentCreateForm } from "./hooks/useCreateIncidentForm";

export const IncidentCreate = () => {
  const navigate = useNavigate();
  const { users } = useFetchUsers();
  const {
    create: createIncident,
    error,
    isPending,
  } = useCreateIncident({
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  const form = useIncidentCreateForm((value) => {
    createIncident(value);
  });

  return (
    <div className="flex justify-center px-4 py-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6 w-full max-w-2xl"
      >
        <div className="space-y-2">
          <form.Field
            name="title"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <p className="text-left text-sm text-destructive">
                    {field.state.meta.errors
                      .map((err) => err?.message)
                      .join(",")}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <form.Field
            name="description"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Description</Label>
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  rows={4}
                  placeholder="Enter description"
                  className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base"
                />
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <form.Field
            name="severity"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>
                  Severity <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={field.state.value}
                  onValueChange={(val: string) => {
                    field.handleChange(val as never);
                    field.handleBlur();
                  }}
                >
                  <SelectTrigger className="w-full" id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentSeverities.map((severity) => (
                      <SelectItem key={severity} value={severity}>
                        {severity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {field.state.meta.isTouched && !field.state.meta.isValid && (
                  <p className="text-left text-sm text-destructive">
                    {field.state.meta.errors
                      .map((err) => err?.message)
                      .join(",")}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2 w-full">
          <form.Field
            name="assigneeId"
            children={(field) => (
              <>
                <Label htmlFor={field.name}>Assignee</Label>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />
        </div>

        {error && (
          <div role="alert" aria-live="assertive" className="py-4">
            <p className="text-destructive">
              {error.message}
            </p>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <Button
            className="rounded-2xl cursor-pointer"
            variant="ghost"
            asChild
            disabled={isPending}
          >
            <Link to={`/`}>Cancel</Link>
          </Button>
          <Button
            className="rounded-2xl cursor-pointer"
            type="submit"
            variant="default"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Incident"}
          </Button>
        </div>
      </form>
    </div>
  );
};
