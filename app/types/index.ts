export type NavItem = {
  label: string;
  href: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "MODERATOR";
  image?: string | null;
};

export type PageMeta = {
  title: string;
  description: string;
};
