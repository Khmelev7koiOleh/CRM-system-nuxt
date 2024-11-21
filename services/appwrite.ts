import { Client, Account, Databases, Storage } from "appwrite";

// Initialize the client
const client = new Client();

// Set endpoint and project ID using environment variables
client
  .setEndpoint(process.env.VUE_APP_APPWRITE_ENDPOINT || "") // Your Appwrite API endpoint
  .setProject(process.env.VUE_APP_APPWRITE_PROJECT_ID || ""); // Your Appwrite Project ID

// Initialize Appwrite services (you can use these services to interact with Appwrite)
const account = new Account(client);
const databases = new Databases(client);
const storageA = new Storage(client);

export { client, account, databases, storageA };
