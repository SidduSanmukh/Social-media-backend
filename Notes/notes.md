Each directory has a distinct responsibility:
- config/ validates application settings.
- infrastructure/ manages external systems such as PostgreSQL and Redis.
- modules/ contains business capabilities.
- shared/ contains genuinely reusable application-wide utilities.
- app.ts configures Express.
- server.ts starts and stops the process.