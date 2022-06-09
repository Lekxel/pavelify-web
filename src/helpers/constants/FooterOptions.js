import { publicRoutes } from "routes/routes";

export const FooterOptions = [
  // [
  //   {
  //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus tenetur illo ducimus numquam exercitationem inventore error nemo harum temporibus veritatis.",
  //     type: "long text",
  //   },
  // ],
  [
    {
      text: "Logo",
      type: "heading",
      image: "/images/logo.png"
    },
    {
      text: "Privacy Policy",
      type: "listItems",
      url: publicRoutes.privacyPolicy
    },
    {
      text: "Terms and conditions",
      type: "listItems",
      url: publicRoutes.terms
    },
    {
      text: "Careers",
      type: "listItems",
      url: publicRoutes.terms
    },
    {
      text: " Affiliates",
      type: "listItems",
      url: "/"
    }
  ],
  [
    {
      text: "Product",
      type: "heading"
    },
    {
      text: "Features",
      type: "listItems",
      url: publicRoutes.features
    },
    {
      text: "Pricing",
      type: "listItems",
      url: publicRoutes.pricing
    },
    {
      text: "Product",
      type: "listItems",
      url: "/"
    },
    {
      text: "Support",
      type: "listItems",
      url: "/"
    }
  ],
  [
    {
      text: "Integration",
      type: "heading"
    },
    {
      text: "About Us",
      type: "listItems",
      url: "/"
    },
    {
      text: "Blog",
      type: "listItems",
      url: "/"
    },
    {
      text: "Media",
      type: "listItems",
      url: "/"
    },
    {
      text: "contact Us",
      type: "listItems",
      url: "/"
    }
  ],
  []
  // [
  //   {
  //     text: "Subscribe",
  //     type: "heading",
  //   },
  //   {
  //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus tenetur illo ducimus numquam exercitationem inventore error nemo harum temporibus veritatis.",
  //     type: "long text",
  //   },
  //   {
  //     text: "Email Address",
  //     buttontext: "Subscribe",
  //     type: "form",
  //   },
  // ],
];
