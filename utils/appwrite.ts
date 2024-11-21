import { Account, Client, Databases, Storage } from "appwrite";

// Initialize the client
const client = new Client();

// Set the endpoint using the environment variables
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Use VITE_ prefix
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Use VITE_ prefix

export const account = new Account(client);
export { ID } from "appwrite";
export const DB = new Databases(client);
export const storage = new Storage(client);
