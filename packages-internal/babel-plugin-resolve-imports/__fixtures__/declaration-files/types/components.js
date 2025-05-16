// Implementation of components
import { createUser } from './models';

function Button({ label, onClick, user }) {
  return { type: 'button', label, onClick, user };
}

export { Button };
