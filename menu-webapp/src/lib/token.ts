import { v4 as uuidv4 } from 'uuid';

function getOrCreateUniqueId() {
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
    return userId;
  }
  return null;
}

export default getOrCreateUniqueId;