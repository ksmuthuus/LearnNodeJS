const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOneId, userOne, setupDB } = require("./fixtures/db");

let token = undefined;
//Jest Lifecycle method
beforeEach(async () => {
  token = await setupDB();
});

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/api/tasks")
    .send({
      description: "testing task"
    })
    .set("Authorization", `Bearer ${token}`)
    .expect(201);

  const task = await Task.findById(response.body._id);

  expect(task).not.toBeNull();

  expect(task.completed).toEqual(false);
});
