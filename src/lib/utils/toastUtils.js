import { toast } from "sonner";

export function showToast({
  type = "info",
  message,
  description,
}) {
  switch (type) {
    case "success":
      toast.success(message, { description });
      break;
    case "error":
      toast.error(message, { description });
      break;
    case "warning":
      toast.warning(message, { description });
      break;
    default:
      toast(message, { description });
  }
}
