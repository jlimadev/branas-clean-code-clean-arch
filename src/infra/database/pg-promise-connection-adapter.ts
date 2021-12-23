import pgp from 'pg-promise';
import Connection from './connection';

export default class PgPromiseConnectionAdapter implements Connection {
  private pgp: any;
  static instance: PgPromiseConnectionAdapter;

  private constructor() {
    this.pgp = pgp()('postgres://postgres:postgres@localhost:5432/postgres');
  }

  static getInstance(): PgPromiseConnectionAdapter {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
    }
    return PgPromiseConnectionAdapter.instance;
  }

  async query(statement: string, params: any[]): Promise<any> {
    return await this.pgp.query(statement, params);
  }
}
