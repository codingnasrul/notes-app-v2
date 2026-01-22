const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static async getAllNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();
      if (responseJson.status !== 'success') throw new Error(responseJson.message);
      return responseJson.data;
    } catch (error) {
      throw error;
    }
  }

  static async getArchivedNotes() {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const responseJson = await response.json();
      if (responseJson.status !== 'success') throw new Error(responseJson.message);
      return responseJson.data;
    } catch (error) {
      throw error;
    }
  }

  static async createNote({ title, body }) {
    try {
      const response = await fetch(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') throw new Error(responseJson.message);
      return responseJson.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}`, { method: 'DELETE' });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') throw new Error(responseJson.message);
      return responseJson;
    } catch (error) {
      throw error;
    }
  }

  static async archiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/archive`, { method: 'POST' });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') throw new Error(responseJson.message);
      return responseJson;
    } catch (error) {
      throw error;
    }
  }

  static async unarchiveNote(id) {
    try {
      const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, { method: 'POST' });
      const responseJson = await response.json();
      if (responseJson.status !== 'success') throw new Error(responseJson.message);
      return responseJson;
    } catch (error) {
      throw error;
    }
  }
}

export default NotesApi;