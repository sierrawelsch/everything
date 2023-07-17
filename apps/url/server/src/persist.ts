import {open} from "sqlite";
import sqlite3 from "sqlite3";
import axios from "axios";
let _db;
async function getDB() {
  if (_db == null) {
    const conn = await open({
      filename: './urls.db',
      driver: sqlite3.Database,
    });
    _db = conn;
    await _db.run(
      'CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, original TEXT);'
    );
  }
  return _db;
}

//Checks if a url is valid and exists
async function isValidUrl(url: string): Promise<boolean> {
  try {
    await axios.get("https://" + url);
    return true;
  } catch (error) {
    //console.error('Error:', error);
    return false;
  }
}

//returns the shortenedUrl if the given url by the user is valid, otherwise returns an invalid message
async function shortenUrl(url: string): Promise<string> {
  console.log(url);
  console.log(isValidUrl(url));
  if(!await isValidUrl(url)) {
    return "invalid";
  }
  const db = await getDB();
  const result = await db.run('INSERT INTO url (original) VALUES (?)', url);
  console.log(result);
  const id = result.lastID;
  const short = `http://localhost:3333/s/${id}`;
  return short;
}

async function lookupUrl(shortenedId: number) {
  const db = await getDB();

  const result = await db.get(
    'SELECT original FROM url WHERE id = (?)',
    shortenedId
  );
  console.log(result);
  return result.original;
}

export {shortenUrl, lookupUrl};
