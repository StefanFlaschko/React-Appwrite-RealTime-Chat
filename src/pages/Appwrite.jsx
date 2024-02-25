import Header from '../components/Header';

import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_CRUD,
} from '../appwriteConfig';
import { ID, Query, Permission, Role } from 'appwrite';
import { useEffect, useState } from 'react';

function Appwrite() {
  const [city, setCity] = useState('');
  const [plz, setPlz] = useState('');
  const [rating, setRating] = useState('');
  const [allDocuments, setAllDocuments] = useState([]);

  function createDocument() {
    const payload = { city: city, plz: plz, rating: rating };
    const promise = databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_CRUD,
      ID.unique(),
      payload
    );

    promise.then(
      function (response) {
        console.log(response);
        getDocuments();
      },
      function (error) {
        console.log(error);
      }
    );
  }

  function getDocuments() {
    let promise = databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_CRUD
      //  [
      //   Query.equal('title', 'Avatar'),
      // ]
    );

    promise.then(
      function (response) {
        console.log(response);
        setAllDocuments(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  }
  useEffect(() => {
    getDocuments();
  }, []);

  function deleteDocument(documentId) {
    // useEffect(() => {
    const promise = databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_CRUD,
      documentId
    );

    promise.then(
      function (response) {
        console.log(response); // Success
        getDocuments();
      },
      function (error) {
        console.log(error); // Failure
      }
    );
    // }, [documentId]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('handle submit');
    createDocument();
  }

  return (
    <main className="container">
      <Header />
      <div className="room--container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="PLZ"
            value={plz}
            onChange={(e) => {
              setPlz(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Add" />
          </div>
        </form>
        {/* <button onClick={createDocument}>Create Document</button> */}

        <div></div>
        <h2>All Documents</h2>
        <ul>
          {allDocuments.map((document) => {
            return (
              <li key={document.$id} className="cityList">
                <div>
                  {document.city} - {document.plz} - {document.rating}
                </div>
                <button
                  className="deleteCity"
                  onClick={() => deleteDocument(document.$id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default Appwrite;
