export const publicRoutes = {
  app: process.env.REACT_APP_GUEST_SUBDOMAIN ? `${process.env.REACT_APP_GUEST_SUBDOMAIN}` : "",
  home: "/",
  login: "/login",
  register: "/register",
  features: "/features",
  pricing: "/pricing",
  careers: "/careers",
  privacyPolicy: "/privacy-policy",
  terms: "/terms"
};

export const privateRoutes = {
  app: process.env.REACT_APP_DASHBOARD_SUBDOMAIN
    ? `${process.env.REACT_APP_DASHBOARD_SUBDOMAIN}`
    : "app",
  dashboard: "/",
  liveChat: "/live-chat",
  liveVisitors: "/live-visitors",
  emailTickets: "/email-tickets",
  operators: "/operators",
  helpDesk: "/help-desk",
  analytics: "/analytics",
  calendarBooking: "/calendar-booking",
  calendarEvents: "/calendar-booking/events",
  contacts: "/contacts",
  settings: "/settings",
  settingsAccount: "/settings/account",
  settingsIntegration: "/settings/integration",
  settingsEmailSetup: "/settings/email-setup",
  settingsOperatingHours: "/settings/operating-hours",
  settingsNotifications: "/settings/notifications",
  settingsLiveChat: "/settings/live-chat",
  settingsEmailTickets: "/settings/email-tickets",
  settingsCalendar: "/settings/calendar",
  settingsMessengers: "/settings/messengers",
  settingsQuickResponse: "/settings/quick-response",
  settingsOperators: "/settings/operators",
  settingsDepartments: "/settings/departments",

  logout: "/logout"
};
