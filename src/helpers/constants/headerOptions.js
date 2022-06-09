import { publicRoutes } from "routes/routes";

export const HeaderOptions = [
  {
    name: "home",
    url: publicRoutes.home,
    type: null
  },
  {
    name: "Pricing",
    url: publicRoutes.pricing,
    type: null
  },
  {
    name: "Features",
    url: publicRoutes.features,
    type: null
  },
  {
    name: "Careers",
    url: publicRoutes.careers,
    type: null
  },
  {
    name: "Privacy Policy",
    url: publicRoutes.privacyPolicy,
    type: null
  },
  {
    name: "Try Pavelify for Free",
    url: publicRoutes.register,
    type: "button",
    buttonType: "solid"
  },
  {
    name: "Login",
    url: publicRoutes.login,
    type: "button",
    buttonType: "solid"
  },
  {
    name: "Register",
    url: publicRoutes.register,
    type: "button",
    buttonType: "outline"
  }
];
