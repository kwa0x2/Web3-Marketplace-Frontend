import axios from '../axios';
import type { User } from '@/types';

interface NonceResponse {
  success: boolean;
  data: {
    message: string;
    nonce: string;
  };
}

interface VerifyResponse {
  success: boolean;
  data: {
    user: User;
    expiresIn: string;
  };
}

interface MeResponse {
  success: boolean;
  data: {
    user: User;
  };
}

class AuthService {
  private readonly BASE_PATH = '/auth';

  async getNonce(address: string): Promise<NonceResponse> {
    const { data } = await axios.post<NonceResponse>(`${this.BASE_PATH}/nonce`, {
      address,
    });
    return data;
  }

  async verifySignature(
    signature: string,
    address: string,
    chainId?: number
  ): Promise<VerifyResponse> {
    const { data } = await axios.post<VerifyResponse>(`${this.BASE_PATH}/verify`, {
      signature,
      address,
      chainId,
    });
    return data;
  }

  async getCurrentUser(): Promise<MeResponse> {
    const { data } = await axios.get<MeResponse>(`${this.BASE_PATH}/me`);
    return data;
  }

  async logout(): Promise<void> {
    await axios.post(`${this.BASE_PATH}/logout`);
  }
}

export const authService = new AuthService();
export type { NonceResponse, VerifyResponse, MeResponse };
