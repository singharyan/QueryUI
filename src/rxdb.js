// @ts-nocheck
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { fileSchema } from './schema';
import { RxDBAttachmentsPlugin } from 'rxdb/plugins/attachments';

addRxPlugin(RxDBAttachmentsPlugin);
let dbPromise;

const _create = async () => {
     const db = await createRxDatabase({
      name: 'rxdbdemo',
      storage: getRxStorageDexie()
    });
    
    await db.addCollections({
      dataFiles: { 
        schema: fileSchema
      }
    });
    dbPromise = db;
    return db;
  };


  export const db = () => (dbPromise ? dbPromise : _create());