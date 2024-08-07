import { Client, ClientOptions } from 'minio';

export const database = 'data.bib';

const objStorageUri = new URL(process.env.OBJSTOR_URI as string);
export const bucket: string = objStorageUri.pathname.replace(/^\/+/, '');

const clientOptions: ClientOptions = {
  endPoint: objStorageUri.hostname,
  port: +objStorageUri.port,
  useSSL: objStorageUri.protocol === 'https',
  accessKey: objStorageUri.username,
  secretKey: objStorageUri.password,
};

const objStorage = new Client(clientOptions);

export async function getObjStore() {
  const bucketExists = await objStorage.bucketExists(bucket);

  if (bucketExists) return objStorage;

  await objStorage.makeBucket(bucket, '', { ObjectLocking: true });

  return objStorage;
}
