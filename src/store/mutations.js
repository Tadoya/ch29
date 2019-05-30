const mutations = {
  SET_CATEGORY_SELECTED(state, val) {
    state.selectedCategory = val ? val : []
  },
  SET_TODAY(state, val) {
    state.today = val ? val : ""
  },
  SET_MONTH(state, val) {
    state.month = val ? val : ""
  },
  SET_START_DATE(state, val) {
    state.startDate = val ? val : ""
  },
  SET_END_DATE(state, val) {
    state.endDate = val ? val : ""
  },
}

export default mutations