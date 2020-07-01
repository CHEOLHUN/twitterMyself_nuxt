export const state = () => ({
  contents: [],
  hasMoreContents: true,
  imagePaths: [],
});

const TOTAL_CONTENTS = 51;
const LIMIT = 10;

export const mutations = {
  postContent(state, payload) {
    state.contents.unshift(payload);
  },
  deleteContent(state, payload) {
    const newArr = state.contents.filter((item) => item.id !== payload.id);
    state.contents = newArr;
  },
  postComment(state, payload) {
    const index = state.contents.findIndex(
      (item) => item.id === payload.postId
    );
    state.contents[index].Commnets.unshift(payload);
  },
  loadContents(state, payload) {
    let DIFF = TOTAL_CONTENTS - state.contents.length;
    const fakeContents = Array(DIFF > LIMIT ? LIMIT : DIFF)
      .fill()
      .map((item) => ({
        id: Math.random().toString(),
        content: "Hello infinite scrolling",
        user: {
          id: 1,
          email: "bch3454@naver.com",
          nickname: "rooney",
        },
        Commnets: [],
        image: [],
        createAt: Date.now(),
      }));
    state.contents = state.contents.concat(fakeContents);
    state.hasMoreContents = fakeContents.length === LIMIT;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload)
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1)
  }
};

export const actions = {
  postContent({ commit }, payload) {
    commit("postContent", payload);
  },
  deleteContent({ commit }, payload) {
    commit("deleteContent", payload);
  },
  postCommnet({ commit }, payload) {
    commit("postComment", payload);
  },
  loadContents({ commit, state }, payload) {
    if (state.hasMoreContents) {
      commit("loadContents");
    }
  },
  uploadImages({ commit }, payload) {
    this.$axios
      .post("http://localhost:3085/post/images", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("concatImagePaths", res.data);
      })
      .catch(() => {});
  },
};
