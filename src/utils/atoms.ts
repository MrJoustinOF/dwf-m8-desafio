import { atom, selector } from "recoil";
// import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    loged: false,
    user: {},
  },
});

export const userValue = selector({
  key: "userValue",
  get: ({ get }) => {
    const { user } = get(authState);

    return user;
  },
});

export const petOnEditState = atom({
  key: "petOnEdit",
  default: {},
});
