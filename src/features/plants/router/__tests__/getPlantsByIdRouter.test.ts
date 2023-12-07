import app from "../../../../server/app";
import "../../../../server/index";
import "../../../../setupTests";
import request from "supertest";
import { plantsMock } from "../../mocks/plantsMock";
import Plant from "../../model/Plant";
import { plantsMockById } from "../../mocks/getPlantsByIdMock";

describe("Given a GET '/plants/ :id' endpoint", () => {
  describe("When it receives a valid id in the body's request", () => {
    test("Then it should responds with the bike that corresponds to that id", async () => {
      const expectedStatus = 200;
      const path = `/plants/${plantsMockById[0]._id.toString()}`;

      await Plant.create(plantsMock);
      const response = await request(app).get(path).expect(expectedStatus);

      expect(response.body).toHaveProperty("habitat");
    });
  });
});
