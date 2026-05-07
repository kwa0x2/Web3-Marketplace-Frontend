import axios from '../axios';

class CollectionService {
  private readonly BASE_PATH = '/collection';

  async updateImages(id: string, formData: FormData): Promise<void> {
    await axios.put(`${this.BASE_PATH}/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async updateDescription(id: string, description: string | null): Promise<void> {
    await axios.patch(`${this.BASE_PATH}/${id}/description`, { description }, {
      withCredentials: true,
    });
  }
}

export const collectionService = new CollectionService();
