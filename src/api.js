import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
  cards: {
    getCardsFromSet: set => 
      axios
        .get(`/api/cards/findSetByCode?setCode=${set}`)
        .then(res => res.data.cards)      
  },
  card: {
    setValueToCard: cardId =>
      axios
        .post('/api/card/setValueToCard', cardId)
        .then(res => res.data.card)
  }
};
