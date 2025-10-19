import { onRequestPost as __api_contact_ts_onRequestPost } from "C:\\Users\\alexf\\OneDrive\\Documents\\Projects\\MostlyOptimal.com\\ergodicityadvantage.com\\functions\\api\\contact.ts"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_ts_onRequestPost],
    },
  ]