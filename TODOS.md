# TODOS 📝

## Completed 👌

- [x] Created a way to read and parse a YAML config file.
- [x] Created MongoDB connection through the use of Mongoose.
- [x] Created Types, Schemas and Models for Mongoose.
- [x] Added CORS mideleware.
- [x] Created logic that programmatically registers Endpoints based on YAML Config.
- [x] Created a **MongoCrudService** Class and decorated it on the Elysia App.
  - This class is responsible for handling all CRUD operations (findOne, findAll, findAndUpdate, etc.).
  - This reduces code duplication and makes the codebase more maintainable.

## Near future 🚧

- [ ] Create a Dockerfile for the Elysia application.
- [ ] Spin up a MongoDB instance in a Docker container using the provided Dockerfile.
- [ ] Write tests for the Elysia App to verify that all operations work correctly.
- [ ] Create a Traefik container to use as a reverse-proxy.
- [ ] Create the final Docker-compose file.
- [ ] Make the deployment process as easy & simple as possible.

## Far future 🚀

- [ ] Add Monitoring Prometheus + Graphana.
- [ ] Add Logging with ELK Stack.
- [ ] Write Stress test with K6.
- [ ] Add CI/CD with Github Actions.
