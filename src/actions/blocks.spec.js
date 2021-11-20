import * as ActionTypes from "../constants/actionTypes";
import * as ActionCreators from "./blocks";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const node = {
    url: "http://localhost:3002",
    online: false,
    name: null,
  };

  it("should fetch the node block", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ block_data: "The Human Torch" });
        },
      })
    );
    await ActionCreators.checkNodeBlock(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_BLOCK_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_BLOCK_SUCCESS,
        node,
        res: { block_data: "The Human Torch" },
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the node block", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeBlock(node)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_BLOCK_START,
        node,
      },
      {
        type: ActionTypes.CHECK_NODE_BLOCK_FAILURE,
        node,
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
