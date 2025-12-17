export type NavigationItem = {
  path: string;
  label: string;
  icon: string;
  description?: string;
  badge?: number;
  protected?: boolean;
};

export type NavigationGroup = {
  role: "public" | "owner" | "tenant" | "shared";
  label: string;
  items: NavigationItem[];
};

export const APP_NAVIGATION: NavigationGroup[] = [
  {
    role: "public",
    label: "Public Pages",
    items: [
      {
        path: "/",
        label: "Home",
        icon: "🏠",
        description: "Welcome page and landing",
      },
      {
        path: "/login",
        label: "Login",
        icon: "🔐",
        description: "User authentication",
      },
    ],
  },
  {
    role: "owner",
    label: "Owner Dashboard",
    items: [
      {
        path: "/owner-home",
        label: "Owner Home",
        icon: "🏢",
        description: "Owner dashboard and overview",
        protected: true,
      },
      {
        path: "/tenant-management",
        label: "Tenant Management",
        icon: "👥",
        description: "Manage tenants and agreements",
        protected: true,
      },
      {
        path: "/flat-management",
        label: "Flat Management",
        icon: "🏘️",
        description: "Manage properties and flats",
        protected: true,
      },
      {
        path: "/electrcity-entry",
        label: "Electricity Entry",
        icon: "⚡",
        description: "Enter electricity meter readings",
        protected: true,
      },
      {
        path: "/complain/view",
        label: "View Complaints",
        icon: "📞",
        description: "View and manage tenant complaints",
        protected: true,
      },
      {
        path: "/upload-notice",
        label: "Upload Notice",
        icon: "📋",
        description: "Post notices for tenants",
        protected: true,
      },
      {
        path: "/tolet",
        label: "To-Let Listings",
        icon: "🏘️",
        description: "Manage available properties",
        protected: true,
      },
    ],
  },
  {
    role: "tenant",
    label: "Tenant Portal",
    items: [
      {
        path: "/tenant-home",
        label: "Tenant Home",
        icon: "🏠",
        description: "Tenant dashboard and rent info",
        protected: true,
      },
      {
        path: "/complain/issue",
        label: "Submit Complaint",
        icon: "📞",
        description: "Report issues and complaints",
        protected: true,
      },
      {
        path: "/moveout/submission",
        label: "Move Out Request",
        icon: "🚶",
        description: "Submit move out application",
        protected: true,
      },
    ],
  },
];

export const FLAT_NAVIGATION = APP_NAVIGATION.flatMap((group) => group.items);

export const getNavigationByRole = (role: "public" | "owner" | "tenant") => {
  return APP_NAVIGATION.filter(
    (group) => group.role === role || group.role === "shared"
  );
};

export const getNavigationItemByPath = (path: string) => {
  return FLAT_NAVIGATION.find((item) => item.path === path);
};

export const OWNER_QUICK_ACTIONS = [
  {
    path: "/tenant-management",
    label: "Tenant Management",
    icon: "👥",
  },
  {
    path: "/upload-notice",
    label: "Upload Notice",
    icon: "📋",
  },
  {
    path: "/complain/view",
    label: "View Complaints",
    icon: "📞",
  },
  {
    path: "/flat-management",
    label: "Flat Management",
    icon: "🏢",
  },
] as const;

export const TENANT_QUICK_ACTIONS = [
  {
    path: "/complain/issue",
    label: "Complaint",
    icon: "📞",
  },
  {
    path: "/payment-history",
    label: "Payment History",
    icon: "💳",
  },
  {
    path: "/technician",
    label: "Technician",
    icon: "👨‍🔧",
  },
  {
    path: "/moveout/submission",
    label: "Move Out",
    icon: "🚶",
  },
] as const;
