import axios from "axios";

export interface Document {
  _id: string;
  title: string;
  data: string;
}

export interface IrecievedData {
  data: Document;
}

/**
 * Fetches all documents from api
 */
export async function getAllDocuments() {
  let documents: Array<Document> = [];
  try {
    const { data } = await axios.get(process.env.REACT_APP_API + "/docs");
    documents = data;
    return documents;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Fetches one specific document from api
 * @param id id of document to fetch
 */
export async function getOneDocument(id: string) {
  let document: IrecievedData;

  try {
    const { data } = await axios.get(process.env.REACT_APP_API + `/docs/${id}`);
    document = data;

    return document;
  } catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * Post to create a new document
 * @param title title of the document
 * @param content document content
 */
export async function createNewDocument(title: string, content: string) {
  let newDocument = {
    title: title,
    data: content,
  };

  try {
    await axios.post(process.env.REACT_APP_API + `/docs`, newDocument);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Put to update an existing document
 * @param id id of the document to update
 * @param title title of the document
 * @param content document content
 */
export async function updateDocument(
  id: string,
  title: string,
  content: string
) {
  let updatedDocument = {
    id: id,
    title: title,
    data: content,
  };

  try {
    await axios.put(process.env.REACT_APP_API + `/docs`, updatedDocument);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Delete an existing document
 * @param id id of the document to delete
 */
export async function deleteDocument(id: string) {
  try {
    await axios.delete(process.env.REACT_APP_API + `/docs/${id}`);
  } catch (e) {
    console.log(e);
  }
}
