import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class CommonService {

  /**
   * Simple password hashing method
   * @param password
   */
  async hashPassword(password: string) {
    const data = await bcrypt.hash(password, 10);
    return data;
  }

  /**
   * @author Jainam Shah
   * @description validate text with hash
   * @param {string} password
   * @param {string} hash
   */
  async validateHash(password: string, hash: string): Promise<boolean> {
    const data = await bcrypt.compare(password, hash || '');
    return data;
  }

}
