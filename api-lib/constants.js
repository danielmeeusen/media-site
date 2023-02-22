export const ValidateProps = {
  user: {
    username: { type: 'string', minLength: 2, maxLength: 20 },
    password: { type: 'string', minLength: 8, maxLength: 64 },
    confirmPassword: { type: 'string', minLength: 8, maxLength: 64 },
    email: { type: 'string', minLength: 1 },
  },
  post: {
    content: { type: 'string', minLength: 1, maxLength: 280 },
    title: { type: 'string', minLength: 1, maxLength: 30},
    people: { type: 'array', }
  }
};