const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOne,
  userTwo,
  taskThree,
  setupDB,
  getUserToken
} = require("./fixtures/db");

// Jest Lifecycle method
beforeEach(setupDB);

test("Should create task for user", async () => {
  const token = await getUserToken(userOne._id);
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

test('Should return tasks for UserOne', async () => {
  const token = await getUserToken(userOne._id)
  const response = await request(app).get('/api/tasks')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)

  expect(response).not.toBeNull()
  expect(response.body.length).toBe(2)
})

test('Should not allow unauthorized task delete', async () => {
  const token = await getUserToken(userOne._id)
  await request(app).delete(`/api/tasks/${taskThree._id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(404)

  const task = await Task.findById(taskThree._id)
  expect(task).not.toBeNull()

})