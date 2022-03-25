const getFromStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
}

const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    const event = new Event('itemInserted');
    window.dispatchEvent(event);
  } catch (e) {
    console.log(e);
  }
}

export { getFromStorage, setToStorage };