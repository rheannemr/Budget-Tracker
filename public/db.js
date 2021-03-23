let db;
const request = indexedDB.open("budget", 1)

request.onupgradeneeded = function (event) {
  // create object store called "pending" and set autoIncrement to true
  // request.onupgradeneeded = ({ target }) => {
  // const db = target.result;
  const objectStore = db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  // log error here
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  // add record to your store with add method.
  request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction(["pending"], "readwrite");
    const objectStore = transaction.objectStore("pending");
    // const statusIndex = objectStore.index("statusIndex");
    
    // Adds data to our objectStore
    objectStore.add({record});

function checkDatabase() {
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable
  const transaction = db.transaction(["pending"], "readwrite");

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          const transaction = db.transaction(["pending"], "readwrite");
          // access your pending object store
          // clear all items in your store
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
