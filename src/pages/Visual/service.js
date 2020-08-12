import { request } from 'umi';

export async function queryRegions() {
  return request('https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json');
}
