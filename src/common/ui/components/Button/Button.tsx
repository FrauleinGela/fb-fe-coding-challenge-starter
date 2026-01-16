import { Button as ShadcnButton } from "@/common/ui/shadcn/ui/button";
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null;

interface ButtonProps {
  variant?: ButtonVariant;
  children?: React.ReactNode;
}

export const Button = ({ variant = "default", ...props }: ButtonProps) => {
  return <ShadcnButton className="rounded-2xl cursor-pointer" variant={variant} {...props} />;
};
