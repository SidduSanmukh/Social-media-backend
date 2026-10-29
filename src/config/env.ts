import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  /*
  Environment variables are strings. If the environment contains:
  Zod converts "1826" to the number 4000 before validating it. using z.coerce.number()
  
 //int().min(1).max(65535).default(1826)-> This checks that the port is an integer within the valid TCP/UDP port range,
 excluding port zero for our configuration.
  */
  PORT: z.coerce.number().int().min(1).max(65535).default(1826),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment configuration");
  console.error(z.treeifyError(result.error));
  process.exit(1);
}

export const env = result.data;
