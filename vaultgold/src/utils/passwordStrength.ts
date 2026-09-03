export function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {
      label: "Weak",
      color: "bg-red-500",
      width: "25%",
    };
  }

  if (score <= 4) {
    return {
      label: "Medium",
      color: "bg-yellow-500",
      width: "60%",
    };
  }

  return {
    label: "Strong",
    color: "bg-green-500",
    width: "100%",
  };
}