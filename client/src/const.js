export const IS_DEV = import.meta.env.DEV
export const API_URL = IS_DEV ? "http://localhost:8000" : "PROD_URL"
